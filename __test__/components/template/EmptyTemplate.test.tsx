import React from "react";
import {render} from "@testing-library/react-native";
import {EmptyTemplate} from "@/components/template/EmptyTemplate";

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

describe("EmptyTemplate", () => {

    it("renders empty message text", () => {
        const {UNSAFE_getByType} = render(
            <EmptyTemplate
                text="No hay datos"
            />
        );
        const text = UNSAFE_getByType("mock-themed-text");
        expect(text.props.children).toBe("No hay datos");
    });

    it("renders image with correct props", () => {
        const {UNSAFE_getByType} = render(
            <EmptyTemplate
                text="Empty"
            />
        );

        const image = UNSAFE_getByType("mock-image");
        expect(image.props.contentFit).toBe("contain");
        expect(image.props.style).toEqual(
            expect.objectContaining({
                height: 220,
                width: 220,
            })
        );
    });

    it("renders title text type", () => {
        const {UNSAFE_getByType} = render(
            <EmptyTemplate
                text="Sin resultados"
            />
        );
        const text = UNSAFE_getByType("mock-themed-text");
        expect(text.props.type).toBe("title");
    });
});
