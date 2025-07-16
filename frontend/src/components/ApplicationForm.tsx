import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Alert,
  CircularProgress,
} from '@mui/material';
import { ApplicationFormData } from '../types';
import { ApplicationService } from '../services/api';

interface ApplicationFormProps {
  jobId: string;
  onSubmitSuccess: () => void;
}

const ApplicationForm: React.FC<ApplicationFormProps> = ({ jobId, onSubmitSuccess }) => {
  const [formData, setFormData] = useState<ApplicationFormData>({
    name: '',
    email: '',
    resume_link: '',
    cover_letter: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    if (!formData.name.trim()) return 'Name is required';
    if (!formData.email.trim()) return 'Email is required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) return 'Invalid email format';
    if (!formData.resume_link.trim()) return 'Resume link is required';
    if (!formData.cover_letter.trim()) return 'Cover letter is required';
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      await ApplicationService.submitApplication(jobId, formData);
      onSubmitSuccess();
    } catch (err) {
      setError('Failed to submit application. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 3, mt: 3 }}>
      <Typography variant="h6" gutterBottom>
        Submit Your Application
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Box component="form" onSubmit={handleSubmit} noValidate>
        <TextField
          margin="normal"
          required
          fullWidth
          id="name"
          label="Full Name"
          name="name"
          autoComplete="name"
          value={formData.name}
          onChange={handleChange}
          disabled={isSubmitting}
        />

        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          value={formData.email}
          onChange={handleChange}
          disabled={isSubmitting}
        />

        <TextField
          margin="normal"
          required
          fullWidth
          id="resume_link"
          label="Resume Link"
          name="resume_link"
          placeholder="Link to your resume (Google Drive, Dropbox, etc.)"
          value={formData.resume_link}
          onChange={handleChange}
          disabled={isSubmitting}
        />

        <TextField
          margin="normal"
          required
          fullWidth
          id="cover_letter"
          label="Cover Letter"
          name="cover_letter"
          multiline
          rows={4}
          value={formData.cover_letter}
          onChange={handleChange}
          disabled={isSubmitting}
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          disabled={isSubmitting}
        >
          {isSubmitting ? <CircularProgress size={24} /> : 'Submit Application'}
        </Button>
      </Box>
    </Paper>
  );
};

export default ApplicationForm;