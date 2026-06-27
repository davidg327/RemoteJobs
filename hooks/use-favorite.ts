import {useJobStore} from "@/store/job.store";
import {useCallback, useEffect} from "react";
import {useColorScheme} from "@/hooks/use-color-scheme";
import {JobStyles} from "@/styles/job.styles";
import {FavoriteStyles} from "@/styles/favorite.styles";

export function useFavorite() {

    const colorScheme = useColorScheme();

    const styles = FavoriteStyles(colorScheme);

    return {
        styles,
    };
}
