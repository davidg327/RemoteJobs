import React from "react";
import {render} from "@testing-library/react-native";
import {HeaderBack} from "@/components/molecules/headerBack";
import {useColorScheme} from "@/hooks/use-color-scheme";

jest.mock("@/components/atoms", () => {
    const React = require("react");

    return {
        IconSymbol: (props: any) => (
            <mock-icon-symbol {...props}/>
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
            text: "black",
        },
        dark: {
            text: "white",
        },
    },
}));

describe("HeaderBack", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });



    it("renders title text", () => {
        (useColorScheme as jest.Mock).mockReturnValue("light");

        const {UNSAFE_getByType} = render(
            <HeaderBack
                text="Go back"
                action={jest.fn()}
            />
        );
        const text = UNSAFE_getByType("mock-themed-text");
        expect(text.props.children).toBe("Go back");
    });

    it("renders back icon with correct props", () => {
        (useColorScheme as jest.Mock).mockReturnValue("light");
        const {UNSAFE_getByType} = render(
            <HeaderBack
                text="Header"
                action={jest.fn()}
            />
        );

        const icon = UNSAFE_getByType("mock-icon-symbol");
        expect(icon.props.name).toBe("chevron.left");
        expect(icon.props.size).toBe(45);
        expect(icon.props.color).toBe("black");
    });

    it("uses dark theme color", () => {
        (useColorScheme as jest.Mock).mockReturnValue("dark");
        const {UNSAFE_getByType} = render(
            <HeaderBack
                text="Dark"
                action={jest.fn()}
            />
        );
        const icon = UNSAFE_getByType("mock-icon-symbol");
        expect(icon.props.color).toBe("white");
    });

    it("uses light theme color when color scheme is undefined", () => {
        (useColorScheme as jest.Mock).mockReturnValue(undefined);
        const {UNSAFE_getByType} = render(
            <HeaderBack
                text="Default light"
                action={jest.fn()}
            />
        );
        const icon = UNSAFE_getByType("mock-icon-symbol");
        expect(icon.props.color).toBe("black");
    });
});
