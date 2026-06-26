import {useEffect, useState} from "react";
import {useColorScheme} from "@/hooks/use-color-scheme";
import {useJobStore} from "@/store/job.store";
import {Colors} from "@/constants/theme";
import {IJobs} from "@/interface/jobs";
import {JobTemplateStyles} from "@/styles/job-template.styles";

const LIMIT = 6;

export function useJobTemplate() {

    const colorScheme = useColorScheme();
    const jobs = useJobStore((state) => state.jobs);
    const jobCounts = useJobStore((state) => state.jobCounts);
    const newLoading = useJobStore((state) => state.loading);
    const getJobs = useJobStore((state) => state.getJobs);

    const [visibleJobs, setVisibleJobs] = useState<IJobs[] | []>([]);
    const [limit, setLimit] = useState<number>(LIMIT);
    const [loading, setLoading] = useState<boolean>(false);

    const refreshJobs = () => {
        setLimit(LIMIT);
        getJobs();
    };

    const moreJobs = () => {
        if (limit < jobCounts) {
            setLoading(true);
            setTimeout(() => {
                setLimit(prev => prev + LIMIT);
                setLoading(false);
            }, 3000);
        }
    };

    useEffect(() => {
        setVisibleJobs(jobs.slice(0, limit))
    }, [jobs, limit]);

    const color = Colors[colorScheme ?? 'light'].text;
    const styles = JobTemplateStyles(colorScheme);

    return {
        color,
        loading,
        newLoading,
        visibleJobs,
        styles,
        moreJobs,
        refreshJobs,
    };
}
