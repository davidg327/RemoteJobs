import React from "react";
import {Image} from "expo-image";
import {StyleSheet, View} from "react-native";
import {ThemedText} from "@/components/atoms";

interface IErrorTemplate {
    text: string;
}
export function ErrorTemplate ({text}: IErrorTemplate) {

    return (
        <View style={styles.container}>
            <Image
                source={require('@/assets/images/error.jpg')}
                style={styles.image}
            />
            <ThemedText
                type='title'
                style={styles.text}
            >
                {text}
            </ThemedText>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
    },
    image: {
        alignSelf: 'center',
        height: '50%',
        width: '70%',
    },
    text: {
        alignSelf: 'center',
        marginTop: 30,
        width: '80%',
    },
});

