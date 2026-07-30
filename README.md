# Shivam Electronic World

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
```

---

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
