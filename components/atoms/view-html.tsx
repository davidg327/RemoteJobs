import RenderHtml from "react-native-render-html";
import {useWindowDimensions} from "react-native";
import {useColorScheme} from "@/hooks/use-color-scheme";
import {Colors} from "@/constants/theme";

interface IModal {
    source: string;
}

export function ViewHtml({source}: IModal) {
    const { width } = useWindowDimensions();
    const colorScheme = useColorScheme();
    return (
        <RenderHtml
            contentWidth={width}
            source={{ html: source }}
            baseStyle={{
                color: Colors[colorScheme ?? "light"].text,
            }}
        />
    )
}
