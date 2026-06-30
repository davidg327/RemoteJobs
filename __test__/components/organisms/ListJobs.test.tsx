import React from "react";
import {render} from "@testing-library/react-native";
import {ListJobs} from "@/components/organisms/listJobs";
import {useColorScheme} from "@/hooks/use-color-scheme";
import {FlatList, TouchableOpacity} from "react-native";

jest.mock("@/components/organisms/cardJob", () => {
    const React = require("react");
    return {
        CardJob: (props: any) => (
            <mock-card-job {...props}/>
        ),
    };
});


jest.mock("@/components/atoms", () => {
    const React = require("react");
    return {
        IconSymbol: (props: any) => (
            <mock-icon-symbol {...props}/>
        ),

        LoadingComponent: (props: any) => (
            <mock-loading-component {...props}/>
        ),
    };
});

jest.mock("@/components/template/EmptyTemplate", () => {
    const React = require("react");
    return {
        EmptyTemplate: (props: any) => (
            <mock-empty-template {...props}/>
        ),
    };
});

jest.mock("react-native-gesture-handler/ReanimatedSwipeable", () => {
    const React = require("react");

    return ({children, renderRightActions}: any) => (
        <mock-swipeable>
            {children}
            {renderRightActions?.()}
        </mock-swipeable>
    );
});

jest.mock("@/hooks/use-color-scheme", () => ({
    useColorScheme: jest.fn(),
}));

jest.mock("@/constants/theme", () => ({
    Colors: {
        light: {
            success: "green",
        },
        dark: {
            success: "lightgreen",
        },
    },
}));

describe("ListJobs", () => {
    const jobs = [
        {
            id: 1,
            title: "React Native",
        },
    ];

    beforeEach(() => {
        jest.clearAllMocks();
        (useColorScheme as jest.Mock).mockReturnValue("light");
    });


    it("renders jobs", () => {
        const {UNSAFE_getByType} = render(
            <ListJobs
                jobs={jobs as any}
                loading={false}
                newLoading={false}
                text="Empty"
                moreJobs={jest.fn()}
                redirect={jest.fn()}
                refreshJobs={jest.fn()}
            />
        );
        expect(UNSAFE_getByType("mock-card-job")).toBeTruthy();
    });

    it("renders empty component when list is empty", () => {
        const {UNSAFE_getByType} = render(
            <ListJobs
                jobs={[]}
                loading={false}
                newLoading={false}
                text="No jobs"
                moreJobs={jest.fn()}
                redirect={jest.fn()}
                refreshJobs={jest.fn()}
            />
        );
        const empty = UNSAFE_getByType("mock-empty-template");
        expect(empty.props.text).toBe("No jobs");
    });

    it("renders loading footer when loading is true", () => {
        const {UNSAFE_getByType} = render(
            <ListJobs
                jobs={jobs as any}
                loading={true}
                newLoading={false}
                text="Loading"
                moreJobs={jest.fn()}
                redirect={jest.fn()}
                refreshJobs={jest.fn()}
            />
        );
        const loader = UNSAFE_getByType("mock-loading-component");
        expect(loader.props.size).toBe("small");
        expect(loader.props.color).toBe("green");
    });

    it("renders delete action when deleteFavorite exists", () => {
        const deleteFavorite = jest.fn();
        const {UNSAFE_getByType} = render(
            <ListJobs
                jobs={jobs as any}
                loading={false}
                newLoading={false}
                text="Jobs"
                moreJobs={jest.fn()}
                redirect={jest.fn()}
                refreshJobs={jest.fn()}
                deleteFavorite={deleteFavorite}
            />
        );
        const icon = UNSAFE_getByType("mock-icon-symbol");
        expect(icon.props.name).toBe("trash.fill");
    });

    it("calls deleteFavorite with job id when delete action is pressed", () => {
        const deleteFavorite = jest.fn();
        const {UNSAFE_getByType} = render(
            <ListJobs
                jobs={jobs as any}
                loading={false}
                newLoading={false}
                text="Jobs"
                moreJobs={jest.fn()}
                redirect={jest.fn()}
                refreshJobs={jest.fn()}
                deleteFavorite={deleteFavorite}
            />
        );
        const swipeable = UNSAFE_getByType("mock-swipeable");
        const button = swipeable.findByType(TouchableOpacity);
        button.props.onPress();
        expect(deleteFavorite).toHaveBeenCalledWith(1);
    });

    it("calls redirect with job item when CardJob is pressed", () => {
        const redirect = jest.fn();

        const {UNSAFE_getByType} = render(
            <ListJobs
                jobs={jobs as any}
                loading={false}
                newLoading={false}
                text="Jobs"
                moreJobs={jest.fn()}
                redirect={redirect}
                refreshJobs={jest.fn()}
            />
        );
        const card = UNSAFE_getByType("mock-card-job");
        card.props.redirect();
        expect(redirect).toHaveBeenCalledWith(jobs[0]);
    });

    it("calls moreJobs when list reaches end and loading is false", () => {
        const moreJobs = jest.fn();
        const {UNSAFE_getByType} = render(
            <ListJobs
                jobs={jobs as any}
                loading={false}
                newLoading={false}
                text="Jobs"
                moreJobs={moreJobs}
                redirect={jest.fn()}
                refreshJobs={jest.fn()}
            />
        );
        const list = UNSAFE_getByType(FlatList);
        list.props.onEndReached();
        expect(moreJobs).toHaveBeenCalled();
    });

    it("does not call moreJobs when loading is true", () => {
        const moreJobs = jest.fn();
        const {UNSAFE_getByType} = render(
            <ListJobs
                jobs={jobs as any}
                loading={true}
                newLoading={false}
                text="Jobs"
                moreJobs={moreJobs}
                redirect={jest.fn()}
                refreshJobs={jest.fn()}
            />
        );

        const list = UNSAFE_getByType(FlatList);
        list.props.onEndReached();
        expect(moreJobs).not.toHaveBeenCalled();
    });

    it("uses light success color when color scheme is undefined", () => {
        (useColorScheme as jest.Mock).mockReturnValue(undefined);
        const {UNSAFE_getByType} = render(
            <ListJobs
                jobs={jobs as any}
                loading={true}
                newLoading={false}
                text="Jobs"
                moreJobs={jest.fn()}
                redirect={jest.fn()}
                refreshJobs={jest.fn()}
            />
        );

        const loader = UNSAFE_getByType("mock-loading-component");
        expect(loader.props.color).toBe("green");
    });
});
