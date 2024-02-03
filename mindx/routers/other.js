const express = require('express');
const router = express.Router();
const { authenticateToken, authorizeRole } = require('../middlewares/auth');

router.get('/other', authenticateToken, authorizeRole('admin'), (req, res) => {
  res.status(200).json({ message: 'Access granted to admin' });
});

module.exports = router;

const userRoutes = require('./routes/user');
const otherRoutes = require('./routes/other');

app.use('/api/users', userRoutes);
app.use('/api/other', otherRoutes);