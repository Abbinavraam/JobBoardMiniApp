const express = require('express');
const router = express.Router();
const Job = require('../models/Job');

// GET /jobs - list all jobs
router.get('/', async (req, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 });
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /jobs/:id - get job details
router.get('/:id', async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    res.json(job);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST /jobs - create a new job (for seeding/admin purposes)
router.post('/', async (req, res) => {
  const job = new Job({
    title: req.body.title,
    company: req.body.company,
    location: req.body.location,
    description: req.body.description,
    type: req.body.type
  });

  try {
    const newJob = await job.save();
    res.status(201).json(newJob);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;