import {useCallback, useEffect} from "react";
import {useColorScheme} from "@/hooks/use-color-scheme";
import {FavoriteStyles} from "@/styles/favorite.styles";
import {StorageAdapter} from "@/storage/storage";
import {FAVORITE_KEY} from "@/util/keys";
import {useFavoriteStore} from "@/store/favorite.store";

export function useFavorite() {

    const colorScheme = useColorScheme();

    const favorites = useFavoriteStore((state) => state.favorites);

    const styles = FavoriteStyles(colorScheme);

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
