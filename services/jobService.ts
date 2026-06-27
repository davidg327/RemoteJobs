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

export const apiGetCategories = async () => {
    const response = await axiosInstance.get('remote-jobs/categories');
    const categories  = response.data.jobs.map((item) => (item.name))
    return {
        categories,
    };
};
