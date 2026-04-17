import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '../config/db.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// @route   POST /api/users/register
router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // 1. Check if user exists using Prisma
    const userExists = await prisma.user.findUnique({
      where: { email },
    });

    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // 2. Manually hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 3. Create the user in PostgreSQL
    const user = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });

    // 4. Generate Token
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '30d' });

    res.status(201).json({
      id: user.id,
      username: user.username,
      email: user.email,
      token,
    });
  } catch (error) {
    console.error('Registration Error:', error);
    res.status(500).json({ message: 'Server error during registration' });
  }
});

// @route   POST /api/users/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Find user in PostgreSQL
    const user = await prisma.user.findUnique({
      where: { email },
    });

    // 2. Check user exists AND manually compare passwords
    if (user && (await bcrypt.compare(password, user.password))) {
      
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '30d' });

      res.json({
        id: user.id,
        username: user.username,
        email: user.email,
        token,
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    console.error('Login Error:', error);
    res.status(500).json({ message: 'Server error during login' });
  }
});

// @route   GET /api/users/profile (Protected Test Route)
router.get('/profile', protect, async (req, res) => {
  res.status(200).json({
    message: "You made it past the VIP bouncer!",
    user: req.user
  });
});

export default router;