import React from "react";
import {render} from "@testing-library/react-native";
import {ErrorTemplate} from "@/components/template/ErrorTemplate";

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

jest.mock("expo-image", () => {
    const React = require("react");
    return {
        Image: (props: any) => (
            <mock-image {...props}/>
        ),
    };
});

describe("ErrorTemplate", () => {

    it("renders error message text", () => {
        const {UNSAFE_getByType} = render(
            <ErrorTemplate
                text="Ocurrió un error"
            />
        );
        const text = UNSAFE_getByType("mock-themed-text");
        expect(text.props.children).toBe("Ocurrió un error");
    });

    it("renders image with correct styles", () => {
        const {UNSAFE_getByType} = render(
            <ErrorTemplate
                text="Error"
            />
        );
        const image = UNSAFE_getByType("mock-image");
        expect(image.props.style).toEqual(
            expect.objectContaining({
                height: "50%",
                width: "70%",
            })
        );
    });

    it("renders text with title type", () => {
        const {UNSAFE_getByType} = render(
            <ErrorTemplate
                text="Error"
            />
        );
        const text = UNSAFE_getByType("mock-themed-text");
        expect(text.props.type).toBe("title");
    });
});
