import {router} from "expo-router";
import {Linking, Share} from "react-native";
import Toast from "react-native-toast-message";
import {useColorScheme} from "@/hooks/use-color-scheme";
import {useJobStore} from "@/store/job.store";
import {useFavoriteStore} from "@/store/favorite.store";
import {Colors} from "@/constants/theme";
import {IJobs} from "@/interface/jobs";
import {DetailJobTemplateStyles} from "@/styles/detailJob-template.styles";

export function useDetailJobTemplate() {

    const colorScheme = useColorScheme();

    const job = useJobStore((state) => state.job);
    const favorites = useFavoriteStore((state) => state.favorites);
    const cleanJob = useJobStore((state) => state.cleanJob);
    const getFavorites = useFavoriteStore((state) => state.getFavorite);
    const removeFavorite = useFavoriteStore((state) => state.removeFavorite);

    const existFavorite = favorites.find((item) => item.id === job?.id);

    const color = Colors[colorScheme ?? 'light'].text;
    const success = Colors[colorScheme ?? 'light'].success;
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

    const favoriteJob = async (job: IJobs) => {
        const favoriteExist = favorites.find((item) => item.id === job.id);
        if(favoriteExist === undefined){
            getFavorites(job);
            Toast.show({
                type: "success",
                text1: "¡En horabuena!",
                text2: "Se agregó a favoritos",
            });
        }else {
            removeFavorite(job.id);
            Toast.show({
                type: "success",
                text1: "¡Lo sentimos!",
                text2: "Se ha quitado de favoritos",
            });
        }
    };

    return {
        color,
        existFavorite: existFavorite !== undefined,
        job,
        styles,
        success,
        favoriteJob,
        goBack,
        openJob,
        shareJob
    };
}
