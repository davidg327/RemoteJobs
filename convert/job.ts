interface IMapJob {
    id: number;
    url: string;
    title: string;
    company_name: string;
    company_logo: string;
    category: string;
    tags: string[];
    job_type: string;
    publication_date: string;
    candidate_required_location: string;
    salary: string;
    description: string;
}

export const mapJob = (job: IMapJob) => ({
    id: job.id,
    url: job.url,
    title: job.title,
    companyName: job.company_name,
    companyLogo: job.company_logo,
    category: job.category,
    tags: job.tags,
    jobType: job.job_type,
    publicationDate: job.publication_date,
    candidateLocation: job.candidate_required_location,
    salary: job.salary,
    description: job.description,
});
