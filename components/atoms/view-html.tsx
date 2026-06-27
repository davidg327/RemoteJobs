import RenderHtml from "react-native-render-html";
import {useWindowDimensions} from "react-native";

interface IModal {
    source: string;
}

export function ViewHtml({source}: IModal) {
    const { width } = useWindowDimensions();
    return (
        <RenderHtml
            contentWidth={width}
            source={{ html: source }}
        />
    )
}
