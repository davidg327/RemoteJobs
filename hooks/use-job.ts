import {useJobStore} from "@/store/job.store";
import {useCallback, useEffect} from "react";
import {useColorScheme} from "@/hooks/use-color-scheme";

export function useJob() {

    const colorScheme = useColorScheme();

    const getJobs = useJobStore((state) => state.getJobs);
    const loading = useJobStore((state) => state.loading);

    const getAllJobs = useCallback(() => {
        getJobs();
    }, [getJobs]);

    useEffect(() => {
        setTimeout(() => {
            getAllJobs();
        }, 5000);
    }, [getAllJobs]);

    return {
        colorScheme,
        loading,
    };
}
