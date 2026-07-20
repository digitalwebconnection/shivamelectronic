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
// 1. Localhost development (on any port)
// 2. Local network IP addresses (e.g., http://192.168.x.x)
// 3. Configured production domains (FRONTEND_URL env list)
const allowedOrigins = [];
if (process.env.FRONTEND_URL) {
  process.env.FRONTEND_URL.split(',').forEach(origin => {
    const trimmed = origin.trim();
    if (trimmed) {
      allowedOrigins.push(trimmed);
      // Auto-register HTTP/HTTPS variations for flexibility
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
    // Allow requests with no origin (like mobile apps, postman, curl)
    if (!origin) return callback(null, true);

    // If wildcard '*' is in the list, allow all origins
    if (allowedOrigins.includes('*')) {
      return callback(null, true);
    }

    // Match exact configured domains (with and without trailing slash)
    if (allowedOrigins.includes(origin) || allowedOrigins.includes(origin + '/')) {
      return callback(null, true);
    }

    // Match local development machines (localhost, 127.0.0.1 on any port)
    if (origin.startsWith('http://localhost:') || origin.startsWith('http://127.0.0.1:')) {
      return callback(null, true);
    }

    // Match Wi-Fi/local network IPs (e.g. 192.168.x.x, 10.x.x.x, 172.16-31.x.x) on any port
    const localIpPattern = /^http:\/\/192\.168\.\d{1,3}\.\d{1,3}(:\d+)?$/;
    const localIpPattern2 = /^http:\/\/10\.\d{1,3}\.\d{1,3}\.\d{1,3}(:\d+)?$/;
    const localIpPattern3 = /^http:\/\/172\.(1[6-9]|2\d|3[0-1])\.\d{1,3}\.\d{1,3}(:\d+)?$/;

    if (localIpPattern.test(origin) || localIpPattern2.test(origin) || localIpPattern3.test(origin)) {
      return callback(null, true);
    }

    console.log(`[CORS Blocked] Origin: ${origin}`);
    callback(new Error('Blocked by CORS policy'));
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
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
