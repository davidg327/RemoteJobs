import React from "react";
import {View} from "react-native";
import {IconSymbol} from "@/components/atoms";
import {Header, Search} from "@/components/molecules";
import {ListJobs} from "@/components/organisms";
import {useJobTemplate} from "@/hooks/template/use-job-template";

export function JobTemplate () {

    const {
        color,
        loading,
        newLoading,
        styles,
        visibleJobs,
        moreJobs,
        refreshJobs,
    } = useJobTemplate();

    return (
        <View >
            <Header text={'Lista de Empleos'} />
            <View style={styles.containerSearch}>
                <Search
                    value={''}
                    onChangeText={() => {}}
                    placeholder="Buscar empleo"
                />
                <View style={styles.containerFilter}>
                    <IconSymbol size={28} name="filter.fill" color={color} />
                </View>
            </View>
            <ListJobs
                jobs={visibleJobs}
                loading={loading}
                newLoading={newLoading}
                text={'No hay ofertas en estos momentos'}
                moreJobs={moreJobs}
                refreshJobs={refreshJobs}
            />
        </View>
    )
}
