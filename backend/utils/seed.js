// simple seeder to create an admin and some courses
const mongoose = require('mongoose');
const User = require('../models/User');
const Course = require('../models/Course');
const bcrypt = require('bcrypt');
const connectDB = require('../config/db');
require('dotenv').config();

async function seed() {
  const adminEmail = 'admin@example.com';
  const existing = await User.findOne({ email: adminEmail });
  if (!existing) {
    const hash = await bcrypt.hash('Admin@1234', 10);
    await User.create({ name: 'Admin', email: adminEmail, password: hash, role: 'admin' });
    console.log('Admin created: admin@example.com / Admin@1234');
  }

  const courses = [
    { code: 'CS101', title: 'Intro to Computer Science' },
    { code: 'MATH101', title: 'Calculus I' },
    { code: 'ENG201', title: 'English Literature' }
  ];

  for (const c of courses) {
    const exists = await Course.findOne({ code: c.code });
    if (!exists) await Course.create(c);
  }

  console.log('Seed complete');
  process.exit(0);
}

(async () => {
  try {
    await connectDB();  // connect to MongoDB
    await seed();       // run seeding
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
})();
