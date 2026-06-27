import {StyleSheet} from "react-native";
import {Colors} from "@/constants/theme";

export const DetailJobStyles = (colorScheme: 'light' | 'dark' | null | undefined) =>
    StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: Colors[colorScheme ?? 'light'].background,
        },
    });
