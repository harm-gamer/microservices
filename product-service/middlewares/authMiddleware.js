const jwt = require('jsonwebtoken');
const User = require('../../user-service/models/user');

const authMiddleware = async(req, res, next) => {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId).select("-password");
   if(user){
    return res.status(500).json({msg : "Auothorized"});
   }
    req.user = user;
   next();
  } catch (error) {
    res.status(400).json({ message: 'Invalid token' });
  }
};

module.exports = authMiddleware;
