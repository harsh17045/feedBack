const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://harshcr05_db_user:Chanpura1704@cluster0.hlgtsye.mongodb.net/feedback-dashboard?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected successfully'))
.catch((err) => console.error('MongoDB connection error:', err));

// Feedback Schema
const feedbackSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  message: {
    type: String,
    required: true,
    trim: true
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Feedback = mongoose.model('Feedback', feedbackSchema);

// Routes

// POST /api/feedback - Add new feedback
app.post('/api/feedback', async (req, res) => {
  try {
    const { name, email, message, rating } = req.body;

    // Validation
    if (!name || name.trim() === '') {
      return res.status(400).json({ error: 'Name is required' });
    }

    if (!message || message.trim() === '') {
      return res.status(400).json({ error: 'Message is required' });
    }

    if (!email || email.trim() === '') {
      return res.status(400).json({ error: 'Email is required' });
    }

    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({ error: 'Rating must be between 1 and 5' });
    }

    const feedback = new Feedback({
      name: name.trim(),
      email: email.trim(),
      message: message.trim(),
      rating: parseInt(rating)
    });

    await feedback.save();
    res.status(201).json({ message: 'Feedback submitted successfully', feedback });
  } catch (error) {
    console.error('Error creating feedback:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/feedback - Fetch all feedbacks
app.get('/api/feedback', async (req, res) => {
  try {
    const feedbacks = await Feedback.find().sort({ createdAt: -1 });
    res.json(feedbacks);
  } catch (error) {
    console.error('Error fetching feedbacks:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/stats - Get analytics data
app.get('/api/stats', async (req, res) => {
  try {
    const totalFeedbacks = await Feedback.countDocuments();
    
    const feedbacks = await Feedback.find();
    const totalRating = feedbacks.reduce((sum, fb) => sum + fb.rating, 0);
    const averageRating = totalFeedbacks > 0 ? (totalRating / totalFeedbacks).toFixed(2) : 0;
    
    const positiveFeedbacks = feedbacks.filter(fb => fb.rating >= 4).length;
    const negativeFeedbacks = feedbacks.filter(fb => fb.rating < 3).length;
    
    res.json({
      totalFeedbacks,
      averageRating: parseFloat(averageRating),
      positiveFeedbacks,
      negativeFeedbacks
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

