import {StyleSheet, TouchableOpacity, View} from "react-native";
import {IconSymbol, ThemedText} from "@/components/atoms";
import {Colors} from "@/constants/theme";
import {useColorScheme} from "@/hooks/use-color-scheme";

interface IHeaderBack {
    text: string;
    action: () => void;
}

export function HeaderBack ({text, action}: IHeaderBack) {
    const colorScheme = useColorScheme();
    const color = Colors[colorScheme ?? 'light'].text;
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.containerIcon} onPress={action}>
                <IconSymbol name='chevron.left' color={color} size={45} />
            </TouchableOpacity>
            <ThemedText style={styles.text} type="subtitle">
                {text}
            </ThemedText>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        marginBottom: 20,
        minHeight: 50,
    },
    containerIcon: {
        position: 'absolute',
        left: 5,
        top: '5%',
        zIndex: 1,
    },
    text: {
        alignSelf: 'center',
        textAlign: 'center',
        width: '60%'
    }
})
