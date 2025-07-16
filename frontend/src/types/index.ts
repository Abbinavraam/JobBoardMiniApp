export interface Job {
  _id: string;
  title: string;
  company: string;
  location: string;
  description: string;
  type: 'remote' | 'full-time' | 'part-time';
  createdAt: string;
}

export interface JobApplication {
  _id: string;
  job_id: string;
  name: string;
  email: string;
  resume_link: string;
  cover_letter: string;
  submittedAt: string;
}

export interface ApplicationFormData {
  name: string;
  email: string;
  resume_link: string;
  cover_letter: string;
}