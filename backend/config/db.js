const mongoose = require('mongoose');
const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/student_feedback_app';

module.exports = async function connectDB() {
  try {
    await mongoose.connect(uri, {useNewUrlParser:true, useUnifiedTopology:true});
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection error', err.message);
    process.exit(1);
  }
};
