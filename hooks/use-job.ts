import {useJobStore} from "@/store/job.store";
import {useCallback, useEffect} from "react";
import {useColorScheme} from "@/hooks/use-color-scheme";
import {JobStyles} from "@/styles/job.styles";

export function useJob() {

    const colorScheme = useColorScheme();

    const getJobs = useJobStore((state) => state.getJobs);
    const error = useJobStore((state) => state.error);
    const jobs = useJobStore((state) => state.jobs);
    const jobCounts = useJobStore((state) => state.jobCounts);
    const loading = useJobStore((state) => state.loading);

    const styles = JobStyles(colorScheme);


    const getAllJobs = useCallback(() => {
        getJobs();
    }, [getJobs]);

    useEffect(() => {
        setTimeout(() => {
            getAllJobs();
        }, 5000);
    }, [getAllJobs]);

    return {
        error,
        jobs,
        jobCounts,
        loading,
        styles,
    };
}
