# Shivam Electronic World

> Premium e-commerce platform for electronic components

Shivam Electronic World is a full-stack, modern e-commerce application designed to provide a premium shopping experience for electronic components. Built with a robust technology stack, it features seamless animations, a comprehensive admin panel, and secure user authentication.

## 🚀 Tech Stack

### Frontend
- **Framework:** React 19 + TypeScript + Vite
- **Styling:** Tailwind CSS v4
- **Routing:** React Router v7
- **Animations:** GSAP & Lenis (Smooth Scrolling)
- **Icons:** Lucide React
- **Monitoring:** Sentry

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB (with Mongoose)
- **Authentication:** JWT (JSON Web Tokens) & bcrypt
- **File Uploads:** Multer & Cloudinary
- **Emails:** Nodemailer
- **Security & Logging:** Helmet, CORS, Morgan
- **Monitoring:** Sentry

## ✨ Key Features

### User Experience
- **Smooth Navigation:** Integrated with Lenis for fluid, smooth scrolling and GSAP for interactive animations.
- **Dynamic Product Pages:** Detailed product views, grid layouts, and quick-view modals.
- **Shopping Cart & Wishlist:** Slide-out drawers for easy access and management of items.
- **Secure Authentication:** JWT-based login/signup process with an intuitive modal interface.
- **User Profile:** Dedicated profile section for managing personal details and viewing order history.

### Admin Panel
A comprehensive and secure admin dashboard (`AdminPage`) allowing store administrators to efficiently manage the platform:
- **Product Management:** Add, edit, delete, and categorize electronic components. Includes image uploads via Cloudinary.
- **Order Management:** View order statuses, track shipments, and update order progress.
- **User Management:** Monitor registered users and manage their access levels.
- **Analytics & Dashboard:** Overview of sales, active users, and inventory status.

## 📁 Project Structure

```
shivam/
├── backend/                # Node.js + Express backend
│   ├── server.js           # Entry point
│   ├── package.json        # Backend dependencies
│   └── ...
├── frontend/               # React + Vite frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components (Cart, Wishlist, Modals)
│   │   ├── pages/          # Application routes (Home, Products, Admin, etc.)
│   │   └── ...
│   ├── package.json        # Frontend dependencies
│   └── ...
└── package.json            # Root workspace configuration
```

## 🛠️ Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- MongoDB (local or Atlas cluster)
- Cloudinary account (for image hosting)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-org/shivamelectronicworld.git
   cd shivam
   ```

2. **Install dependencies:**
   The project uses `concurrently` to manage both frontend and backend from the root.
   ```bash
   npm run install:all
   ```
   *(Alternatively, you can manually `cd` into both `backend` and `frontend` and run `npm install`)*

3. **Environment Configuration:**
   - Copy `.env.example` to `.env` in the root (and/or backend/frontend directories as required).
   - Fill in your MongoDB URI, JWT Secret, Cloudinary credentials, and Sentry DSN.

### Running the Application

To start both the frontend and backend development servers concurrently:

```bash
npm run dev
```

- **Frontend** will typically run on `http://localhost:5173`
- **Backend** will typically run on `http://localhost:5000` (or as defined in your `.env`)

## 📜 License

This project is licensed under the MIT License.
