const express = require('express');
const router = express.Router();
const Application = require('../models/Application');

// POST /applications - submit a job application
router.post('/', async (req, res) => {
  const application = new Application({
    job_id: req.body.job_id,
    name: req.body.name,
    email: req.body.email,
    resume_link: req.body.resume_link,
    cover_letter: req.body.cover_letter
  });

  try {
    const newApplication = await application.save();
    res.status(201).json(newApplication);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// GET /applications - list all applications (admin route)
router.get('/', async (req, res) => {
  try {
    const applications = await Application.find()
      .populate('job_id')
      .sort({ submittedAt: -1 });
    res.json(applications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;