import {useJobStore} from "@/store/job.store";
import {useCallback, useEffect} from "react";
import {useColorScheme} from "@/hooks/use-color-scheme";
import {JobStyles} from "@/styles/job.styles";
import {StorageAdapter} from "@/storage/storage";
import {FAVORITE_KEY} from "@/util/keys";
import {useFavoriteStore} from "@/store/favorite.store";

export function useJob() {

    const colorScheme = useColorScheme();

    const getJobs = useJobStore((state) => state.getJobs);
    const getCategories = useJobStore((state) => state.getCategories);
    const getFavorites = useFavoriteStore((state) => state.getFavorites);
    const error = useJobStore((state) => state.error);
    const jobs = useJobStore((state) => state.jobs);
    const jobCounts = useJobStore((state) => state.jobCounts);
    const loading = useJobStore((state) => state.loading);

    const styles = JobStyles(colorScheme);

    const getStorageFavorites = useCallback(async () => {
        const favorites = await StorageAdapter.getItem(FAVORITE_KEY);
        if(favorites !== null){
            getFavorites(favorites);
        }
    }, []);

    const getAllJobs = useCallback(() => {
        getJobs();
    }, [getJobs]);

    const getAllCategories = useCallback(() => {
        getCategories();
    }, [getCategories]);

    useEffect(() => {
        setTimeout(() => {
            getAllJobs();
        }, 5000);
    }, [getAllJobs]);

    useEffect(() => {
        getAllCategories();
    }, [getAllCategories]);

    useEffect(() => {
        getStorageFavorites();
    }, [getStorageFavorites]);

    return {
        error,
        jobs,
        jobCounts,
        loading,
        styles,
    };
}
