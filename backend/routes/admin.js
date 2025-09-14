const express = require('express');
const router = express.Router();
const { auth, adminOnly } = require('../middleware/auth');
const User = require('../models/User');
const Feedback = require('../models/Feedback');
const Course = require('../models/Course');
const createCsvWriter = require('csv-writer').createObjectCsvStringifier;

// admin must use auth then adminOnly
router.use(auth);

router.get('/stats', adminOnly, async (req,res) => {
  const totalFeedback = await Feedback.countDocuments();
  const totalStudents = await User.countDocuments({role:'student'});
  // average rating per course
  const agg = await Feedback.aggregate([
    { $group: { _id: '$course', avgRating: { $avg: '$rating' }, count: { $sum: 1 } } },
    { $lookup: { from: 'courses', localField: '_id', foreignField: '_id', as: 'course' } },
    { $unwind: '$course' },
    { $project: { course: '$course.title', avgRating:1, count:1 } }
  ]);
  res.json({totalFeedback, totalStudents, perCourse: agg});
});

router.get('/users', adminOnly, async (req,res) => {
  const users = await User.find().sort('-createdAt');
  res.json(users);
});

router.post('/users/:id/block', adminOnly, async (req,res) => {
  const user = await User.findById(req.params.id);
  if(!user) return res.status(404).json({error:'User not found'});
  user.blocked = true;
  await user.save();
  res.json({ok:true});
});

router.post('/users/:id/unblock', adminOnly, async (req,res) => {
  const user = await User.findById(req.params.id);
  if(!user) return res.status(404).json({error:'User not found'});
  user.blocked = false;
  await user.save();
  res.json({ok:true});
});

router.delete('/users/:id', adminOnly, async (req,res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ok:true});
});

// manage courses
router.post('/courses', adminOnly, async (req,res) => {
  const {code,title,description} = req.body;
  const c = await Course.create({code,title,description});
  res.json(c);
});
router.put('/courses/:id', adminOnly, async (req,res) => {
  const c = await Course.findById(req.params.id);
  if(!c) return res.status(404).json({error:'Not found'});
  c.code = req.body.code || c.code;
  c.title = req.body.title || c.title;
  c.description = req.body.description || c.description;
  await c.save();
  res.json(c);
});
router.delete('/courses/:id', adminOnly, async (req,res) => {
  await Course.findByIdAndDelete(req.params.id);
  res.json({ok:true});
});

// export feedback CSV
router.get('/export/feedback', adminOnly, async (req,res) => {
  const all = await Feedback.find().populate('student').populate('course').lean();
  const csvWriter = createCsvWriter({
    header: [
      {id:'_id', title:'id'},
      {id:'student', title:'student'},
      {id:'email', title:'email'},
      {id:'course', title:'course'},
      {id:'rating', title:'rating'},
      {id:'message', title:'message'},
      {id:'createdAt', title:'createdAt'}
    ]
  });
  const records = all.map(a=>({ _id: a._id.toString(), student:a.student.name, email:a.student.email, course:a.course.title, rating:a.rating, message:a.message, createdAt:a.createdAt }));
  const csv = csvWriter.stringifyRecords(records);
  res.header('Content-Type','text/csv');
  res.attachment('feedback_export.csv');
  res.send(csv);
});

module.exports = router;
