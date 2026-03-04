import express from 'express';
import cors from 'cors';
import helmet from 'helmet';

// Import routes
import routes from './routes/index';

// Import middleware
import { notFound, errorHandler } from './middlewares';

const app = express();

// Security middleware
app.use(helmet());
app.use(cors());

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Server is running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
  });
});

// API Routes
app.use('/api', routes);

app.use(notFound);
app.use(errorHandler);

export default app;
