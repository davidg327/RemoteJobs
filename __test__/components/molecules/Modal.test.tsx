import React from "react";
import {render, fireEvent} from "@testing-library/react-native";
import {Modal} from "@/components/molecules/modal";

jest.mock("@gorhom/bottom-sheet", () => {
    const React = require("react");

    return React.forwardRef(
        ({children, ...props}: any, ref: any) => (
            <mock-bottom-sheet
                {...props}
                ref={ref}
            >
                {children}
            </mock-bottom-sheet>
        )
    );
});


describe("Modal", () => {

    it("renders children inside BottomSheet", () => {
        const ref = React.createRef();
        const {UNSAFE_getByType} = render(
            <Modal
                bottomSheetRef={ref}
                snapPoints={["50%"]}
                onOpen={jest.fn()}
                onClose={jest.fn()}
            >
                <mock-child>
                    Content
                </mock-child>
            </Modal>
        );
        const child = UNSAFE_getByType("mock-child");
        expect(child).toBeTruthy();
    });

    it("passes BottomSheet props correctly", () => {
        const ref = React.createRef();
        const {UNSAFE_getByType} = render(
            <Modal
                bottomSheetRef={ref}
                snapPoints={["25%", "50%"]}
                onOpen={jest.fn()}
                onClose={jest.fn()}
            >
                Content
            </Modal>
        );
        const sheet = UNSAFE_getByType("mock-bottom-sheet");
        expect(sheet.props.index).toBe(-1);
        expect(sheet.props.snapPoints).toEqual([
            "25%",
            "50%",
        ]);
        expect(sheet.props.enablePanDownToClose).toBe(true);
        expect(sheet.props.enableDynamicSizing).toBe(false);
    });

    it("calls onOpen when bottom sheet index is greater than or equal to zero", () => {
        const onOpen = jest.fn();
        const onClose = jest.fn();

        const ref = React.createRef();
        const {UNSAFE_getByType} = render(
            <Modal
                bottomSheetRef={ref}
                snapPoints={["50%"]}
                onOpen={onOpen}
                onClose={onClose}
            >
                Content
            </Modal>
        );

        const sheet = UNSAFE_getByType("mock-bottom-sheet");
        fireEvent(
            sheet,
            "change",
            0
        );
        expect(onOpen).toHaveBeenCalled();
        expect(onClose).not.toHaveBeenCalled();
    });

    it("calls onClose when bottom sheet index is -1", () => {

        const onOpen = jest.fn();
        const onClose = jest.fn();

        const ref = React.createRef();

        const {UNSAFE_getByType} = render(
            <Modal
                bottomSheetRef={ref}
                snapPoints={["50%"]}
                onOpen={onOpen}
                onClose={onClose}
            >
                Content
            </Modal>
        );

        const sheet = UNSAFE_getByType("mock-bottom-sheet");
        fireEvent(sheet, "change", -1);
        expect(onClose).toHaveBeenCalled();
        expect(onOpen).not.toHaveBeenCalled();
    });
});
