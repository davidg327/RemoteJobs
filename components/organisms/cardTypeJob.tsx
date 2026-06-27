import {StyleSheet, TouchableOpacity} from "react-native";
import {ThemedText} from "@/components/atoms";
import {useColorScheme} from "@/hooks/use-color-scheme";
import {typeJobs} from "@/util/numTypeJob";
import {Colors} from "@/constants/theme";

interface IType {
    filter: string[];
    typeJob: string;
    selectFilter: () => void;
}
export function CardTypeJob({filter, typeJob, selectFilter}: IType) {
    const colorScheme = useColorScheme();
    const styles =  stylesCard(colorScheme);
    const background = filter.includes(typeJob);
    return (
        <TouchableOpacity
            onPress={selectFilter}
            style={{...styles.container,
                backgroundColor: background ? Colors[colorScheme ?? 'light'].success : Colors[colorScheme ?? 'light'].background}}>
            <ThemedText type='simpleText'>
                {typeJobs[typeJob] ?? typeJob}
            </ThemedText>
        </TouchableOpacity>
    )
}

const stylesCard = (colorScheme: 'light' | 'dark' | null | undefined) =>
    StyleSheet.create({
        container: {
            borderColor: Colors[colorScheme ?? 'light'].text,
            borderRadius: 12,
            borderWidth: 1,
            marginRight: 5,
            paddingVertical: 10,
            paddingHorizontal: 20,
        },
    });
