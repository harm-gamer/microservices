const jwt = require('jsonwebtoken');
const User  = require("../models/user.js")
const authMiddleware =async (req, res, next) => {
  const token = req.headers["authorization"];
 
  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }
console.log(token);

  try {
    const decoded = jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET);
console.log(decoded);
    const user = await User.findById(decoded.userId).select("-password");

    console.log(user);
			if (!user) {
				return res.status(401).json({ message: "User not found" });
			}

			req.user = user;

 
    next();
  } catch (error) {
    res.status(400).json({ message: error.message});
  }
};

module.exports = authMiddleware;
