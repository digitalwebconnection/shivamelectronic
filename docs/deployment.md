# Deployment Guide

## Prerequisites
- Node.js ≥ 18
- MongoDB Atlas account
- Cloudinary account
- GitHub account
- Vercel account (frontend)
- Render account (backend)

---

## 1. MongoDB Atlas Setup

1. Create a cluster at [mongodb.com/atlas](https://www.mongodb.com/atlas)
2. Create a database user
3. Whitelist your IP (or `0.0.0.0/0` for Render)
4. Copy the connection string

---

## 2. Cloudinary Setup

1. Create an account at [cloudinary.com](https://cloudinary.com)
2. Navigate to Dashboard → Copy Cloud Name, API Key, API Secret

---

## 3. Backend Deployment (Render)

1. Push your code to GitHub
2. Go to [render.com](https://render.com) → New Web Service
3. Connect your GitHub repository
4. Set:
   - **Root Directory:** `backend`
   - **Build Command:** `npm install`
   - **Start Command:** `node server.js`
5. Add environment variables from `backend/.env.example`
6. Deploy

---

## 4. Frontend Deployment (Vercel)

1. Go to [vercel.com](https://vercel.com) → Import Project
2. Connect your GitHub repository
3. Set:
   - **Root Directory:** `frontend`
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
4. Add environment variables:
   - `VITE_API_URL` = your Render backend URL
   - `VITE_SENTRY_DSN` = your Sentry DSN
5. Deploy

---

## 5. Docker Deployment (Optional)

```bash
cd docker
docker-compose up --build -d
```

This starts:
- MongoDB on port `27017`
- Backend on port `5000`
- Frontend on port `3000`

---

## 6. Post-Deployment Checklist

- [ ] Verify frontend loads at production URL
- [ ] Verify API responds at `/api/products`
- [ ] Test user registration and login
- [ ] Test product image upload (Cloudinary)
- [ ] Test order placement
- [ ] Verify Sentry captures test errors
- [ ] Update CORS settings for production domain
