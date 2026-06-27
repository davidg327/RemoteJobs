import { router } from "expo-router";
import {useCallback, useMemo, useRef, useState} from "react";
import {useColorScheme} from "@/hooks/use-color-scheme";
import {useJobStore} from "@/store/job.store";
import {Colors} from "@/constants/theme";
import {IJobs} from "@/interface/jobs";
import {JobTemplateStyles} from "@/styles/job-template.styles";
import BottomSheet from "@gorhom/bottom-sheet";
import {useFocusEffect} from "expo-router";

const LIMIT = 6;

export function useJobTemplate() {

    const colorScheme = useColorScheme();
    const categories = useJobStore((state) => state.categories);
    const jobs = useJobStore((state) => state.jobs);
    const jobCounts = useJobStore((state) => state.jobCounts);
    const newLoading = useJobStore((state) => state.loading);
    const typeJob = useJobStore((state) => state.typeJob);
    const getJob = useJobStore((state) => state.getJob);
    const getJobs = useJobStore((state) => state.getJobs);

    const [limit, setLimit] = useState<number>(LIMIT);
    const [loading, setLoading] = useState<boolean>(false);
    const [search, setSearch] = useState<string>('');
    const [filter, setFilter] = useState<string[]>([]);

    const bottomSheetRef = useRef<BottomSheet | null>(null);

    const refreshJobs = () => {
        if(search !== '' && filter.length === 0) return;
        setLimit(LIMIT);
        getJobs();
    };

    const moreJobs = () => {
        if (limit < jobCounts && search === '' && filter.length === 0) {
            setLoading(true);
            setTimeout(() => {
                setLimit(prev => prev + LIMIT);
                setLoading(false);
            }, 3000);
        }
    };

    const selectFilter = (value: string) => {
        const exitFilter = filter.find(item => item === value);
        if(exitFilter === undefined){
            setFilter([...filter, value]);
        }else {
            setFilter(filter.filter(item => item !== value));
        }
    }

    const selectVariousFilter = (values: string[]) => {
        if (values.length === 0) {
            setFilter([]);
            return;
        }
        setFilter(prev => {
            const onlyJobTypes = prev.filter(item =>
                typeJob.includes(item)
            );
            return [...onlyJobTypes, ...values];
        });
    }

    const redirect = (value: IJobs) => {
        getJob(value);
        router.push("/detailJob");
    };

    const filterJobs = useMemo(() => {
        let result = jobs;

        //Buscar empleo por titulo y nombre de empresa
        if (search.trim()) {
            const text = search.trim().toLowerCase();

            result = result.filter(
                item =>
                    item.title.toLowerCase().includes(text) ||
                    item.companyName.toLowerCase().includes(text)
            );
        }

        //Filtrar por tipo de empleo o categoria
        if (filter.length > 0) {
            result = result.filter(job =>
                filter.includes(job.jobType) ||
                filter.includes(job.category)
            );
        }

        return result;
    }, [jobs, search, filter]);

    const visibleJobs = useMemo(() => {
        return jobs.slice(0, limit);
    }, [jobs, limit]);

    const color = Colors[colorScheme ?? 'light'].text;
    const styles = JobTemplateStyles(colorScheme);

    useFocusEffect(
        useCallback(() => {
            return () => {
                bottomSheetRef.current?.close();
            };
        }, [])
    );

    return {
        bottomSheetRef,
        categories,
        color,
        filter,
        filterJobs,
        loading,
        newLoading,
        search,
        styles,
        typeJob,
        visibleJobs,
        disabledJobsFilter: search === '' && filter.length === 0,
        moreJobs,
        redirect,
        refreshJobs,
        selectFilter,
        selectVariousFilter,
        setSearch,
    };
}
