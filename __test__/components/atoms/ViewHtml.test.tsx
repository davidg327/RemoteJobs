import React from "react";
import * as ReactNative from "react-native";
import {render} from "@testing-library/react-native";
import {ViewHtml} from "@/components/atoms/view-html";
import {useColorScheme} from "@/hooks/use-color-scheme";

jest.mock("react-native-render-html", () => {
    const React = require("react");

    return (props: any) => (
        <mock-render-html {...props} />
    );
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


describe("ViewHtml", () => {

    beforeEach(() => {
        jest.clearAllMocks();
        jest.spyOn(
            ReactNative,
            "useWindowDimensions"
        )
            .mockReturnValue({
                width: 350,
                height: 800,
                scale: 1,
                fontScale: 1,
            });

    });

    it("renders html content with width and light theme", () => {
        (useColorScheme as jest.Mock).mockReturnValue("light");
        const {UNSAFE_getByType} = render(
            <ViewHtml
                source="<h1>Hello</h1>"
            />
        );

        const html = UNSAFE_getByType("mock-render-html");
        expect(html.props.contentWidth).toBe(750);
        expect(html.props.source).toEqual({
                html: "<h1>Hello</h1>",
        });
        expect(html.props.baseStyle).toEqual({
                color: "black",
        });
    });

    it("uses dark theme text color", () => {
        (useColorScheme as jest.Mock).mockReturnValue("dark");
        const {UNSAFE_getByType} = render(
            <ViewHtml
                source="<p>Dark</p>"
            />
        );

        const html = UNSAFE_getByType("mock-render-html");
        expect(html.props.baseStyle).toEqual({
                color: "white"
        });
    });

    it("uses light theme when color scheme is undefined", () => {

        (useColorScheme as jest.Mock).mockReturnValue(undefined);
        const {UNSAFE_getByType} = render(
            <ViewHtml
                source="<p>No theme</p>"
            />
        );
        const html = UNSAFE_getByType("mock-render-html");
        expect(html.props.baseStyle).toEqual({
            color: "black"
        });
    });
});
