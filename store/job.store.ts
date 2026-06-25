import {create} from "zustand";
import {apiGetJobs} from "@/services/jobService";
import {IJobs} from "@/interface/jobs";

type JobState = {
    loading: boolean;
    jobCounts: number;
    error: string;
    getJobs: () => Promise<void>;
    jobs: IJobs[];
};

export const useJobStore = create<JobState>((set) => ({
    loading: true,
    jobCounts: 0,
    error: '',
    jobs: [],
    getJobs: async () => {
        try {
            const jobs = await apiGetJobs();
            set({
                jobCounts: jobs.jobCount,
                jobs: jobs.jobs,
                loading: false,
            });
        } catch (error){
            set({
                loading: false,
                error: error
            });
        }
    },
}));
