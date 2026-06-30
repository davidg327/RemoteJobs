import React from "react";
import {render} from "@testing-library/react-native";

import {Header} from "@/components/molecules/header";

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

describe("Header", () => {
    it("renders provided text", () => {
        const {UNSAFE_getByType} = render(
            <Header
                text="My Header"
            />
        );
        const text = UNSAFE_getByType("mock-themed-text");
        expect(text.props.children).toBe("My Header");
    });

    it("renders ThemedText with subtitle type", () => {
        const {UNSAFE_getByType} = render(
            <Header
                text="Title"
            />
        );
        const text = UNSAFE_getByType("mock-themed-text");
        expect(text.props.type).toBe("subtitle");
    });

    it("passes custom text style", () => {
        const {UNSAFE_getByType} = render(
            <Header
                text="Styled"
            />
        );
        const text = UNSAFE_getByType("mock-themed-text");
        expect(text.props.style).toEqual({
            marginBottom: 20,
            marginTop: 20,
            textAlign: "center",
        });
    });
});
