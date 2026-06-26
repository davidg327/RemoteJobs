import React from "react";
import {Image} from "expo-image";
import {StyleSheet, View} from "react-native";
import {ThemedText} from "@/components/atoms";

interface IEmptyTemplate {
    text: string;
}

export function EmptyTemplate ({text}: IEmptyTemplate) {

    return (
        <View style={styles.container}>
            <Image
                source={require('@/assets/images/nodata.png')}
                style={styles.image}
                contentFit='contain'
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
        height: 220,
        width: 220,
    },
    text: {
        alignSelf: 'center',
        marginTop: 30,
        textAlign: 'center',
        width: '80%',
    },
});

