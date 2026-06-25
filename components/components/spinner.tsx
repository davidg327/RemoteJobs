import {View, StyleSheet} from "react-native";
import {LoadingComponent, ThemedText} from "@/components/atoms";
import {useColorScheme} from "@/hooks/use-color-scheme";
import {Colors} from "@/constants/theme";

interface ISpinner {
    text: string;
}
export const Spinner = ({text}: ISpinner) => {
    const colorScheme = useColorScheme();

    const color = Colors[colorScheme ?? 'light'].success;
    return (
        <View>
            <LoadingComponent size={'large'} color={color} />
            <ThemedText style={styles.text} type="subtitle" >
                {text}
            </ThemedText>
        </View>
    )
};

const styles = StyleSheet.create({
   text: {
       marginTop: 20,
   }
});
