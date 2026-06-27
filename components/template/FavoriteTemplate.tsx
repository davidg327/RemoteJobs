import React from "react";
import {ScrollView, TouchableOpacity, View} from "react-native";
import {IconSymbol} from "@/components/atoms";
import {Header, Search} from "@/components/molecules";
import {CardTypeJob, ListJobs, ModalCategories} from "@/components/organisms";
import {useJobTemplate} from "@/hooks/template/use-job-template";
import {useFavoriteTemplate} from "@/hooks/template/use-favorite-template";

export function FavoriteTemplate () {

    const {
        favorites,
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
            />
        </View>
    )
}
