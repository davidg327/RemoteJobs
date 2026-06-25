import axiosInstance from '../api/axiosInstance';
import {mapJob} from "@/convert/job";

export const apiGetJobs= async () => {
    const response = await axiosInstance.get('remote-jobs');
    const {
        ['job-count']: jobCount,
        jobs,
    } = response.data;

    return {
        jobCount,
        jobs: jobs.map(mapJob),
    };
};
