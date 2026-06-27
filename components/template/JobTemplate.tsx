import React from "react";
import {ScrollView, TouchableOpacity, View} from "react-native";
import {IconSymbol} from "@/components/atoms";
import {Header, Search} from "@/components/molecules";
import {CardTypeJob, ListJobs, ModalCategories} from "@/components/organisms";
import {useJobTemplate} from "@/hooks/template/use-job-template";

export function JobTemplate () {

    const {
        bottomSheetRef,
        categories,
        color,
        filter,
        filterJobs,
        loading,
        newLoading,
        search,
        styles,
        typeJob,
        visibleJobs,
        disabledJobsFilter,
        moreJobs,
        redirect,
        refreshJobs,
        selectFilter,
        selectVariousFilter,
        setSearch,
    } = useJobTemplate();

    return (
        <>
            <View >
                <Header text={'Lista de Empleos'} />
                <View style={styles.containerSearch}>
                    <Search
                        value={search}
                        onChangeText={setSearch}
                        placeholder="Buscar empleo"
                    />
                    <TouchableOpacity
                        onPress={() => bottomSheetRef.current?.expand()}
                        style={styles.containerFilter}>
                        <IconSymbol size={28} name="filter.fill" color={color} />
                    </TouchableOpacity>
                </View>
                <View >
                    <ScrollView
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.containerTypes}>
                        {typeJob.length > 0 && typeJob.map((type, index) => (
                            <CardTypeJob
                                filter={filter}
                                key={`${type}-${index}`}
                                typeJob={type}
                                selectFilter={() => selectFilter(type)}
                            />
                        ))}
                    </ScrollView>
                </View>
                <ListJobs
                    jobs={disabledJobsFilter ? visibleJobs : filterJobs}
                    loading={loading}
                    newLoading={newLoading}
                    text={disabledJobsFilter ? 'No hay ofertas en estos momentos' : 'No hay coincidencias'}
                    moreJobs={moreJobs}
                    redirect={redirect}
                    refreshJobs={refreshJobs}
                />
            </View>
            <ModalCategories
                categories={categories}
                bottomSheetRef={bottomSheetRef}
                filterDefault={filter}
                selectVariousFilter={selectVariousFilter}
            />
        </>
    )
}
