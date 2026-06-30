import React from "react";
import {render, fireEvent} from "@testing-library/react-native";
import {TouchableOpacity} from "react-native";
import {CardTypeJob} from "@/components/organisms";
import {useColorScheme} from "@/hooks/use-color-scheme";

jest.mock("@/components/atoms", () => {
    const React = require("react");

    return {
        ThemedText: ({children, ...props}: any) => (
            <mock-themed-text {...props}>
                {children}
            </mock-themed-text>
        ),
    };
});

jest.mock("@/hooks/use-color-scheme", () => ({
    useColorScheme: jest.fn(),
}));

jest.mock("@/constants/theme", () => ({
    Colors: {
        light: {
            success: "green",
            background: "white",
            text: "black",
        },
        dark: {
            success: "lightgreen",
            background: "black",
            text: "white",
        },
    },
}));

jest.mock("@/util/numTypeJob", () => ({
    typeJobs: {
        frontend: "Frontend",
        backend: "Backend",
    },
}));

describe("CardTypeJob", () => {
    beforeEach(() => {
        jest.clearAllMocks();
        (useColorScheme as jest.Mock).mockReturnValue("light");
    });

    it("renders mapped job type name", () => {
        const {UNSAFE_getByType} = render(
            <CardTypeJob
                filter={[]}
                typeJob="frontend"
                selectFilter={jest.fn()}
            />
        );

        const text = UNSAFE_getByType("mock-themed-text");
        expect(text.props.children).toBe("Frontend");
    });

    it("renders original type when mapping does not exist", () => {
        const {UNSAFE_getByType} = render(
            <CardTypeJob
                filter={[]}
                typeJob="unknown"
                selectFilter={jest.fn()}
            />
        );

        const text = UNSAFE_getByType("mock-themed-text");
        expect(text.props.children).toBe("unknown");
    });

    it("uses success background when type is selected", () => {
        const {UNSAFE_getByType} = render(
            <CardTypeJob
                filter={[
                    "frontend"
                ]}
                typeJob="frontend"
                selectFilter={jest.fn()}
            />
        );

        const button = UNSAFE_getByType(TouchableOpacity);
        expect(button.props.style).toEqual(
            expect.objectContaining({
                backgroundColor: "green",
            })
        );
    });

    it("uses background color when type is not selected", () => {
        const {UNSAFE_getByType} = render(
            <CardTypeJob
                filter={[]}
                typeJob="frontend"
                selectFilter={jest.fn()}
            />
        );

        const button = UNSAFE_getByType(TouchableOpacity);

        expect(button.props.style).toEqual(
            expect.objectContaining({
                backgroundColor: "white",
            })
        );
    });

    it("calls selectFilter when pressed", () => {
        const selectFilter = jest.fn();
        const {UNSAFE_getByType} = render(
            <CardTypeJob
                filter={[]}
                typeJob="frontend"
                selectFilter={selectFilter}
            />
        );

        const button = UNSAFE_getByType(TouchableOpacity);
        fireEvent.press(button);
        expect(selectFilter).toHaveBeenCalled();
    });

    it("uses light colors when color scheme is undefined", () => {
        (useColorScheme as jest.Mock).mockReturnValue(undefined);
        const {UNSAFE_getByType} = render(
            <CardTypeJob
                filter={[]}
                typeJob="frontend"
                selectFilter={jest.fn()}
            />
        );
        const button = UNSAFE_getByType(TouchableOpacity);
        expect(button.props.style).toEqual(
            expect.objectContaining({
                borderColor: "black",
                backgroundColor: "white",
            })
        );
    });
});
