import dotenv from 'dotenv';
import { initSentry } from './src/config/sentry.js';
import connectDB from './src/config/db.js';
import Category from './src/models/Category.js';
import { defaultCategories } from './src/config/seedData.js';
import app from './src/app.js';

// Load Environment Variables
dotenv.config();

// Validate required environment variables
import './src/config/env.js';

// Initialize Sentry
initSentry();

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
// Start Server
// ===============================

const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on port ${PORT}`);
});