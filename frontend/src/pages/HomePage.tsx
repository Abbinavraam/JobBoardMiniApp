import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Box,
  CircularProgress,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from '@mui/material';
import JobCard from '../components/JobCard';
import { Job } from '../types';
import { JobService } from '../services/api';

const HomePage: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [jobType, setJobType] = useState<string>('all');

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const fetchedJobs = await JobService.getAllJobs();
      setJobs(fetchedJobs);
      setError(null);
    } catch (err) {
      setError('Failed to fetch jobs. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleJobTypeChange = (event: SelectChangeEvent) => {
    setJobType(event.target.value);
  };

  const filteredJobs = jobType === 'all'
    ? jobs
    : jobs.filter(job => job.type === jobType);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Available Jobs
        </Typography>

        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel id="job-type-filter-label">Job Type</InputLabel>
          <Select
            labelId="job-type-filter-label"
            id="job-type-filter"
            value={jobType}
            label="Job Type"
            onChange={handleJobTypeChange}
          >
            <MenuItem value="all">All Types</MenuItem>
            <MenuItem value="remote">Remote</MenuItem>
            <MenuItem value="full-time">Full Time</MenuItem>
            <MenuItem value="part-time">Part Time</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {filteredJobs.length === 0 ? (
        <Typography variant="h6" color="text.secondary" textAlign="center">
          No jobs found matching your criteria.
        </Typography>
      ) : (
        filteredJobs.map((job) => (
          <JobCard key={job._id} job={job} />
        ))
      )}
    </Container>
  );
};

export default HomePage;