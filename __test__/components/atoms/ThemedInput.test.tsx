import React from "react";
import {render} from "@testing-library/react-native";
import {TextInput} from "react-native";

import {ThemedInput} from "@/components/atoms/themed-input";


jest.mock("@/hooks/use-theme-color", () => ({
    useThemeColor: jest.fn(),
}));


import {useThemeColor} from "@/hooks/use-theme-color";


describe("ThemedInput", () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("renders TextInput with theme colors", () => {

        (useThemeColor as jest.Mock)
            .mockImplementation((colors, key) => {
                if (key === "text") {
                    return "black";
                }
                if (key === "background") {
                    return "white";
                }
                return "gray";
            });

        const {UNSAFE_getByType} = render(
            <ThemedInput
                placeholder="Name"
            />
        );

        const input = UNSAFE_getByType(TextInput);
        expect(input.props.placeholder).toBe("Name");
        expect(input.props.style).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    color: "black",
                    backgroundColor: "white",
                }),
            ])
        );
    });

    it("uses provided placeholderTextColor", () => {

        (useThemeColor as jest.Mock).mockReturnValue("gray");

        const {UNSAFE_getByType} = render(
            <ThemedInput
                placeholder="Email"
                placeholderTextColor="red"
            />
        );

        const input = UNSAFE_getByType(TextInput);
        expect(input.props.placeholderTextColor).toBe("red");
    });

    it("uses icon theme color when placeholderTextColor is not provided", () => {

        (useThemeColor as jest.Mock).mockImplementation((colors, key) => {
                if (key === "icon") {
                    return "gray";
                }
                return "black";
            });
        const {UNSAFE_getByType} = render(
            <ThemedInput
                placeholder="Password"
            />
        );

        const input = UNSAFE_getByType(TextInput);
        expect(input.props.placeholderTextColor).toBe("gray");
    });

    it("passes custom style to TextInput", () => {

        (useThemeColor as jest.Mock).mockReturnValue("black");
        const customStyle = {
            marginTop: 20,
        };
        const {UNSAFE_getByType} = render(
            <ThemedInput
                style={customStyle}
            />
        );
        const input = UNSAFE_getByType(TextInput);
        expect(input.props.style).toContain(customStyle);
    });
});
