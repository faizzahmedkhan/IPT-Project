import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Course title is required'],
    trim: true
  },
  level: {
    type: String,
    required: [true, 'Course level is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Course description is required'],
    trim: true
  },
  topics: [{
    type: String,
    trim: true
  }],
  icon: {
    type: String,
    default: 'BookOpen'
  },
  isActive: {
    type: Boolean,
    default: true
  },
  price: {
    type: Number,
    default: 0
  },
  duration: {
    type: String,
    default: 'Self-paced'
  }
}, {
  timestamps: true
});

const Course = mongoose.model('Course', courseSchema);

export default Course;
