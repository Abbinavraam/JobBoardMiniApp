require('dotenv').config();
const mongoose = require('mongoose');
const Job = require('./models/Job');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/job-board', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const seedJobs = [
  {
    title: 'Senior Full Stack Developer',
    company: 'TechCorp',
    location: 'San Francisco, CA',
    description: 'We are looking for an experienced Full Stack Developer to join our growing team. The ideal candidate will have strong experience with React, Node.js, and cloud technologies.',
    type: 'full-time'
  },
  {
    title: 'UI/UX Designer',
    company: 'DesignHub',
    location: 'Remote',
    description: 'Join our creative team as a UI/UX Designer. You will be responsible for creating beautiful and intuitive user interfaces for our web and mobile applications.',
    type: 'remote'
  },
  {
    title: 'DevOps Engineer',
    company: 'CloudTech Solutions',
    location: 'New York, NY',
    description: 'Looking for a DevOps Engineer to help us build and maintain our cloud infrastructure. Experience with AWS, Docker, and CI/CD pipelines is required.',
    type: 'full-time'
  },
  {
    title: 'Content Writer',
    company: 'Digital Marketing Pro',
    location: 'Chicago, IL',
    description: 'We need a creative Content Writer to join our marketing team. This role involves creating engaging content for our blog, social media, and email campaigns.',
    type: 'part-time'
  }
];

async function seedDatabase() {
  try {
    // Clear existing jobs
    await Job.deleteMany({});
    
    // Insert new jobs
    const jobs = await Job.insertMany(seedJobs);
    console.log('Database seeded successfully with', jobs.length, 'jobs');
    
    mongoose.connection.close();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();