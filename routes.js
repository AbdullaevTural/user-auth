const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('./models/User');

// Register route
router.post('/register', async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = new User({
      username: req.body.username,
      password: hashedPassword
    });
    await user.save();
    res.send('User registered successfully');
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Login route
router.post('/login', async (req, res) => {
  const user = await User.findOne({ username: req.body.username });

  if (!user) {
    return res.status(400).send('User not found');
  }

  const validPassword = await bcrypt.compare(req.body.password, user.password);

  if (!validPassword) {
    return res.status(400).send('Invalid password');
  }

  req.session.user = user;
  res.send('Login successful');
});

// Logout route
router.post('/logout', (req, res) => {
  req.session.destroy();
  res.send('Logout successful');
});

module.exports = router;
