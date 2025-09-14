const express = require('express');
const router = express.Router();
const Feedback = require('../models/Feedback');
const Course = require('../models/Course');
const { auth } = require('../middleware/auth');

// submit feedback
router.post('/', auth, async (req,res) => {
  const {courseId, rating, message} = req.body;
  if(!courseId || !rating) return res.status(400).json({error:'Missing fields'});
  const course = await Course.findById(courseId);
  if(!course) return res.status(400).json({error:'Invalid course'});
  const fb = await Feedback.create({student:req.user._id, course:course._id, rating, message});
  res.json(fb);
});

// student's feedback paginated
router.get('/me', auth, async (req,res) => {
  const page = parseInt(req.query.page)||1;
  const limit = parseInt(req.query.limit)||10;
  const skip = (page-1)*limit;
  const total = await Feedback.countDocuments({student:req.user._id});
  const items = await Feedback.find({student:req.user._id}).populate('course').sort({createdAt:-1}).skip(skip).limit(limit);
  res.json({total,page,limit,items});
});

// edit
router.put('/:id', auth, async (req,res) => {
  const fb = await Feedback.findById(req.params.id);
  if(!fb) return res.status(404).json({error:'Not found'});
  if(fb.student.toString() !== req.user._id.toString()) return res.status(403).json({error:'Forbidden'});
  const {rating,message} = req.body;
  fb.rating = rating || fb.rating;
  fb.message = message || fb.message;
  await fb.save();
  res.json(fb);
});

// delete
router.delete('/:id', auth, async (req,res) => {
  const fb = await Feedback.findById(req.params.id);
  if(!fb) return res.status(404).json({error:'Not found'});
  if(fb.student.toString() !== req.user._id.toString()) return res.status(403).json({error:'Forbidden'});
  await fb.remove();
  res.json({ok:true});
});

module.exports = router;
