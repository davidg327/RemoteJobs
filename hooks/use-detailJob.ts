import {useColorScheme} from "@/hooks/use-color-scheme";
import {DetailJobStyles} from "@/styles/detailJob.styles";

export function useDetailJob() {

    const colorScheme = useColorScheme();


    const styles = DetailJobStyles(colorScheme);

    return {
        styles,
    };
}
