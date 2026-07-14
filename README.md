# Shivam Electronic - Online Catalog & Admin Console

An elegant, modern online store catalog and administrative management system for electronic products. Built using a React + TypeScript frontend and a Node.js + Express + MongoDB backend.

---

## 🏗️ Project Architecture

The workspace is organized into two primary applications:

### 1. Frontend (`/frontend`)
*   **Core Stack:** React, TypeScript, Vite.
*   **Styling:** TailwindCSS, Vanilla CSS, Custom glassmorphism, responsive grid layouts.
*   **UX Features:**
    *   Sleek catalog filters by categories.
    *   Local storage-backed Cart and Wishlist items.
    *   Interactive product details popup modal.
    *   Lenis smooth-scrolling with prevention overrides for modals.
    *   Light-themed Admin Control Panel with collapse menu navigation sidebar and custom action confirmation popups.

### 2. Backend (`/backend`)
*   **Core Stack:** Node.js, Express, MongoDB (Mongoose ODM).
*   **Storage Integration:** Cloudinary API for high-performance remote product image uploads.
*   **Security:** JWT (JSON Web Tokens) stateless authentication and route protection middleware for admins.
*   **Database Seeding:** Automatic fallback data seeding on database connection.

---

## ⚙️ Configuration & Environment Variables

### Backend Environment Variables (`/backend/.env`)
Create a `.env` file in the `/backend` directory matching the following structure:

```env
# MongoDB Connection
MONGODB_URI=your_mongodb_connection_string

# Server Configuration
PORT=5000
FRONTEND_URL=http://localhost:5173

# Cloudinary Credentials
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# Secure Admin Gateway Credentials
ADMIN_EMAIL=admin@shivam.com
ADMIN_PASSWORD=Admin@123
JWT_SECRET=your_jwt_secret_signing_key
```

---

## 🚀 Getting Started

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed (v18+ recommended) along with `npm` or `yarn`.

### Running the Backend Server
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install the node modules:
   ```bash
   npm install
   ```
3. Run the development server (runs nodemon on port 5000):
   ```bash
   npm run dev
   ```

### Running the Frontend client
1. Navigate to the frontend directory:
   ```bash
   cd ../frontend
   ```
2. Install the node modules:
   ```bash
   npm install
   ```
3. Run the Vite development server (usually runs on port 5173):
   ```bash
   npm run dev
   ```

---

## 📡 API Endpoints

### Authentication (`/api/auth`)
*   `POST /api/auth/login` - Authenticate admin credentials and retrieve a signed JWT token.
*   `GET /api/auth/verify` - Check signature validity and expiration of current authorization header JWT tokens.

### Products (`/api/products`)
*   `GET /api/products` - Fetch all products in the database.
*   `POST /api/products` - Create a new product. Includes image upload to Cloudinary (Requires Admin JWT).
*   `PUT /api/products/:id` - Update existing product specifications, brand, price, or image file (Requires Admin JWT).
*   `DELETE /api/products/:id` - Remove product from database catalog (Requires Admin JWT).

### Categories (`/api/categories`)
*   `GET /api/categories` - Fetch all dynamic categories.
*   `POST /api/categories` - Create a new filter category (Requires Admin JWT).
*   `DELETE /api/categories/:slug` - Remove category and filter parameters (Requires Admin JWT).

---

## 🛡️ Admin Panel Features
*   **Full-Height Left Sidebar:** Light mode styling containing the Brand header, a responsive `Collapse Menu` button, and direct tab links.
*   **Overview Stats:** Displays real-time summary statistics for Catalog Size, Category Counts, and Average price calculations, featuring `Package`, `Tag`, and `Coins` icons.
*   **Product Listings & Forms:** Supports editing, details updates, image replacement files, and new product creations with automatic Cloudinary storage hook.
*   **Lenis Scroll Prevention Override:** Employs `data-lenis-prevent` on form modals, allowing scrollbars to move inside modal window boxes naturally.
*   **Custom Warning Popups:** Styled alert overlays replace native browser dialogs, notifying when deletions or logouts are requested.
