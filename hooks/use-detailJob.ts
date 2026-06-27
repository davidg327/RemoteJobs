import {useColorScheme} from "@/hooks/use-color-scheme";
import {DetailJobStyles} from "@/styles/detailJob.styles";
import {useCallback, useEffect} from "react";
import {useFavoriteStore} from "@/store/favorite.store";
import {StorageAdapter} from "@/storage/storage";
import {FAVORITE_KEY} from "@/util/keys";

export function useDetailJob() {

    const colorScheme = useColorScheme();

    const favorites = useFavoriteStore((state) => state.favorites);

    const styles = DetailJobStyles(colorScheme);

    const saveInfoStorage = useCallback(() => {
        StorageAdapter.setItem(FAVORITE_KEY, favorites);
    }, [favorites]);

    useEffect(() => {
        saveInfoStorage();
    }, [saveInfoStorage])

    return {
        styles,
    };
}
