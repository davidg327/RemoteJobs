import React from "react";
import {fireEvent, render} from "@testing-library/react-native";
import {JobTemplate} from "@/components/template/JobTemplate";
import {useJobTemplate} from "@/hooks/template/use-job-template";
import {TouchableOpacity} from "react-native";

jest.mock("@/hooks/template/use-job-template", () => ({
    useJobTemplate: jest.fn(),
}));

jest.mock("@/components/molecules", () => {
    const React = require("react");
    return {
        Header: (props: any) => (
            <mock-header {...props}/>
        ),
        Search: (props: any) => (
            <mock-search {...props}/>
        ),
    };
});

jest.mock("@/components/atoms", () => {
    const React = require("react");
    return {
        IconSymbol: (props: any) => (
            <mock-icon-symbol {...props}/>
        ),
    };
});

jest.mock("@/components/organisms", () => {
    const React = require("react");
    return {
        CardTypeJob: (props: any) => (
            <mock-card-type-job {...props}/>
        ),
        ListJobs: (props: any) => (
            <mock-list-jobs {...props}/>
        ),
        ModalCategories: (props: any) => (
            <mock-modal-categories {...props}/>
        ),
    };
});

describe("JobTemplate", () => {
    beforeEach(() => {
        jest.clearAllMocks();
        (useJobTemplate as jest.Mock)
            .mockReturnValue({
                bottomSheetRef: {
                    current: {
                        expand: jest.fn(),
                    },
                },
                categories: [
                    "frontend",
                ],
                color: "black",
                filter: [],
                filterJobs: [],
                loading: false,
                newLoading: false,
                search: "",
                styles: {
                    containerSearch: {},
                    containerFilter: {},
                    containerTypes: {},
                },
                typeJob: [
                    "fulltime",
                ],
                visibleJobs: [
                    {
                        id: 1,
                    },
                ],
                disabledJobsFilter: true,
                moreJobs: jest.fn(),
                redirect: jest.fn(),
                refreshJobs: jest.fn(),
                selectFilter: jest.fn(),
                selectVariousFilter: jest.fn(),
                setSearch: jest.fn(),
            });
    });

    it("renders header and search", () => {
        const {UNSAFE_getByType} = render(
            <JobTemplate/>
        );
        expect(UNSAFE_getByType("mock-header")).toBeTruthy();
        const search = UNSAFE_getByType("mock-search");
        expect(search.props.placeholder).toBe("Buscar empleo");
    });

    it("renders filter icon", () => {
        const {UNSAFE_getByType} = render(
            <JobTemplate/>
        );
        const icon = UNSAFE_getByType("mock-icon-symbol");
        expect(icon.props.name).toBe("filter.fill");
        expect(icon.props.color).toBe("black");
    });

    it("renders job types", () => {
        const {UNSAFE_getByType} = render(
            <JobTemplate/>
        );
        const card = UNSAFE_getByType("mock-card-type-job");
        expect(card.props.typeJob).toBe("fulltime");
    });

    it("uses visibleJobs when disabledJobsFilter is true", () => {
        const {UNSAFE_getByType} = render(
            <JobTemplate/>
        );
        const list = UNSAFE_getByType("mock-list-jobs");
        expect(list.props.jobs).toEqual([
            {
                id: 1,
            },
        ]);
        expect(list.props.text).toBe("No hay ofertas en estos momentos");
    });

    it("uses filterJobs when disabledJobsFilter is false", () => {
        (useJobTemplate as jest.Mock)
            .mockReturnValue({
                ...useJobTemplate(),
                disabledJobsFilter: false,
                filterJobs: [
                    {
                        id: 2,
                    },
                ],
            });
        const {UNSAFE_getByType} = render(
            <JobTemplate/>
        );
        const list = UNSAFE_getByType("mock-list-jobs");
        expect(list.props.jobs).toEqual([
            {
                id: 2,
            },
        ]);
        expect(list.props.text).toBe("No hay coincidencias");
    });

    it("passes callbacks to ListJobs", () => {
        const moreJobs = jest.fn();
        const redirect = jest.fn();
        const refreshJobs = jest.fn();
        (useJobTemplate as jest.Mock)
            .mockReturnValue({
                ...useJobTemplate(),
                moreJobs,
                redirect,
                refreshJobs,
            });
        const {UNSAFE_getByType} = render(
            <JobTemplate/>
        );

        const list = UNSAFE_getByType("mock-list-jobs");
        expect(list.props.moreJobs).toBe(moreJobs);
        expect(list.props.redirect).toBe(redirect);
        expect(list.props.refreshJobs).toBe(refreshJobs);
    });

    it("passes data to ModalCategories", () => {
        const {UNSAFE_getByType} = render(
            <JobTemplate/>
        );
        const modal = UNSAFE_getByType("mock-modal-categories");
        expect(modal.props.categories).toEqual(["frontend"]);
    });

    it("opens bottom sheet when filter button is pressed", () => {
        const expand = jest.fn();
        (useJobTemplate as jest.Mock)
            .mockReturnValue({
                ...useJobTemplate(),
                bottomSheetRef: {
                    current: {
                        expand,
                    },
                },
            });
        const {UNSAFE_getAllByType} = render(<JobTemplate/>);
        const buttons = UNSAFE_getAllByType(TouchableOpacity);
        fireEvent.press(buttons[0]);
        expect(expand).toHaveBeenCalled();
    });

    it("calls selectFilter when a job type is selected", () => {
        const selectFilter = jest.fn();
        (useJobTemplate as jest.Mock)
            .mockReturnValue({
                ...useJobTemplate(),
                typeJob: [
                    "fulltime",
                ],
                selectFilter,
            });
        const {UNSAFE_getByType} = render(
            <JobTemplate/>
        );
        const cardType = UNSAFE_getByType("mock-card-type-job");
        cardType.props.selectFilter();
        expect(selectFilter).toHaveBeenCalledWith("fulltime");
    });
});
