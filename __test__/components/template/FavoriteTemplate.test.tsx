import React from "react";
import {render} from "@testing-library/react-native";
import {FavoriteTemplate} from "@/components/template/FavoriteTemplate";
import {useFavoriteTemplate} from "@/hooks/template/use-favorite-template";

jest.mock("@/hooks/template/use-favorite-template", () => ({
    useFavoriteTemplate: jest.fn(),
}));

jest.mock("@/components/molecules", () => {
    const React = require("react");
    return {
        Header: (props: any) => (
            <mock-header {...props}/>
        ),
    };
});

jest.mock("@/components/organisms", () => {
    const React = require("react");
    return {
        ListJobs: (props: any) => (
            <mock-list-jobs {...props}/>
        ),
        ModalDelete: (props: any) => (
            <mock-modal-delete {...props}/>
        ),
    };
});

describe("FavoriteTemplate", () => {
    beforeEach(() => {
        jest.clearAllMocks();
        (useFavoriteTemplate as jest.Mock)
            .mockReturnValue({
                favorites: [
                    {
                        id: 1,
                        title: "React Native",
                    },
                ],
                modal: true,
                cancelDelete: jest.fn(),
                deleteFavorite: jest.fn(),
                handleConfirmDelete: jest.fn(),
                redirect: jest.fn(),
            });
    });

    it("renders header title", () => {
        const {UNSAFE_getByType} = render(
            <FavoriteTemplate/>
        );
        const header = UNSAFE_getByType("mock-header");
        expect(header.props.text).toBe("Lista de Favoritos");
    });

    it("passes favorites data to ListJobs", () => {
        const {UNSAFE_getByType} = render(
            <FavoriteTemplate/>
        );
        const list = UNSAFE_getByType("mock-list-jobs");
        expect(list.props.jobs).toEqual([
            {
                id: 1,
                title: "React Native",
            },
        ]);
        expect(list.props.text).toBe("No hay favoritos en estos momentos");
    });

    it("passes redirect and delete functions to ListJobs", () => {
        const redirect = jest.fn();
        const deleteFavorite = jest.fn();
        (useFavoriteTemplate as jest.Mock)
            .mockReturnValue({
                favorites: [],
                modal: false,
                cancelDelete: jest.fn(),
                deleteFavorite,
                handleConfirmDelete: jest.fn(),
                redirect,
            });
        const {UNSAFE_getByType} = render(
            <FavoriteTemplate/>
        );
        const list = UNSAFE_getByType("mock-list-jobs");
        expect(list.props.redirect).toBe(redirect);
        expect(list.props.deleteFavorite).toBe(deleteFavorite);
    });

    it("passes modal state and actions to ModalDelete", () => {
        const cancelDelete = jest.fn();
        const handleConfirmDelete = jest.fn();
        (useFavoriteTemplate as jest.Mock)
            .mockReturnValue({
                favorites: [],
                modal: true,
                cancelDelete,
                deleteFavorite: jest.fn(),
                handleConfirmDelete,
                redirect: jest.fn(),
            });
        const {UNSAFE_getByType} = render(
            <FavoriteTemplate/>
        );
        const modal = UNSAFE_getByType("mock-modal-delete");
        expect(modal.props.visible).toBe(true);
        expect(modal.props.cancelDelete).toBe(cancelDelete);
        expect(modal.props.handleConfirmDelete).toBe(handleConfirmDelete);
    });

    it("passes moreJobs and refreshJobs callbacks to ListJobs", () => {
        const {UNSAFE_getByType} = render(
            <FavoriteTemplate/>
        );
        const list = UNSAFE_getByType("mock-list-jobs");
        expect(list.props.moreJobs).toBeDefined();
        expect(list.props.refreshJobs).toBeDefined();
        expect(() => list.props.moreJobs()).not.toThrow();
        expect(() => list.props.refreshJobs()).not.toThrow();
    });
});
