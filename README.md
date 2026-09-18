# Shivam Electronic World

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
```

---

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
