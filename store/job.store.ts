import {create} from "zustand";
import {apiGetCategories, apiGetJobs} from "@/services/jobService";
import {IJobs} from "@/interface/jobs";

type JobState = {
    loading: boolean;
    jobCounts: number;
    error: string;
    categories: string[];
    typeJob: string[];
    job: IJobs | null;
    jobs: IJobs[];
    getJob: (value: IJobs) => void;
    getJobs: () => Promise<void>;
    getCategories: () => Promise<void>;
    cleanJob: () => void;
};

export const useJobStore = create<JobState>((set) => ({
    loading: true,
    jobCounts: 0,
    error: '',
    job: null,
    jobs: [],
    typeJob: [],
    categories: [],
    getJob: (job: IJobs) => {
        set({
            job: job,
        });
    },
    getJobs: async () => {
        try {
            const jobs = await apiGetJobs();
            const jobTypes = jobs.jobs.map((job) => {
                return job.jobType;
            })
            set({
                jobCounts: jobs.jobCount,
                jobs: jobs.jobs,
                loading: false,
                typeJob: [...new Set(jobTypes)]
            });
        } catch (error){
            set({
                loading: false,
                error: error
            });
        }
    },
    getCategories: async () => {
        const categories = await apiGetCategories();
        set({
            categories: categories.categories
        });
    },
    cleanJob: () => {
        set({
            job: null
        });
    }
}));
