import {useFavoriteStore} from "@/store/favorite.store";
import {IJobs} from "@/interface/jobs";
import {router} from "expo-router";
import {useJobStore} from "@/store/job.store";

export function useFavoriteTemplate() {

    const favorites = useFavoriteStore((state) => state.favorites);
    const getJob = useJobStore((state)  => state.getJob);

    const redirect = (value: IJobs) => {
        getJob(value);
        router.push("/detailJob");
    };

    return {
        favorites,
        redirect,
    };
}
