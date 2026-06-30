import React from "react";
import {render} from "@testing-library/react-native";

import {IconSymbol} from "@/components/atoms/icon-symbol";


jest.mock("@expo/vector-icons/MaterialIcons", () => {
    const React = require("react");

    return (props: any) => (
        <mock-material-icons {...props} />
    );
});


describe("IconSymbol", () => {

    it("renders mapped MaterialIcon name", () => {
        const {UNSAFE_getByType} = render(
            <IconSymbol
                name="house.fill"
                color="red"
            />
        );
        const icon = UNSAFE_getByType("mock-material-icons");
        expect(icon.props.name).toBe("home");
    });

    it("uses default size when size is not provided", () => {
        const {UNSAFE_getByType} = render(
            <IconSymbol
                name="heart.fill"
                color="blue"
            />
        );

        const icon = UNSAFE_getByType("mock-material-icons");
        expect(icon.props.size).toBe(24);
    });



    it("passes custom size, color and style", () => {
        const style = {
            marginTop: 10,
        };
        const {UNSAFE_getByType} = render(
            <IconSymbol
                name="search.fill"
                size={40}
                color="black"
                style={style}
            />
        );
        const icon = UNSAFE_getByType("mock-material-icons");
        expect(icon.props.size).toBe(40);
        expect(icon.props.color).toBe("black");
        expect(icon.props.style).toEqual(style);
        expect(icon.props.name).toBe("search");
    });

    it("maps all supported icons correctly", () => {
        const icons = [
            ["heart.fill", "favorite"],
            ["share.fill", "share"],
            ["trash.fill", "delete"],
            ["filter.fill", "filter-alt"],
            ["paperplane.fill", "send"],
            ["chevron.left", "chevron-left"],
            ["chevron.right", "chevron-right"],
        ] as const;

        icons.forEach(([symbol, material]) => {

            const {UNSAFE_getByType} = render(
                <IconSymbol
                    name={symbol}
                    color="black"
                />
            );

            const icon = UNSAFE_getByType("mock-material-icons");
            expect(icon.props.name).toBe(material);
        });
    });
});
