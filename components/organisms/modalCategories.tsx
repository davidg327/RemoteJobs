import {RefObject, useMemo, useState} from "react";
import {StyleSheet, TouchableOpacity, View} from "react-native";
import BottomSheet, {BottomSheetScrollView} from "@gorhom/bottom-sheet";
import {Modal} from "@/components/molecules";
import {ThemedText} from "@/components/atoms";
import {categoryJobs} from "@/util/numCategoryJob";

interface IModalCategories {
    categories: string[];
    bottomSheetRef: RefObject<BottomSheet | null>;
    filterDefault: string[];
    selectVariousFilter: (values: string[]) => void;
}

const black = '#000000';
const success = '#16A34A';
const white = '#FFFFFF';

export function ModalCategories ({
                                     categories,
                                     filterDefault,
                                     bottomSheetRef,
                                     selectVariousFilter,
                                 }: IModalCategories) {

    const snapPoints = useMemo(() => ["85%"], []);

    const [filters, setFilters] = useState<string[]>(filterDefault);

    const selectFilter = (value: string) => {
        const exitFilter = filters.find(item => item === value);
        if(exitFilter === undefined){
            setFilters([...filters, value]);
        }else {
            setFilters(filters.filter(item => item !== value));
        }
    }

    return (
        <Modal
            bottomSheetRef={bottomSheetRef}
            snapPoints={snapPoints}
            onClose={() => setFilters(filterDefault)}
            onOpen={() =>  setFilters(filterDefault)}
        >
            <BottomSheetScrollView style={styles.container}>
                <ThemedText type='miniBold' darkColor={black} style={styles.textTitle}>
                   Lista de categorías
                </ThemedText>
                <View
                    style={styles.containerCategories}
                >
                    <>
                        {categories.map((category, index) => {
                            const selected = filters.includes(category);

                            return (
                                <TouchableOpacity
                                    key={`${category}-${index}`}
                                    onPress={() => selectFilter(category)}
                                    style={[
                                        styles.category,
                                        {
                                            backgroundColor: selected
                                                ? success
                                                : "transparent",
                                        },
                                    ]}
                                >
                                    <ThemedText
                                        type="simpleText"
                                        darkColor={selected ? white : black}
                                    >
                                        {categoryJobs[category] ?? category}
                                    </ThemedText>
                                </TouchableOpacity>
                            );
                        })}
                    </>
                </View>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                        selectVariousFilter(filters);
                        bottomSheetRef?.current?.close();
                    }}
                >
                    <ThemedText type='subtitle' darkColor={black} style={styles.textButton}>
                        Filtrar
                    </ThemedText>
                </TouchableOpacity>
            </BottomSheetScrollView>
        </Modal>
    )
}

const styles = StyleSheet.create({
    button: {
        alignSelf: 'center',
        backgroundColor: success,
        borderRadius: 12,
        marginBottom: 20,
        marginTop: 40,
        paddingVertical: 10,
        width: '90%'
    },
    category: {
        borderRadius: 12,
        borderWidth: 1,
        borderColor: black,
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    container: {
        flex: 1,
    },
    containerCategories: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 10,
        paddingHorizontal: 20,
    },
    textButton: {
        color: white,
        textAlign: 'center',
    },
    textTitle: {
        marginBottom: 20,
        marginTop: 20,
        textAlign: 'center',
    },
});
