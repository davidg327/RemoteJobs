import React from "react";
import {render, fireEvent} from "@testing-library/react-native";
import {ModalDelete} from "@/components/organisms/modalDelete";
import {Modal, TouchableOpacity} from "react-native";

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

describe("ModalDelete", () => {

    it("renders modal visible", () => {
        const {UNSAFE_getByType} = render(
            <ModalDelete
                visible={true}
                cancelDelete={jest.fn()}
                handleConfirmDelete={jest.fn()}
            />
        );

        const modal = UNSAFE_getByType("Modal");
        expect(modal.props.visible).toBe(true);
    });

    it("calls cancelDelete when cancel button is pressed", () => {
        const cancelDelete = jest.fn();
        const {UNSAFE_getAllByType} = render(
            <ModalDelete
                visible={true}
                cancelDelete={cancelDelete}
                handleConfirmDelete={jest.fn()}
            />
        );

        const buttons = UNSAFE_getAllByType(TouchableOpacity);
        fireEvent.press(buttons[0]);
        expect(cancelDelete).toHaveBeenCalled();
    });


    it("calls handleConfirmDelete when accept button is pressed", () => {
        const handleConfirmDelete = jest.fn();
        const {UNSAFE_getAllByType} = render(
            <ModalDelete
                visible={true}
                cancelDelete={jest.fn()}
                handleConfirmDelete={handleConfirmDelete}
            />
        );

        const buttons = UNSAFE_getAllByType(TouchableOpacity);
        fireEvent.press(buttons[1]);
        expect(handleConfirmDelete).toHaveBeenCalled();
    });

    it("renders hidden modal when visible is false", () => {
        const {UNSAFE_getByType} = render(
            <ModalDelete
                visible={false}
                cancelDelete={jest.fn()}
                handleConfirmDelete={jest.fn()}
            />
        );
        const modal = UNSAFE_getByType(Modal);
        expect(modal.props.visible).toBe(false);
    });
});
