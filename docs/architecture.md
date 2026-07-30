# Architecture Overview

## System Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                        CLIENT (Browser)                        │
│                    React 19 + Vite + Tailwind v4               │
│                                                                 │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐       │
│  │   Home   │  │ Products │  │  About   │  │ Contact  │  ...   │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘       │
│        │              │             │             │             │
│        └──────────────┴─────────────┴─────────────┘             │
│                           │                                     │
│                     API Client (fetch)                          │
└────────────────────────────┬────────────────────────────────────┘
                             │ HTTPS / JSON
┌────────────────────────────▼────────────────────────────────────┐
│                    BACKEND (Express.js)                         │
│                                                                 │
│  ┌──────────┐  ┌──────────────┐  ┌───────────┐                │
│  │  Routes  │→ │ Controllers  │→ │ Services  │                │
│  └──────────┘  └──────────────┘  └───────────┘                │
│        │                                │                       │
│  ┌──────────┐                    ┌──────────┐                  │
│  │Middleware│                    │  Models   │                  │
│  │(Auth,    │                    │(Mongoose) │                  │
│  │ CORS,    │                    └──────────┘                  │
│  │ Rate     │                         │                        │
│  │ Limit)   │                         │                        │
│  └──────────┘                         │                        │
└───────────────────────────────────────┬────────────────────────┘
                                        │
                    ┌───────────────────┼───────────────────┐
                    │                   │                   │
              ┌─────▼─────┐     ┌──────▼──────┐    ┌──────▼──────┐
              │  MongoDB   │     │ Cloudinary  │    │   Gmail     │
              │  (Atlas)   │     │ (Images)    │    │   SMTP      │
              └────────────┘     └─────────────┘    └─────────────┘

## Tech Stack

### Frontend
- **React 19** — UI library
- **TypeScript** — Type safety
- **Vite** — Build tool & dev server
- **Tailwind CSS v4** — Utility-first styling
- **Lenis** — Smooth scrolling
- **Lucide React** — Icon library
- **Sentry** — Client-side error tracking

### Backend
- **Express.js** — HTTP framework
- **Mongoose** — MongoDB ODM
- **JWT** — Authentication tokens
- **bcryptjs** — Password hashing
- **Cloudinary** — Image CDN & upload
- **Nodemailer** — Email service (OTP, password reset)
- **Sentry** — Server-side error tracking
- **express-rate-limit** — API rate limiting

### Infrastructure
- **Vercel** — Frontend hosting
- **Render** — Backend hosting
- **MongoDB Atlas** — Managed database
- **GitHub Actions** — CI/CD pipelines
- **Docker** — Containerization (optional)

## Data Flow

1. User interacts with React frontend
2. Frontend calls backend REST API via `fetch()`
3. Backend routes → controllers → services → models
4. Models interact with MongoDB via Mongoose
5. Images are uploaded to Cloudinary, URLs stored in MongoDB
6. JWT tokens are used for authenticated routes
7. Sentry captures errors on both client and server
```
