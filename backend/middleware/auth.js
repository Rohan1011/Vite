const jwt = require('jsonwebtoken');
const User = require('../models/User');
module.exports = {
  auth: async (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ','') || req.query.token;
    if(!token) return res.status(401).json({error:'No token'});
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'supersecret_jwt_key');
      const user = await User.findById(decoded.id);
      if(!user) return res.status(401).json({error:'Invalid token - user not found'});
      if(user.blocked) return res.status(403).json({error:'Account blocked'});
      req.user = user;
      next();
    } catch(err){ return res.status(401).json({error:'Token invalid'}); }
  },
  adminOnly: (req, res, next) => {
    if(!req.user) return res.status(401).json({error:'Not authenticated'});
    if(req.user.role !== 'admin') return res.status(403).json({error:'Admins only'});
    next();
  }
};
