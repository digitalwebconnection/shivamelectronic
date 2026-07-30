import express from 'express';
import corsMiddleware from './config/cors.js';
import { errorHandler } from './middleware/errorHandler.js';
import routes from './routes/index.js';

const app = express();

// Middlewares
app.use(corsMiddleware);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use('/api', routes);

// Root Route
app.get('/', (req, res) => {
  res.send('Shivam Electronic World API is running.');
});

// Error Handler
app.use(errorHandler);

export default app;
