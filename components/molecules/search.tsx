import {StyleSheet, View} from 'react-native';
import {IconSymbol, ThemedInput} from "@/components/atoms";
import React from "react";
import {useColorScheme} from "@/hooks/use-color-scheme";
import {Colors} from "@/constants/theme";

type SearchBarProps = {
    value: string;
    onChangeText: (text: string) => void;
    placeholder?: string;
};

export function Search ({
                              value,
                              onChangeText,
                              placeholder,
                          }: SearchBarProps) {
    const colorScheme = useColorScheme();

    const color = Colors[colorScheme ?? 'light'].text;
    const border = Colors[colorScheme ?? 'light'].text;

    return (
        <View style={{...styles.container, borderColor: border}}>
            <IconSymbol size={28} name="search.fill" color={color} />

            <ThemedInput
                value={value}
                onChangeText={onChangeText}
                placeholder={placeholder}
                style={styles.input}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        alignSelf: 'center',
        borderRadius: 20,
        borderWidth: 1,
        flexDirection: 'row',
        gap: 8,
        height: 48,
        paddingHorizontal: 12,
        width: '80%',
    },
    input: {
        flex: 1,
        height: '100%',
        paddingHorizontal: 0,
    },
});
