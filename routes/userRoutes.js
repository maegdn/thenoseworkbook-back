const express = require('express');
const router = express.Router();

const User = require('../models/User');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// const { body, validationResult } = require('express-validator');
// const auth = require('../middleware/auth');


// @route   GET api/users
// @desc    Get all users
// @access  Public
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

router.post('/', async (req, res) => {
    const { name, email, password } = req.body;
    const newUser = new User({ name, email, password });
    const saved = await newUser.save();
    res.status(201).json(saved);
  });
  

// @route   POST api/users      
// @desc    Create a user
// @access  Public

module.exports = router;