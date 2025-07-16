import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Chip,
  Button,
  CircularProgress,
  Alert,
  Paper,
  Divider,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Job } from '../types';
import { JobService } from '../services/api';
import ApplicationForm from '../components/ApplicationForm';

const JobDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showApplicationForm, setShowApplicationForm] = useState(false);

  useEffect(() => {
    if (id) {
      fetchJobDetails(id);
    }
  }, [id]);

  const fetchJobDetails = async (jobId: string) => {
    try {
      const jobData = await JobService.getJobById(jobId);
      setJob(jobData);
      setError(null);
    } catch (err) {
      setError('Failed to fetch job details. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleApplicationSuccess = () => {
    setShowApplicationForm(false);
    // Show success message or redirect
    navigate('/', { state: { applicationSubmitted: true } });
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error || !job) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Alert severity="error">{error || 'Job not found'}</Alert>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/')}
          sx={{ mt: 2 }}
        >
          Back to Jobs
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate('/')}
        sx={{ mb: 3 }}
      >
        Back to Jobs
      </Button>

      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          {job.title}
        </Typography>

        <Typography variant="h6" color="text.secondary" gutterBottom>
          {job.company}
        </Typography>

        <Box sx={{ my: 2 }}>
          <Chip
            label={job.type}
            color="primary"
            sx={{ mr: 1, textTransform: 'capitalize' }}
          />
          <Chip label={job.location} />
        </Box>

        <Divider sx={{ my: 3 }} />

        <Typography variant="h6" gutterBottom>
          Job Description
        </Typography>

        <Typography variant="body1" paragraph>
          {job.description}
        </Typography>

        {!showApplicationForm && (
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={() => setShowApplicationForm(true)}
            sx={{ mt: 2 }}
          >
            Apply Now
          </Button>
        )}

        {showApplicationForm && (
          <ApplicationForm
            jobId={job._id}
            onSubmitSuccess={handleApplicationSuccess}
          />
        )}
      </Paper>
    </Container>
  );
};

export default JobDetailPage;