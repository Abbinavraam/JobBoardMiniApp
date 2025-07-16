import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, Typography, Chip, Box } from '@mui/material';
import { Job } from '../types';

interface JobCardProps {
  job: Job;
}

const JobCard: React.FC<JobCardProps> = ({ job }) => {
  const navigate = useNavigate();

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'remote':
        return 'primary';
      case 'full-time':
        return 'success';
      case 'part-time':
        return 'warning';
      default:
        return 'default';
    }
  };

  return (
    <Card
      sx={{
        cursor: 'pointer',
        '&:hover': {
          boxShadow: 6,
          transform: 'translateY(-2px)',
          transition: 'all 0.2s ease-in-out',
        },
        mb: 2,
      }}
      onClick={() => navigate(`/jobs/${job._id}`)}
    >
      <CardContent>
        <Typography variant="h6" component="div" gutterBottom>
          {job.title}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" gutterBottom>
          {job.company}
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          {job.location}
        </Typography>
        <Box sx={{ mt: 2 }}>
          <Chip
            label={job.type}
            color={getTypeColor(job.type)}
            size="small"
            sx={{ textTransform: 'capitalize' }}
          />
        </Box>
      </CardContent>
    </Card>
  );
};

export default JobCard;