import React from "react";
import {render} from "@testing-library/react-native";
import {ActivityIndicator} from "react-native";

import {LoadingComponent} from "@/components/atoms/loading";


describe("LoadingComponent", () => {

    it("renders ActivityIndicator with size and color", () => {

        const {UNSAFE_getByType} = render(
            <LoadingComponent
                size="large"
                color="red"
            />
        );

        const loader = UNSAFE_getByType(ActivityIndicator);
        expect(loader.props.size).toBe("large");
        expect(loader.props.color).toBe("red");
    });



    it("renders small ActivityIndicator", () => {

        const {UNSAFE_getByType} = render(
            <LoadingComponent
                size="small"
                color="blue"
            />
        );

        const loader = UNSAFE_getByType(ActivityIndicator);
        expect(loader.props.size).toBe("small");
        expect(loader.props.color)
            .toBe("blue");
    });
});
