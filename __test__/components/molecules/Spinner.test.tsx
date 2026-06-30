import React from "react";
import {render} from "@testing-library/react-native";
import {useColorScheme} from "@/hooks/use-color-scheme";
import {Spinner} from "@/components/molecules/spinner";

jest.mock("@/components/atoms", () => {
    const React = require("react");
    return {
        LoadingComponent: (props: any) => (
            <mock-loading-component {...props}/>
        ),
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
        },
        dark: {
            success: "lightgreen",
        },
    },
}));

describe("Spinner", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("renders loading component with correct props", () => {
        (useColorScheme as jest.Mock).mockReturnValue("light");
        const {UNSAFE_getByType} = render(
            <Spinner
                text="Loading..."
            />
        );

        const loader = UNSAFE_getByType("mock-loading-component");
        expect(loader.props.size).toBe("large");
        expect(loader.props.color).toBe("green");
    });

    it("renders text with correct value and type", () => {
        (useColorScheme as jest.Mock).mockReturnValue("light");
        const {UNSAFE_getByType} = render(
            <Spinner
                text="Please wait"
            />
        );

        const text = UNSAFE_getByType("mock-themed-text");
        expect(text.props.children).toBe("Please wait");
        expect(text.props.type).toBe("subtitle");
    });

    it("uses dark theme success color", () => {
        (useColorScheme as jest.Mock).mockReturnValue("dark");
        const {UNSAFE_getByType} = render(
            <Spinner
                text="Loading"
            />
        );
        const loader = UNSAFE_getByType("mock-loading-component");
        expect(loader.props.color).toBe("lightgreen");
    });

    it("uses light theme when color scheme is undefined", () => {
        (useColorScheme as jest.Mock).mockReturnValue(undefined);
        const {UNSAFE_getByType} = render(
            <Spinner
                text="Loading"
            />
        );

        const loader = UNSAFE_getByType("mock-loading-component");
        expect(loader.props.color).toBe("green");
    });
});
