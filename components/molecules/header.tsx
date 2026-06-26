import {StyleSheet, View} from "react-native";
import {ThemedText} from "@/components/atoms";

interface IHeader {
    text: string;
}

export function Header ({text}: IHeader) {
    return (
        <View >
            <ThemedText style={styles.text} type="subtitle">
                {text}
            </ThemedText>
        </View>
    )
}

const styles = StyleSheet.create({
    text: {
        marginBottom: 20,
        marginTop: 20,
        textAlign: 'center',
    }
})
