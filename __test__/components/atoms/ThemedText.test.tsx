import React from "react";
import {render} from "@testing-library/react-native";
import {Text} from "react-native";

import {ThemedText} from "@/components/atoms/themed-text";


jest.mock("@/hooks/use-theme-color", () => ({
    useThemeColor: jest.fn(),
}));


import {useThemeColor} from "@/hooks/use-theme-color";


describe("ThemedText", () => {

    beforeEach(() => {
        jest.clearAllMocks();
        (useThemeColor as jest.Mock).mockReturnValue("black");
    });

    it("renders title type", () => {
        const {UNSAFE_getByType} = render(
            <ThemedText type="title">
                Title
            </ThemedText>
        );

        const text = UNSAFE_getByType(Text);
        expect(text.props.style).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    fontSize: 32,
                    fontWeight: "bold",
                    lineHeight: 32,
                }),
            ])
        );
    });

    it("renders bold text types", () => {
        const types = [
            "defaultBold",
            "defaultSemiBold",
            "miniBold",
            "miniSemiBold",
        ] as const;

        types.forEach(type => {
            const {UNSAFE_getByType} = render(
                <ThemedText type={type}>
                    Text
                </ThemedText>
            );
            const text = UNSAFE_getByType(Text);
            expect(text.props.style).toEqual(
                expect.arrayContaining([
                    expect.any(Object),
                ])
            );
        });
    });

    it("renders subtitle type", () => {

        const {UNSAFE_getByType} = render(
            <ThemedText type="subtitle">
                Subtitle
            </ThemedText>
        );
        const text = UNSAFE_getByType(Text);
        expect(text.props.style).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    fontSize: 20,
                    fontWeight: "bold",
                }),
            ])
        );
    });

    it("renders link type", () => {
        const {UNSAFE_getByType} = render(
            <ThemedText type="link">
                Link
            </ThemedText>
        );

        const text = UNSAFE_getByType(Text);
        expect(text.props.style).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    fontSize: 16,
                    lineHeight: 30,
                }),
            ])
        );
    });

    it("renders simpleText and thin types", () => {

        const {UNSAFE_getByType: getSimple} = render(
            <ThemedText type="simpleText">
                Simple
            </ThemedText>
        );

        expect(getSimple(Text).props.style).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    fontSize: 12,
                }),
            ])
        );

        const {UNSAFE_getByType: getThin} = render(
            <ThemedText type="thin">
                Thin
            </ThemedText>
        );

        expect(getThin(Text).props.style).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    fontSize: 10,
                }),
            ])
        );
    });

    it("uses custom colors", () => {
        render(
            <ThemedText
                lightColor="red"
                darkColor="blue"
            >
                Color
            </ThemedText>
        );

        expect(useThemeColor).toHaveBeenCalledWith(
            {
                light: "red",
                dark: "blue",
            },
            "text"
        );
    });

    it("passes custom style and text props", () => {

        const style = { marginTop: 20 };

        const {UNSAFE_getByType} = render(
            <ThemedText
                style={style}
                numberOfLines={2}
            >
                Custom
            </ThemedText>
        );

        const text = UNSAFE_getByType(Text);
        expect(text.props.style).toContain(style);
        expect(text.props.numberOfLines).toBe(2);
    });
});
