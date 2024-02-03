const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.post('/register', async (req, res) => {
  const { name, dob, nationality, education, skills, projects, workExperience, hobbies, goals } = req.body;

  try {
    const newUser = new User({ name, dob, nationality, education, skills, projects, workExperience, hobbies, goals });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(400).json({ message: 'User not found' });
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
  
      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
  
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: '1h',
      });
  
      res.status(200).json({ token });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  router.get('/me', authenticateToken, async (req, res) => {
    try {
      const user = await User.findById(req.user._id);
      res.status(200).json(user);
    } catch (error) {
      res.status(404).json({ message: 'User not found' });
    }
  });
  
  function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
  
    if (!token) {
      return res.status(401).json({ message: 'Access denied. No token provided.' });
    }
  
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return res.status(403).json({ message: 'Access denied. Invalid token.' });
      }
  
      req.user = user;
      next();
    });
  }

  router.put('/me', authenticateToken, async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'dob', 'nationality', 'education', 'skills', 'projects', 'workExperience', 'hobbies', 'goals'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));
  
    if (!isValidOperation) {
      return res.status(400).send({ error: 'Invalid updates!' });
    }
  
    try {
      const user = await User.findById(req.user._id);
  
      updates.forEach((update) => {
        user[update] = req.body[update];
      });
  
      await user.save();
      res.status(200).json({ message: 'User updated successfully' });
    } catch (error) {
      res.status(400).json({ message: error.message });
 
      
      router.put('/change-password', authenticateToken, async (req, res) => {
        const { oldPassword, newPassword } = req.body;
      
        try {
          const user = await User.findById(req.user._id);
      
          const isMatch = await bcrypt.compare(oldPassword, user.password);
      
          if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
          }
      
          user.password = await bcrypt.hash(newPassword, 10);
          await user.save();
      
          res.status(200).json({ message: 'Password changed successfully' });
        } catch (error) {
          res.status(500).json({ message: error.message });
        }
      });

      function handleNewField(key, value, user) {
        switch (key) {
          case 'education':
          case 'skills':
          case 'projects':
          case 'workExperience':
            if (!Array.isArray(value)) {
              return user;
            }
      
            user[key] = user[key] || [];
            user[key].push(value);
            break;
      
          default:
            user[key] = value;
            break;
        }
      
        return user;
      }

      router.put('/me', authenticateToken, async (req, res) => {
        const updates = Object.keys(req.body);
        const allowedUpdates = ['name', 'dob', 'nationality', 'education', 'skills', 'projects', 'workExperience', 'hobbies', 'goals', 'password'];
        const isValidOperation = updates.every((update) => allowedUpdates.includes(update));
      
        if (!isValidOperation) {
          return res.status(400).send({ error: 'Invalid updates!' });
        }
      
        try {
          const user = await User.findById(req.user._id);
      
          updates.forEach((update) => {
            user = handleNewField(update, req.body[update], user);
          });
      
          await user.save();
          res.status(200).json({ message: 'User updated successfully' });
        } catch (error) {
          res.status(400).json({ message: error.message });
        }
      });

      const { authenticateToken, authorizeRole } = require('../middlewares/auth');

router.get('/me', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: 'User not found' });
  }
});

router.put('/me', authenticateToken, authorizeRole('user'), async (req, res) => {
  
});

router.put('/me/change-password', authenticateToken, async (req, res) => {
  
});

const { authenticateToken, authorizeRole } = require('../middlewares/auth');

router.get('/me', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user_id); res.status(200).json(user); } catch (error) { res.status(404).json({ message: 'User not found' }); } });

    router.put('/me', authenticateToken, authorizeRole('user'), async (req, res) => { 

    });
    
    router.put('/me/change-password', authenticateToken, async (req, res) => {
        
     });