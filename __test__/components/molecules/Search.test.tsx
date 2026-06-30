import React from "react";
import {render, fireEvent} from "@testing-library/react-native";
import {Search} from "@/components/molecules/search";
import {useColorScheme} from "@/hooks/use-color-scheme";

jest.mock("@/components/atoms", () => {
    const React = require("react");
    return {
        IconSymbol: (props: any) => (
            <mock-icon-symbol {...props}/>
        ),
        ThemedInput: (props: any) => (
            <mock-themed-input {...props}/>
        ),
    };
});

jest.mock("@/hooks/use-color-scheme", () => ({
    useColorScheme: jest.fn(),
}));

jest.mock("@/constants/theme", () => ({
    Colors: {
        light: {
            text: "black",
        },
        dark: {
            text: "white",
        },
    },
}));

describe("Search", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("renders search icon with light theme color", () => {
        (useColorScheme as jest.Mock).mockReturnValue("light");

        const {UNSAFE_getByType} = render(
            <Search
                value=""
                onChangeText={jest.fn()}
            />
        );

        const icon = UNSAFE_getByType("mock-icon-symbol");
        expect(icon.props.name).toBe("search.fill");
        expect(icon.props.size).toBe(28);
        expect(icon.props.color).toBe("black");
    });

    it("renders input with correct props", () => {
        const onChangeText = jest.fn();

        const {UNSAFE_getByType} = render(
            <Search
                value="hello"
                onChangeText={onChangeText}
                placeholder="Search"
            />
        );

        const input = UNSAFE_getByType("mock-themed-input");
        expect(input.props.value).toBe("hello");
        expect(input.props.placeholder).toBe("Search");
        expect(input.props.onChangeText).toBe(onChangeText);
    });

    it("calls onChangeText when input changes", () => {
        const onChangeText = jest.fn();
        const {UNSAFE_getByType} = render(
            <Search
                value=""
                onChangeText={onChangeText}
            />
        );

        const input = UNSAFE_getByType("mock-themed-input");
        fireEvent(input, "changeText", "new value");
        expect(onChangeText).toHaveBeenCalledWith("new value");
    });

    it("uses dark theme colors", () => {
        (useColorScheme as jest.Mock).mockReturnValue("dark");
        const {UNSAFE_getByType} = render(
            <Search
                value=""
                onChangeText={jest.fn()}
            />
        );

        const icon = UNSAFE_getByType("mock-icon-symbol");
        expect(icon.props.color).toBe("white");
    });

    it("uses light theme when color scheme is undefined", () => {
        (useColorScheme as jest.Mock).mockReturnValue(undefined);

        const {UNSAFE_getByType} = render(
            <Search
                value=""
                onChangeText={jest.fn()}
            />
        );

        const icon = UNSAFE_getByType("mock-icon-symbol");
        expect(icon.props.color).toBe("black");
    });
});
