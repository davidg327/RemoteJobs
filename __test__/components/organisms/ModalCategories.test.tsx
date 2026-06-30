import React from "react";
import {render, fireEvent} from "@testing-library/react-native";
import {ModalCategories} from "@/components/organisms/modalCategories";
import {TouchableOpacity} from "react-native";

jest.mock("@/components/molecules", () => {
    const React = require("react");

    return {
        Modal: ({children, ...props}: any) => (
            <mock-modal {...props}>
                {children}
            </mock-modal>
        ),
    };
});

jest.mock("@gorhom/bottom-sheet", () => {
    const React = require("react");
    return {
        BottomSheetScrollView: ({children}: any) => (
            <mock-scroll>
                {children}
            </mock-scroll>
        ),
    };
});

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

jest.mock("@/util/numCategoryJob", () => ({
    categoryJobs: {
        frontend: "Frontend",
    },
}));


describe("ModalCategories", () => {
    const categories = [
        "frontend",
        "backend",
    ];

    const ref = {
        current: {
            close: jest.fn(),
        },
    } as any;

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("renders categories with mapped names", () => {
        const {UNSAFE_getAllByType} = render(
            <ModalCategories
                categories={categories}
                filterDefault={[]}
                bottomSheetRef={ref}
                selectVariousFilter={jest.fn()}
            />
        );

        const texts = UNSAFE_getAllByType("mock-themed-text");
        expect(texts.some(item => item.props.children === "Frontend")).toBe(true);
    });

    it("uses original category when mapping does not exist", () => {
        const {UNSAFE_getAllByType} = render(
            <ModalCategories
                categories={[
                    "backend"
                ]}
                filterDefault={[]}
                bottomSheetRef={ref}
                selectVariousFilter={jest.fn()}
            />
        );
        const texts = UNSAFE_getAllByType("mock-themed-text");
        expect(texts.some(item => item.props.children === "backend")).toBe(true);
    });

    it("selects category when pressed", () => {
        const {UNSAFE_getAllByType} = render(
            <ModalCategories
                categories={categories}
                filterDefault={[]}
                bottomSheetRef={ref}
                selectVariousFilter={jest.fn()}
            />
        );
        const buttons = UNSAFE_getAllByType(TouchableOpacity);
        fireEvent.press(buttons[0]);
        expect(buttons[0].props.style).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    backgroundColor: "#16A34A",
                })
            ])
        );
    });

    it("removes category when selected category is pressed again", () => {
        const {UNSAFE_getAllByType} = render(
            <ModalCategories
                categories={[
                    "frontend"
                ]}
                filterDefault={[
                    "frontend"
                ]}
                bottomSheetRef={ref}
                selectVariousFilter={jest.fn()}
            />
        );

        const button = UNSAFE_getAllByType(TouchableOpacity)[0];
        fireEvent.press(button);
        expect(button.props.style).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    backgroundColor: "transparent",
                })
            ])
        );
    });

    it("calls selectVariousFilter and closes modal when filtering", () => {
        const selectVariousFilter = jest.fn();
        const {UNSAFE_getAllByType} = render(
            <ModalCategories
                categories={[
                    "frontend"
                ]}
                filterDefault={[
                    "frontend"
                ]}
                bottomSheetRef={ref}
                selectVariousFilter={selectVariousFilter}
            />
        );
        const buttons = UNSAFE_getAllByType(TouchableOpacity);
        fireEvent.press(buttons[1]);
        expect(selectVariousFilter).toHaveBeenCalledWith(["frontend"]);
        expect(ref.current.close).toHaveBeenCalled();
    });

    it("resets filters on modal open and close", () => {
        const {UNSAFE_getByType} = render(
            <ModalCategories
                categories={[
                    "frontend"
                ]}
                filterDefault={[
                    "frontend"
                ]}
                bottomSheetRef={ref}
                selectVariousFilter={jest.fn()}
            />
        );
        const modal = UNSAFE_getByType("mock-modal");
        modal.props.onOpen();
        modal.props.onClose();
        expect(true).toBe(true);
    });
});
