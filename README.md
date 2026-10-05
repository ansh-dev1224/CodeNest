# CodeNest

CodeNest is a full-stack developer learning platform for practical, structured online education. It provides authentication, course discovery, enrollment and payments, instructor course management, progress tracking, ratings/reviews, profiles, and account settings.

## Features

- Email OTP-based account verification
- Student and instructor account roles
- Login, logout, password reset, and password change
- Protected frontend routes and JWT-protected API routes
- Course catalog and category pages
- Course creation, editing, publishing, sections, subsections, and video content
- Student enrollment and course progress tracking
- Razorpay course payments and payment verification
- Instructor dashboard and course management
- Ratings and reviews
- Profile and profile-picture updates
- Account settings and account deletion
- Contact form
- Cloudinary media uploads
- Transactional email templates
- Responsive CodeNest UI with mobile navigation
- Vercel SPA routing configuration

## Tech Stack

### Frontend

- React 18
- Create React App / `react-scripts`
- React Router
- Redux Toolkit + React Redux
- Tailwind CSS
- Axios
- React Hook Form
- React Hot Toast
- React Icons
- Swiper
- Chart.js / `react-chartjs-2`
- React Markdown
- React Dropzone
- Video React

### Backend

- Node.js
- Express
- MongoDB + Mongoose
- JWT
- bcrypt
- Nodemailer
- Cloudinary
- Razorpay
- CORS
- express-fileupload

## Project Structure

```text
CodeNest/
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── data/
│   │   ├── hooks/
│   │   ├── pages/
│   │   ├── reducer/
│   │   ├── services/
│   │   ├── slices/
│   │   └── utils/
│   ├── package.json
│   ├── package-lock.json
│   └── vercel.json
└── server/
    ├── config/
    ├── controllers/
    ├── mail/
    ├── middleware/
    ├── models/
    ├── routes/
    ├── utils/
    ├── index.js
    └── package.json
```

## Prerequisites

- Node.js 18+ recommended
- npm
- MongoDB database
- Cloudinary account for media uploads
- Razorpay account if paid courses are enabled
- SMTP/email provider credentials for OTP, reset, and transactional emails

## Installation

Clone the repository and install dependencies separately because CodeNest uses separate frontend and backend packages:

```bash
git clone <repository-url>
cd CodeNest

cd frontend
npm install

cd ../server
npm install
```

Use the package manager represented by the repository lockfiles. The checked-in project uses npm lockfiles.

## Environment Variables

### Frontend: `frontend/.env`

```env
REACT_APP_BASE_URL=https://your-api-domain.example/api/v1
```

`REACT_APP_BASE_URL` is the public API base URL consumed by the React application.

For local development:

```env
REACT_APP_BASE_URL=http://localhost:4000/api/v1
```

### Backend: `server/.env`

```env
PORT=4000
FRONTEND_URL=https://your-frontend-domain.example

MONGODB_URL=mongodb+srv://<username>:<password>@<cluster>/<database>

JWT_SECRET=<long-random-secret>

CLOUD_NAME=<cloudinary-cloud-name>
API_KEY=<cloudinary-api-key>
API_SECRET=<cloudinary-api-secret>
FOLDER_NAME=<cloudinary-folder-name>

RAZORPAY_KEY=<razorpay-key-id>
RAZORPAY_SECRET=<razorpay-key-secret>

MAIL_HOST=<smtp-host>
MAIL_USER=<smtp-username>
MAIL_PASS=<smtp-password>
MAIL_FROM=CodeNest <your-email@example.com>
```

### Variable ownership

| Variable | App | Secret? | Purpose |
|---|---|---:|---|
| `REACT_APP_BASE_URL` | Frontend | No | Backend API base URL |
| `PORT` | Backend | No | HTTP server port |
| `FRONTEND_URL` | Backend | No | Production frontend origin and reset/email links |
| `MONGODB_URL` | Backend | Yes | MongoDB connection |
| `JWT_SECRET` | Backend | Yes | JWT signing/verification |
| `CLOUD_NAME` | Backend | No | Cloudinary account |
| `API_KEY` | Backend | Yes | Cloudinary API key |
| `API_SECRET` | Backend | Yes | Cloudinary API secret |
| `FOLDER_NAME` | Backend | No | Cloudinary upload folder |
| `RAZORPAY_KEY` | Backend | No | Razorpay key ID |
| `RAZORPAY_SECRET` | Backend | Yes | Razorpay signature verification |
| `MAIL_HOST` | Backend | No | SMTP host |
| `MAIL_USER` | Backend | Sensitive | SMTP username / sender address |
| `MAIL_PASS` | Backend | Yes | SMTP password |
| `MAIL_FROM` | Backend | No | Display sender address |

Do not commit `.env` files or real credentials.

## Running Locally

Start the API:

```bash
cd server
npm run dev
```

Start the frontend in a second terminal:

```bash
cd frontend
npm start
```

The default local development endpoints are:

- Frontend: `http://localhost:3000`
- Backend: `http://localhost:4000`
- API root: `http://localhost:4000/api/v1`

The frontend API URL must match `REACT_APP_BASE_URL`.

## Production Build

From `frontend/`:

```bash
npm run build
```

The generated production bundle is placed in `frontend/build/`.

Before deployment, verify that `REACT_APP_BASE_URL` points to the deployed API rather than a local address.

## Deployment

### Frontend on Vercel

Deploy the `frontend` directory as the Vercel project root.

Configure:

```text
Build command: npm run build
Output directory: build
Install command: npm install
```

Set:

```env
REACT_APP_BASE_URL=https://your-api-domain.example/api/v1
```

`frontend/vercel.json` includes an SPA rewrite so client-side React routes can resolve correctly on direct navigation.

### Backend

Deploy the `server` directory to a Node-compatible host that supports a persistent Express process. If the chosen platform supports Node/Express server deployment directly, use:

```bash
npm start
```

Set every backend environment variable listed above.

If the backend is deployed separately from the frontend, set `FRONTEND_URL` to the exact production frontend origin. Multiple allowed frontend origins may be supplied as a comma-separated value.

### MongoDB

Ensure the deployed server can connect to MongoDB and that the database network-access rules allow the deployment environment.

### Cloudinary

Configure Cloudinary credentials before using course thumbnails, profile pictures, or other uploads.

### Razorpay

Configure the Razorpay key and secret before enabling paid-course checkout. Payment verification is performed server-side using the Razorpay signature.

## API Overview

The API is mounted under `/api/v1`.

### Authentication

```text
POST /auth/sendotp
POST /auth/signup
POST /auth/login
POST /auth/changePassword
POST /auth/reset-password-token
POST /auth/reset-password
```

### Profile

```text
GET  /profile/getUserDetails
GET  /profile/getEnrolledCourses
GET  /profile/instructorDashboard
PUT  /profile/updateProfile
PUT  /profile/updateDisplayPicture
DELETE /profile/deleteProfile
```

### Courses

```text
GET    /course/getAllCourses
POST   /course/getCourseDetails
POST   /course/getFullCourseDetails
POST   /course/createCourse
POST   /course/editCourse
GET    /course/getInstructorCourses
DELETE /course/deleteCourse
POST   /course/addSection
POST   /course/updateSection
POST   /course/deleteSection
POST   /course/addSubSection
POST   /course/updateSubSection
POST   /course/deleteSubSection
POST   /course/updateCourseProgress
GET    /course/showAllCategories
POST   /course/createCategory
POST   /course/getCategoryPageDetails
POST   /course/createRating
GET    /course/getReviews
GET    /course/getAverageRating
```

### Payments

```text
POST /payment/capturePayment
POST /payment/verifyPayment
POST /payment/sendPaymentSuccessEmail
```

### Contact

```text
POST /reach/contact
```

Protected endpoints require a valid JWT. The API accepts a bearer token in the `Authorization` header and also supports the existing cookie/body token mechanism.

## Authentication

On login, the API returns a JWT and user information. The frontend persists the token locally for the current application architecture and uses protected React routes for authenticated pages.

The backend verifies the JWT before protected operations and applies Student, Instructor, and Admin role checks where required.

## Database

MongoDB is used through Mongoose. The application contains models for users, profiles, courses, sections, subsections, categories, course progress, ratings/reviews, and OTP/reset-related data.

Create and update operations should be exercised against a non-production database before making a production deployment.

## Troubleshooting

### CORS errors

Make sure the backend `FRONTEND_URL` exactly matches the browser origin, including protocol and port. If multiple origins are required, separate them with commas.

### Environment variables are missing

- Frontend variables must be prefixed with `REACT_APP_`.
- Restart the frontend development server after changing `.env`.
- Never place backend secrets in the frontend `.env`.

### MongoDB connection fails

Check `MONGODB_URL`, credentials, database network access, and the deployment provider's outbound connectivity.

### Vercel build errors

Run:

```bash
cd frontend
npm install
npm run build
```

Check the build log for case-sensitive imports and missing dependencies. Linux/Vercel is case-sensitive even when a Windows development environment is not.

### API requests point to the wrong server

Verify `REACT_APP_BASE_URL` and ensure it ends with `/api/v1`. Do not hardcode a production API URL in source code.

### React routes return 404 on refresh

The frontend includes `vercel.json` with an SPA rewrite. Confirm that the Vercel project root is `frontend/` and that the rewrite file is included in the deployment.

### Uploads fail

Check all Cloudinary variables and confirm the configured upload folder exists or can be created.

### Payments fail

Check both Razorpay variables, browser-side checkout configuration, server-side signature verification, and the network response from the capture/verify endpoints.

## Security Notes

- Never commit `.env` files or API credentials.
- Use a long, random `JWT_SECRET`.
- Restrict MongoDB network access appropriately.
- Configure production CORS to known frontend origins.
- Keep Razorpay and Cloudinary secrets on the server only.
- Do not expose SMTP passwords to the frontend.
- Payment verification must remain server-side.
- Course deletion is authenticated and restricted to the course's instructor.
- Keep dependencies updated and review security advisories before production releases.

## License

This project retains the repository's existing ISC license. See `LICENSE`.
