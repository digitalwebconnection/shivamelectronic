# Shivam Electronic World

<<<<<<< HEAD
Welcome to the **Shivam Electronic World** project! This is a comprehensive full-stack e-commerce application designed to provide a seamless shopping experience for electronics alongside a powerful management system for administrators.

## 🚀 Key Features

### 🛒 User Features
- **Modern User Interface**: Responsive and beautiful UI built with React and Tailwind CSS v4.
- **Smooth Navigation**: Enhanced scrolling experience using Lenis and dynamic routing via React Router.
- **Product Catalog**: Browse a wide range of electronic products with high-quality images.
- **Secure Authentication**: Secure login and registration.
- **OTP Password Reset**: Forgot password flow using email OTP (NodeMailer).

### 🛠️ Admin Panel Features
- **Dashboard**: A centralized hub to oversee store activities.
- **Product Management**: Add, update, or remove products easily.
- **Image Uploads**: Integrated with Cloudinary for seamless and optimized product image hosting.
- **Order Management**: Track and manage customer orders efficiently.
- **Secure Access**: Protected routes and secure JWT-based authentication for admin personnel.

## 💻 Tech Stack

### Frontend
- **Framework**: React 19 with Vite & TypeScript
- **Styling**: Tailwind CSS v4
- **Icons**: Lucide React
- **Animations/UX**: Lenis (Smooth Scrolling)
- **Monitoring**: Sentry

### Backend
- **Framework**: Node.js & Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JSON Web Tokens (JWT) & bcrypt/bcryptjs
- **File Uploads**: Multer & Cloudinary
- **Emails**: NodeMailer (for OTP and notifications)
- **Security**: Helmet, CORS

---

## ⚙️ Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/en/) (v18 or higher recommended)
- [MongoDB](https://www.mongodb.com/) (Local instance or MongoDB Atlas URI)
- A [Cloudinary](https://cloudinary.com/) account for image storage
- A Gmail account with an App Password (for NodeMailer)

---

## 🔧 Environment Variables

### Backend (`backend/.env`)
Create a `.env` file in the `backend` directory based on the provided `.env.example`:

```env
MONGODB_URI=your_mongodb_connection_string
PORT=5000
FRONTEND_URL=http://localhost:5173,https://shivamelectronic.vercel.app

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

ADMIN_EMAIL=your_admin_email
ADMIN_PASSWORD=your_admin_password
JWT_SECRET=your_jwt_secret

EMAIL_USER=your_gmail_address
EMAIL_PASS=your_gmail_app_password

SENTRY_DSN=your_sentry_dsn
```

### Frontend (`frontend/.env`)
Create a `.env` file in the `frontend` directory based on the provided `.env.example`:

```env
VITE_API_URL=http://localhost:5000
VITE_SENTRY_DSN=your_sentry_dsn
=======
> Premium e-commerce platform for electronic components & accessories, built with **React + Vite** (frontend) and **Express + MongoDB** (backend).

[![CI](https://github.com/your-org/shivamelectronicworld/actions/workflows/ci.yml/badge.svg)](https://github.com/your-org/shivamelectronicworld/actions/workflows/ci.yml)

---

## Tech Stack

| Layer     | Technology                              |
| --------- | --------------------------------------- |
| Frontend  | React 19, TypeScript, Vite, Tailwind v4 |
| Backend   | Express.js, MongoDB, Mongoose           |
| Auth      | JWT, bcryptjs                           |
| Storage   | Cloudinary (product images)             |
| Payments  | WhatsApp Quote (planned: Razorpay)      |
| Hosting   | Vercel (frontend), Render (backend)     |
| Monitoring| Sentry                                  |

---

## Folder Structure

```
shivamelectronicworld/
├── .github/workflows/    # CI/CD pipelines
├── docker/               # Docker & Compose configs
├── docs/                 # Architecture, API reference, deployment guide
├── backend/              # Express REST API
│   └── src/
│       ├── config/       # DB, Cloudinary, CORS, Sentry
│       ├── controllers/  # Request handlers
│       ├── services/     # Business logic
│       ├── models/       # Mongoose schemas
│       ├── routes/       # Express routers
│       ├── middleware/    # Auth, error handler, rate limiter
│       ├── validators/   # Input validation
│       ├── errors/       # Custom error classes
│       └── utils/        # Logger, email
└── frontend/             # React SPA
    └── src/
        ├── api/          # API client & service modules
        ├── context/      # React Context providers
        ├── hooks/        # Custom hooks
        ├── components/   # Reusable UI components
        ├── pages/        # Page-level components
        └── routes/       # Centralized routing
>>>>>>> 46a708687d2af5b566c0c4ec62450f24e577fb66
```

---

<<<<<<< HEAD
## 🚀 Local Setup and Installation

Follow these steps to get the project running locally:

### 1. Clone the repository
```bash
git clone <repository-url>
cd shivam
```

### 2. Backend Setup
```bash
cd backend
npm install
# Ensure your .env file is created and populated
npm run dev
```
The backend server will start on `http://localhost:5000`.

### 3. Frontend Setup
Open a new terminal window/tab:
```bash
cd frontend
npm install
# Ensure your .env file is created and populated
npm run dev
```
The frontend application will start on `http://localhost:5173`.

---

## 📜 Available Scripts

### Frontend
- `npm run dev`: Starts the Vite development server.
- `npm run build`: Compiles TypeScript and builds the app for production.
- `npm run lint`: Runs Oxlint to check for code issues.
- `npm run preview`: Locally previews the production build.

### Backend
- `npm run dev`: Starts the server with Nodemon for hot-reloading during development.
- `npm start`: Starts the server using Node.

---

**Happy Coding!** 🎉
=======
## Quick Start

### Prerequisites
- Node.js ≥ 18
- MongoDB (local or Atlas)
- Cloudinary account (for image uploads)

### 1. Clone & Install

```bash
git clone https://github.com/your-org/shivamelectronicworld.git
cd shivamelectronicworld
npm install        # installs root + all workspaces
```

### 2. Configure Environment

```bash
cp .env.example backend/.env
cp .env.example frontend/.env
# Edit both .env files with your credentials
```

### 3. Run Development Servers

```bash
npm run dev        # starts both backend (port 5000) & frontend (port 5173)
```

Or run individually:
```bash
npm run dev:backend
npm run dev:frontend
```

### 4. Build for Production

```bash
npm run build      # builds frontend
```

---

## API Overview

| Method | Endpoint              | Description               |
| ------ | --------------------- | ------------------------- |
| POST   | `/api/auth/register`  | Register a new user       |
| POST   | `/api/auth/login`     | Login and receive JWT     |
| GET    | `/api/products`       | List all products         |
| POST   | `/api/products`       | Create product (admin)    |
| GET    | `/api/categories`     | List all categories       |
| POST   | `/api/orders`         | Place an order            |
| GET    | `/api/orders/:userId` | Get user's order history  |

See [docs/api-reference.md](docs/api-reference.md) for complete documentation.

---

## License

MIT © Shivam Electronic World
>>>>>>> 46a708687d2af5b566c0c4ec62450f24e577fb66
