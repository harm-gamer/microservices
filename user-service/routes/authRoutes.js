const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require("../models/user");
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Register a new user
router.post('/register', async (req, res) => {
  const { name, email, password, role } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) return res.status(400).json({ message: 'User already exists' });

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({ name, email, password: hashedPassword, role });

  res.status(201).json({ message: 'User created', user: newUser });
});

// Login user and return JWT
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: 'User not found' });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

  const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

  res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
});
router.get('/profile',authMiddleware, async (req,res) =>{
  try {
		const userId = req.user.userId;
    console.log(req.user);
    console.log( userId)
    const user = await User.findOne({_id : userId})
    res.json(user);
	} catch (error) {
		res.status(500).json({ message: "Server error", error: error.message });
	}
})
router.post("/logout",async (req, res) => {
	try {
		const Token = req.header('Authorization');
		if (Token) {
			const decoded = jwt.verify(Token, process.env.JWT_SECRET);
		}
    localStorage.removeItem('token');
		res.json({ message: "Logged out successfully" });
	} catch (error) {
		console.log("Error in logout controller", error.message);
		res.status(500).json({ message: "Server error", error: error.message });
	}
});


module.exports = router;
