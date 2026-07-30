import express from 'express';
import dotenv from 'dotenv';

import { initSentry, Sentry } from './src/config/sentry.js';
import connectDB from './src/config/db.js';
import corsMiddleware from './src/config/cors.js';

import authRoutes from './src/routes/auth.js';
import productRoutes from './src/routes/products.js';
import categoryRoutes from './src/routes/categories.js';
import orderRoutes from './src/routes/orders.js';

import Category from './src/models/Category.js';
import { defaultCategories } from './src/config/seedData.js';

// Load Environment Variables
dotenv.config();

// Validate required environment variables
import './src/config/env.js';

// Initialize Sentry
initSentry();

const app = express();


// ===============================
// Middlewares
// ===============================

app.use(corsMiddleware);

app.use(express.json());

app.use(express.urlencoded({ extended: true }));


// ===============================
// Database Seeding
// ===============================

const seedDatabase = async () => {
  try {

    const categoryCount = await Category.countDocuments();

    if (categoryCount === 0) {

      console.log("Seeding default categories...");

      await Category.insertMany(defaultCategories);

      console.log("Categories seeded successfully.");

    }

  } catch (error) {

    console.error("Database seeding failed:", error.message);

  }
};


// ===============================
// Database Connection
// ===============================

connectDB().then(() => {

  seedDatabase();

});


// ===============================
// API Routes
// ===============================

app.use('/api/auth', authRoutes);

app.use('/api/products', productRoutes);

app.use('/api/categories', categoryRoutes);

app.use('/api/orders', orderRoutes);


// ===============================
// Root Route
// ===============================

app.get('/', (req, res) => {

  res.send('Shivam Electronic World API is running.');

});


// ===============================
// Sentry Error Handler
// ===============================

Sentry.setupExpressErrorHandler(app);


// ===============================
// Global Error Handler
// ===============================

app.use((err, req, res, next) => {

  console.error(err);

  res.status(err.status || 500).json({

    success: false,

    message:
      process.env.NODE_ENV === "production"
        ? "Internal Server Error"
        : err.message

  });

});


// ===============================
// Start Server
// ===============================

const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {

  console.log(`🚀 Server running on port ${PORT}`);

});