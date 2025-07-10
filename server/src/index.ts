import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import { connectDatabase } from './config/database';
import waitlistRoutes from './routes/waitlist';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;
const NODE_ENV = process.env.NODE_ENV || 'development';

// CORS configuration
const corsOrigins = NODE_ENV === 'production' 
  ? [process.env.CORS_ORIGIN_PROD || 'https://yourdomain.com']
  : [process.env.CORS_ORIGIN_DEV || 'http://localhost:5173', 'http://localhost:3000'];

// Middleware
app.use(helmet());
app.use(cors({
  origin: corsOrigins,
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/waitlist', waitlistRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    environment: NODE_ENV,
    database: 'MongoDB'
  });
});

// Root endpoint - different responses for dev vs production
app.get('/', (req, res) => {
  if (NODE_ENV === 'production') {
    // Minimal info in production
    res.json({ 
      message: 'Productivity SaaS Backend API',
      version: '1.0.0',
      status: 'running',
      database: 'MongoDB'
    });
  } else {
    // Full docs in development
    res.json({ 
      message: 'Productivity SaaS Backend API',
      version: '1.0.0',
      environment: 'development',
      database: 'MongoDB',
      endpoints: {
        health: '/health',
        waitlist: {
          join: 'POST /api/waitlist/join',
          count: 'GET /api/waitlist/count',
          entries: 'GET /api/waitlist/entries'
        }
      }
    });
  }
});

// Error handling middleware
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Unhandled error:', err);
  res.status(500).json({
    success: false,
    message: 'Internal server error'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint not found'
  });
});

// Start server
const startServer = async () => {
  try {
    // Connect to MongoDB
    await connectDatabase();
    
    // Start Express server
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`🌍 Environment: ${NODE_ENV}`);
      console.log(`💾 Database: MongoDB`);
      console.log(`🔗 Health check: http://localhost:${PORT}/health`);
      console.log(`📚 API docs: http://localhost:${PORT}/`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

startServer(); 