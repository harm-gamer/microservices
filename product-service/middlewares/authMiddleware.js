const jwt = require('jsonwebtoken');

const axios = require("axios");

const authMiddleware = async(req, res, next) => {
    console.log("entering loop");

    const token = req.headers["authorization"];
    console.log(token);
      if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
      }
  try {
    console.log(process.env.JWT_SECRET);
    const decoded = jwt.verify(token.replace('Bearer ', '').trim(), process.env.JWT_SECRET);
    if(!decoded) {
      return res.status(401).json({ message: 'Invalid token' });
    }
    console.log(decoded);
    // const user = await User.findById(decoded.userId).select("-password");
    let response = await axios.get("http://localhost:5000/api/auth/profile",{
      headers: { Authorization: `Bearer ${token}` }
    })
    console.log(response);
   
   if(!response){
    return res.status(500).json({msg : "Aunothorized"});
   }
    req.user = response.data;
   next();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = authMiddleware;
