const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

// Routes
const newsRoutes = require('./routes/newsRoutes');
const aiRoutes = require('./routes/aiRoutes');
const authRoutes = require('./routes/authRoutes'); // New
const trackingRoutes = require('./routes/trackingRoutes');
const articleHistoryRoutes = require('./routes/articleHistory');
const quizRoutes = require('./routes/quizRoutes');
const promptQuizRoutes = require('./routes/promptQuizRoutes');
const userRoutes = require('./routes/userRoutes');
const articleFeedbackRoutes = require('./routes/articleFeedbackRoutes');

// DB Connection
const connectDB = require('./utils/db'); // New

// Initialize models
require('./models');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Database
connectDB().then(() => {
  console.log('Models initialized');
}).catch(err => {
  console.error('Failed to initialize models:', err);
});

// Routes
app.use('/api/news', newsRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/auth', authRoutes); // New
app.use('/api/tracking', trackingRoutes);
app.use('/api/article-history', articleHistoryRoutes);
app.use('/api/quiz', quizRoutes);
app.use('/api/prompt-quiz', promptQuizRoutes);
app.use('/api/users', userRoutes);
app.use('/api/article-feedback', articleFeedbackRoutes);

// Health Check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK' });
});

app.listen(PORT, () => {
  console.log(`✅ Server is running at http://localhost:${PORT}`);
});