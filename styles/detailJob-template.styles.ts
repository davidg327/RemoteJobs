import {StyleSheet} from "react-native";
import {Colors} from "@/constants/theme";

export const DetailJobTemplateStyles = (colorScheme: 'light' | 'dark' | null | undefined) =>
    StyleSheet.create({
        buttonApply: {
            alignSelf: 'center',
            backgroundColor:  Colors[colorScheme ?? 'light'].success,
            borderRadius: 12,
            marginTop: 20,
            paddingVertical: 10,
            width: '100%'
        },
        container: {
            flex: 1,
        },
        containerCard: {
            borderColor: Colors[colorScheme ?? 'light'].text,
            borderRadius: 12,
            borderWidth: 1,
            gap: 2,
            paddingVertical: 5,
            width: '45%',
        },
        containerCategories: {
            alignSelf: 'center',
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 20,
            width: '100%'
        },
        containerIcons: {
            justifyContent: 'space-between',
            height: 100,
        },
        containerInfo: {
            paddingHorizontal: 20,
            marginBottom: 30,
        },
        containerInfoCompany: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 10,
            minHeight: 100,
        },
        image: {
            alignSelf: 'center',
            borderRadius: 60,
            height: 120,
            marginTop: 20,
            width: 120,
        },
        textButton: {
            textAlign: 'center',
            color: 'white',
        },
        textCompanyName: {
            marginTop: 10,
        },
        textThin: {
            textAlign: 'center',
        },
    });
