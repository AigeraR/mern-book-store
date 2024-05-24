// server/routes/auth.js
const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/authController');

// Register a new user
router.post('/register', registerUser);

// Login a user
router.post('/login', loginUser);
// router.post('/generate-token', authController.generateToken); // Маршрут для создания токена


module.exports = router;
