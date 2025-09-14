const express = require('express');
const router = express.Router();
const Course = require('../models/Course');
const { auth } = require('../middleware/auth');


// public list
router.get('/', async (req,res) => {
  const list = await Course.find().sort('title');
  res.json(list);
});

// admin create/edit/delete - protected by admin route (admin middleware used in admin routes)
module.exports = router;
