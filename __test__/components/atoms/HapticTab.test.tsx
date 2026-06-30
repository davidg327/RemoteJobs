import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { Platform } from "react-native";
import * as Haptics from "expo-haptics";

import { HapticTab } from "@/components/atoms/haptic-tab";

jest.mock("expo-haptics", () => ({
    impactAsync: jest.fn(),
    ImpactFeedbackStyle: {
        Light: "Light",
    },
}));

jest.mock("@react-navigation/elements", () => {
    const React = require("react");
    const { Pressable } = require("react-native");

    return {
        PlatformPressable: ({ children, ...props }: any) => (
            <Pressable testID="platform-pressable" {...props}>
                {children}
            </Pressable>
        ),
    };
});

describe("HapticTab", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("calls onPressIn", () => {
        const onPressIn = jest.fn();

        const { getByTestId } = render(
            <HapticTab onPressIn={onPressIn} />
        );
        fireEvent(getByTestId("platform-pressable"), "pressIn");
        expect(onPressIn).toHaveBeenCalled();
    });

    it("calls haptic feedback on iOS", () => {
        Object.defineProperty(Platform, "OS", {
            value: "ios",
            configurable: true,
        });
        const { getByTestId } = render(
            <HapticTab />
        );

        fireEvent(getByTestId("platform-pressable"), "pressIn");
        expect(Haptics.impactAsync).toHaveBeenCalledWith("Light");
    });

    it("not calls haptic feedback on Android", () => {
        Object.defineProperty(Platform, "OS", {
            value: "android",
            configurable: true,
        });
        const { getByTestId } = render(
            <HapticTab />
        );

        fireEvent(getByTestId("platform-pressable"), "pressIn");
        expect(Haptics.impactAsync).not.toHaveBeenCalled();
    });
});
