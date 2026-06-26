import {create} from "zustand";
import {apiGetJobs} from "@/services/jobService";
import {IJobs} from "@/interface/jobs";

type JobState = {
    loading: boolean;
    jobCounts: number;
    error: string;
    getJobs: () => Promise<void>;
    jobs: IJobs[];
    typeJob: string[];
};

export const useJobStore = create<JobState>((set) => ({
    loading: true,
    jobCounts: 0,
    error: '',
    jobs: [],
    typeJob: [],
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
}));
