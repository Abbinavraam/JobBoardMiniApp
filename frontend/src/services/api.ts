import axios from 'axios';
import { Job, ApplicationFormData, JobApplication } from '../types';

const API_BASE_URL = 'http://localhost:5000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const JobService = {
  getAllJobs: async (): Promise<Job[]> => {
    const response = await api.get('/jobs');
    return response.data;
  },

  getJobById: async (id: string): Promise<Job> => {
    const response = await api.get(`/jobs/${id}`);
    return response.data;
  },
};

export const ApplicationService = {
  submitApplication: async (jobId: string, applicationData: ApplicationFormData): Promise<JobApplication> => {
    const response = await api.post('/applications', {
      job_id: jobId,
      ...applicationData,
    });
    return response.data;
  },

  getAllApplications: async (): Promise<JobApplication[]> => {
    const response = await api.get('/applications');
    return response.data;
  },
};