import {
    StyleSheet,
    TextInput,
    type TextInputProps,
} from 'react-native';

import { useThemeColor } from '@/hooks/use-theme-color';

export type ThemedInputProps = TextInputProps & {
    lightColor?: string;
    darkColor?: string;
};

export function ThemedInput({
                                style,
                                lightColor,
                                darkColor,
                                placeholderTextColor,
                                ...rest
                            }: ThemedInputProps) {
    const color = useThemeColor(
        { light: lightColor, dark: darkColor },
        'text'
    );

    const backgroundColor = useThemeColor({}, 'background');

    return (
        <TextInput
            style={[
                styles.input,
                {
                    color,
                    backgroundColor,
                },
                style,
            ]}
            placeholderTextColor={
                placeholderTextColor ??
                useThemeColor({}, 'icon')
            }
            {...rest}
        />
    );
}

const styles = StyleSheet.create({
    input: {
        height: 48,
        paddingHorizontal: 16,
        borderRadius: 12,
        fontSize: 16,
    },
});
