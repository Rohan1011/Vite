require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const courseRoutes = require('./routes/courses');
const feedbackRoutes = require('./routes/feedback');
const adminRoutes = require('./routes/admin');
const app = express();
const PORT = process.env.PORT || 5000;

connectDB();
app.use(cors());
app.use(express.json({limit: '5mb'}));

app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/feedback', feedbackRoutes);
app.use('/api/admin', adminRoutes);

app.get('/', (req, res) => res.send({ok:true, msg:'Student Feedback API'}));

app.listen(PORT, () => console.log('Server running on port', PORT));
