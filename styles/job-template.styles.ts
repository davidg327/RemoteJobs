import {StyleSheet} from "react-native";
import {Colors} from "@/constants/theme";

export const JobTemplateStyles = (colorScheme: 'light' | 'dark' | null | undefined) =>
    StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: Colors[colorScheme ?? 'light'].background,
        },
        containerFilter: {
            borderColor: Colors[colorScheme ?? 'light'].text,
            borderRadius: 10,
            borderWidth: 1,
            padding: 10,
        },
        containerSearch: {
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingVertical: 10,
            paddingHorizontal: 20,
        },
        containerTypes: {
            paddingBottom: 10,
            paddingLeft: 20,
            paddingRight: 20,
        },
    });
