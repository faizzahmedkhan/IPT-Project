import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Import routes
import contactRoutes from './routes/contact.js';
import courseRoutes from './routes/courses.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors({
  origin: [
    'http://localhost:5173', 
    'http://localhost:8080', 
    'http://localhost:8081', 
    'http://localhost:3000',
    process.env.FRONTEND_URL,
    /\.vercel\.app$/  // Allow all Vercel preview URLs
  ].filter(Boolean),
  credentials: true
}));
app.use(express.json());

// MongoDB Connection (with graceful fallback)
let isDbConnected = false;

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB');
    isDbConnected = true;
  })
  .catch((err) => {
    console.warn('⚠️  MongoDB connection failed:', err.message);
    console.warn('⚠️  Server running in demo mode (in-memory data)');
  });

// Make DB status available to routes
app.use((req, res, next) => {
  req.isDbConnected = isDbConnected;
  next();
});

// Routes
app.use('/api/contact', contactRoutes);
app.use('/api/courses', courseRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'Server is running!',
    timestamp: new Date().toISOString()
  });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({ 
    message: 'Welcome to Responsible AI Consulting API',
    endpoints: {
      health: '/api/health',
      courses: '/api/courses',
      contact: '/api/contact'
    }
  });
});

// Start server (only in non-serverless environment)
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
}

// Export for Vercel serverless
export default app;