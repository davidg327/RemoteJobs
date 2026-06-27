import {router} from "expo-router";
import {Linking, Share} from "react-native";
import {useColorScheme} from "@/hooks/use-color-scheme";
import {useJobStore} from "@/store/job.store";
import {Colors} from "@/constants/theme";
import {DetailJobTemplateStyles} from "@/styles/detailJob-template.styles";

export function useDetailJobTemplate() {

    const colorScheme = useColorScheme();

    const job = useJobStore((state) => state.job);
    const cleanJob = useJobStore((state) => state.cleanJob);

    const color = Colors[colorScheme ?? 'light'].text;
    const styles = DetailJobTemplateStyles(colorScheme);

    const goBack = () => {
        router.back();
        cleanJob();
    };

    const openJob = async (url: string) => {
        await Linking.openURL(url);
    };

    const shareJob = async  (url: string) => {
        await Share.share({
            message: `Mira esta oferta de empleo: ${url}`,
        });
    }

    return {
        color,
        job,
        styles,
        goBack,
        openJob,
        shareJob
    };
}
