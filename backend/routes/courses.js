import express from 'express';
import Course from '../models/Course.js';

const router = express.Router();

// In-memory fallback data for demo mode
const fallbackCourses = [
  {
    _id: "1",
    title: "Python Programming Fundamentals",
    level: "Beginner to Intermediate",
    description: "Master Python programming from basics to advanced concepts. Perfect for aspiring developers and data scientists.",
    topics: ["Syntax & Data Types", "Object-Oriented Programming", "File Handling", "Error Handling"],
    icon: "Code2",
    price: 299,
    duration: "8 weeks",
    isActive: true
  },
  {
    _id: "2",
    title: "Machine Learning & Deep Learning",
    level: "Intermediate to Advanced",
    description: "Dive deep into ML algorithms, neural networks, and real-world AI applications using TensorFlow and PyTorch.",
    topics: ["Supervised Learning", "Neural Networks", "Computer Vision", "NLP"],
    icon: "Brain",
    price: 499,
    duration: "12 weeks",
    isActive: true
  },
  {
    _id: "3",
    title: "Data Engineering & Analytics",
    level: "Intermediate",
    description: "Learn to build robust data pipelines, work with databases, and extract actionable insights from data.",
    topics: ["SQL & PostgreSQL", "Data Pipeline Design", "ETL Processes", "Data Visualization"],
    icon: "Database",
    price: 399,
    duration: "10 weeks",
    isActive: true
  },
  {
    _id: "4",
    title: "AI for Business Leaders",
    level: "Executive Level",
    description: "Understand how to effectively incorporate AI into business operations and drive innovation.",
    topics: ["AI Strategy", "Use Case Identification", "ROI Assessment", "Responsible AI"],
    icon: "BookOpen",
    price: 599,
    duration: "6 weeks",
    isActive: true
  }
];

// GET /api/courses - Get all courses
router.get('/', async (req, res) => {
  try {
    // Try MongoDB first, fallback to in-memory
    let courses;
    try {
      courses = await Course.find({ isActive: true }).sort({ createdAt: -1 });
      if (courses.length === 0) {
        courses = fallbackCourses;
      }
    } catch {
      courses = fallbackCourses;
    }
    
    res.json({
      success: true,
      count: courses.length,
      data: courses
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch courses',
      error: error.message
    });
  }
});

// GET /api/courses/:id - Get single course
router.get('/:id', async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }
    res.json({
      success: true,
      data: course
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch course',
      error: error.message
    });
  }
});

// POST /api/courses - Create a new course
router.post('/', async (req, res) => {
  try {
    const { title, level, description, topics, icon, price, duration } = req.body;

    const course = new Course({
      title,
      level,
      description,
      topics,
      icon,
      price,
      duration
    });

    await course.save();

    res.status(201).json({
      success: true,
      message: 'Course created successfully',
      data: course
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to create course',
      error: error.message
    });
  }
});

// PUT /api/courses/:id - Update a course
router.put('/:id', async (req, res) => {
  try {
    const course = await Course.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }

    res.json({
      success: true,
      message: 'Course updated successfully',
      data: course
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to update course',
      error: error.message
    });
  }
});

// DELETE /api/courses/:id - Delete a course
router.delete('/:id', async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }

    res.json({
      success: true,
      message: 'Course deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to delete course',
      error: error.message
    });
  }
});

// POST /api/courses/seed - Seed initial courses data
router.post('/seed', async (req, res) => {
  try {
    const initialCourses = [
      {
        title: "Python Programming Fundamentals",
        level: "Beginner to Intermediate",
        description: "Master Python programming from basics to advanced concepts. Perfect for aspiring developers and data scientists.",
        topics: ["Syntax & Data Types", "Object-Oriented Programming", "File Handling", "Error Handling"],
        icon: "Code2",
        price: 299,
        duration: "8 weeks"
      },
      {
        title: "Machine Learning & Deep Learning",
        level: "Intermediate to Advanced",
        description: "Dive deep into ML algorithms, neural networks, and real-world AI applications using TensorFlow and PyTorch.",
        topics: ["Supervised Learning", "Neural Networks", "Computer Vision", "NLP"],
        icon: "Brain",
        price: 499,
        duration: "12 weeks"
      },
      {
        title: "Data Engineering & Analytics",
        level: "Intermediate",
        description: "Learn to build robust data pipelines, work with databases, and extract actionable insights from data.",
        topics: ["SQL & PostgreSQL", "Data Pipeline Design", "ETL Processes", "Data Visualization"],
        icon: "Database",
        price: 399,
        duration: "10 weeks"
      },
      {
        title: "AI for Business Leaders",
        level: "Executive Level",
        description: "Understand how to effectively incorporate AI into business operations and drive innovation.",
        topics: ["AI Strategy", "Use Case Identification", "ROI Assessment", "Responsible AI"],
        icon: "BookOpen",
        price: 599,
        duration: "6 weeks"
      }
    ];

    // Clear existing courses and insert new ones
    await Course.deleteMany({});
    const courses = await Course.insertMany(initialCourses);

    res.status(201).json({
      success: true,
      message: 'Courses seeded successfully',
      count: courses.length,
      data: courses
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to seed courses',
      error: error.message
    });
  }
});

export default router;
