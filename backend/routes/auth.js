const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const bcrypt = require("bcryptjs");

function validateEmail(email){ return /\S+@\S+\.\S+/.test(email); }
function validatePassword(p){ return p.length>=8 && /[0-9]/.test(p) && /[^A-Za-z0-9]/.test(p); }

router.post('/signup', async (req, res) => {
  const {name, email, password} = req.body;
  if(!name || !email || !password) return res.status(400).json({error:'Missing fields'});
  if(!validateEmail(email)) return res.status(400).json({error:'Invalid email'});
  if(!validatePassword(password)) return res.status(400).json({error:'Weak password'});
  try {
    const exists = await User.findOne({email});
    if(exists) return res.status(400).json({error:'Email already exists'});
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({name,email,password:hash});
    const token = jwt.sign({id:user._id}, process.env.JWT_SECRET || 'supersecret_jwt_key',{expiresIn:'7d'});
    res.json({user:{id:user._id,name:user.name,email:user.email,role:user.role}, token});
  } catch(err){ res.status(500).json({error:err.message}); }
});

router.post('/login', async (req, res) => {
  const {email,password} = req.body;
  if(!email||!password) return res.status(400).json({error:'Missing fields'});
  try {
    const user = await User.findOne({email});
    if(!user) return res.status(400).json({error:'Invalid credentials'});
    const ok = await bcrypt.compare(password, user.password);
    if(!ok) return res.status(400).json({error:'Invalid credentials'});
    const token = jwt.sign({id:user._id}, process.env.JWT_SECRET || 'supersecret_jwt_key',{expiresIn:'7d'});
    res.json({user:{id:user._id,name:user.name,email:user.email,role:user.role}, token});
  } catch(err){ res.status(500).json({error:err.message}); }
});

module.exports = router;
