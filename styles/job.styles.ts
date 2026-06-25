import {StyleSheet} from "react-native";
import {Colors} from "@/constants/theme";

export const JobStyles = (colorScheme: 'light' | 'dark' | null | undefined) =>
    StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: Colors[colorScheme ?? 'light'].background,
        },
        containerLoad: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
        },
    });
