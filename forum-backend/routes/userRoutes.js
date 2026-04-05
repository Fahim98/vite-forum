// routes/userRoutes.js
import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const router = express.Router();

// @route   POST /api/users/register
// @desc    Register a new user
router.post('/register', async (req, res) => {
  try {
    // destructure the data sent from the React frontend
    const { username, email, password } = req.body;

    // check if a user with this email or username already exists
    const userExists = await User.findOne({ 
      $or: [{ email }, { username }] 
    });

    if (userExists) {
      return res.status(400).json({ message: 'User with that email or username already exists!' });
    }

    // create the new user in the database
    const user = await User.create({
      username,
      email,
      password
    });

    // generate a JWT token so the user is instantly logged in
    const token = jwt.sign(
      { id: user._id }, 
      process.env.JWT_SECRET, 
      { expiresIn: '30d' } // token expiry time: 30 days
    );

    // send back the success response with the token
    res.status(201).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      token: token
    });

  } catch (error) {
    console.error('Registration Error:', error);
    res.status(500).json({ message: 'Server error during registration' });
  }
});

// @route   POST /api/users/login
// @desc    Authenticate user & get token
router.post('/login', async(req,res) => {
    try{
        const{email, password} = req.body;

        const user = await User.findOne({ email });

        if (user &&(await user.matchPassword(password))){
            const token = jwt.sign(
                {id: user._id},
                process.env.JWT_SECRET,
                {expiresIn:'30d'}
            );

            res.json({
                _id: user._id,
                username: user.username,
                email: user.email,
                token: token
            });
        } else {
            res.status(401).json({message:'Invalid email or password'});
        }
    } catch(error) {
        console.error('Login error', error);
        res.status(500).json({message: 'Server error during login'});
    }
});

export default router;