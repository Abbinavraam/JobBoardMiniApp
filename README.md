# CareerBoost Job Board

A full-stack job board application built with React, TypeScript, Node.js, Express, and MongoDB.

## Features

- Browse job listings
- Filter jobs by type (remote/full-time/part-time)
- View detailed job information
- Submit job applications
- Admin view for applications
- Responsive design
- Form validation

## Tech Stack

### Frontend
- React with TypeScript
- Material-UI for styling
- React Router for navigation
- Axios for API calls

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- CORS for cross-origin requests

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas account)
- npm or yarn package manager

## Setup Instructions

1. Clone the repository:
```bash
git clone https://github.com/Abbinavraam/JobBoardMiniApp.git
cd JobBoardMini-App
```

2. Install backend dependencies:
```bash
cd backend
npm install
```

3. Set up environment variables:
Create a `.env` file in the backend directory with the following content:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017
NODE_ENV=development
```

4. Seed the database with initial job data:
```bash
npm run seed
```

5. Start the backend server:
```bash
npm run dev
```

6. Install frontend dependencies:
```bash
cd ../frontend
npm install
```

7. Start the frontend development server:
```bash
npm start
```

## Usage

1. Access the application:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

2. Available routes:
- Home page: `/`
- Job details: `/jobs/:id`
- Admin dashboard: `/admin`

3. API endpoints:
- GET `/jobs` - List all jobs
- GET `/jobs/:id` - Get job details
- POST `/applications` - Submit job application
- GET `/applications` - List all applications (admin)

## Project Structure

```
├── backend/
│   ├── src/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── server.js
│   │   └── seed.js
│   ├── package.json
│   └── .env
│
└── frontend/
    ├── src/
    │   ├── components/
    │   ├── pages/
    │   ├── services/
    │   ├── types/
    │   └── App.tsx
    └── package.json
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License.
