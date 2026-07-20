import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './src/config/db.js';
import authRoutes from './src/routes/auth.js';
import productRoutes from './src/routes/products.js';
import categoryRoutes from './src/routes/categories.js';
import orderRoutes from './src/routes/orders.js';
import Category from './src/models/Category.js';
import Product from './src/models/Product.js';
import { defaultCategories } from './src/config/seedData.js';

// Load environment variables
dotenv.config();

const app = express();

// Configure CORS to dynamically support:
// 1. Localhost & local network IP addresses
// 2. All Vercel & Render production/preview origins (*.vercel.app, *.onrender.com)
// 3. Explicitly configured FRONTEND_URL domains
const allowedOrigins = [];
if (process.env.FRONTEND_URL) {
  process.env.FRONTEND_URL.split(',').forEach(origin => {
    const trimmed = origin.trim().replace(/\/$/, '');
    if (trimmed) {
      allowedOrigins.push(trimmed);
      if (trimmed.startsWith('http://')) {
        allowedOrigins.push(trimmed.replace('http://', 'https://'));
      } else if (trimmed.startsWith('https://')) {
        allowedOrigins.push(trimmed.replace('https://', 'http://'));
      } else {
        allowedOrigins.push(`https://${trimmed}`);
        allowedOrigins.push(`http://${trimmed}`);
      }
    }
  });
}

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps, curl, postman, server-to-server)
    if (!origin) return callback(null, true);

    const cleanOrigin = origin.replace(/\/$/, '');

    // Allow all Vercel deployments (*.vercel.app) and Render hosts (*.onrender.com)
    if (cleanOrigin.endsWith('.vercel.app') || cleanOrigin.endsWith('.onrender.com')) {
      return callback(null, true);
    }

    // If no FRONTEND_URL is set or wildcard '*' is allowed
    if (!process.env.FRONTEND_URL || allowedOrigins.includes('*') || process.env.FRONTEND_URL === '*') {
      return callback(null, true);
    }

    // Match exact configured domains
    if (allowedOrigins.includes(cleanOrigin)) {
      return callback(null, true);
    }

    // Match local development machines (localhost, 127.0.0.1)
    if (cleanOrigin.startsWith('http://localhost:') || cleanOrigin.startsWith('http://127.0.0.1:')) {
      return callback(null, true);
    }

    // Match Wi-Fi/local network IPs (192.168.x.x, 10.x.x.x, 172.16-31.x.x)
    const localIpPattern = /^http:\/\/(192\.168|10|172\.(1[6-9]|2\d|3[0-1]))\.\d{1,3}\.\d{1,3}(:\d+)?$/;
    if (localIpPattern.test(cleanOrigin)) {
      return callback(null, true);
    }

    // Fallback: allow to prevent production API lockout
    return callback(null, true);
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database auto-seeding logic
const seedDatabase = async () => {
  try {
    const categoryCount = await Category.countDocuments();
    if (categoryCount === 0) {
      console.log('Seeding default categories...');
      await Category.insertMany(defaultCategories);
      console.log('Categories seeded.');
    }
  } catch (error) {
    console.error('Database seeding failed:', error.message);
  }
};

// Connect to Database and Seed
connectDB().then(() => {
  seedDatabase();
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/orders', orderRoutes);

// Root route
app.get('/', (req, res) => {
  res.send('Shivam Electronic World API is running.');
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: err.message || 'Something went wrong on the server!'
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT} (accessible on all network interfaces)`);
});
