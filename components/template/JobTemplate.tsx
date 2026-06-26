import React from "react";
import {View} from "react-native";
import {Header, Search} from "@/components/molecules";
import {useJobTemplate} from "@/hooks/template/use-job-template";
import {IconSymbol} from "@/components/atoms";
import {ListJobs} from "@/components/organisms";

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
                moreJobs={moreJobs}
                refreshJobs={refreshJobs}
            />
        </View>
    )
}
