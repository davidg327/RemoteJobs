import React from "react";
import {View} from "react-native";
import {Header} from "@/components/molecules";
import {ListJobs, ModalDelete} from "@/components/organisms";
import {useFavoriteTemplate} from "@/hooks/template/use-favorite-template";

export function FavoriteTemplate () {

    const {
        favorites,
        modal,
        cancelDelete,
        deleteFavorite,
        handleConfirmDelete,
        redirect,
    } = useFavoriteTemplate();

    return (
        <View >
            <Header text={'Lista de Favoritos'} />
            <ListJobs
                jobs={favorites}
                loading={false}
                newLoading={false}
                text={'No hay favoritos en estos momentos'}
                moreJobs={() => {}}
                redirect={redirect}
                refreshJobs={() => {}}
                deleteFavorite={deleteFavorite}
            />
            <ModalDelete
                visible={modal}
                cancelDelete={cancelDelete}
                handleConfirmDelete={handleConfirmDelete}
            />
        </View>
    )
}
