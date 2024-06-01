// server/routes/auth.js
const express = require('express');
const router = express.Router();
const { verifyToken } = require('../controllers/authController');

const { registerUser, loginUser, logoutUser, updateUser,getUser} = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

// Register a new user
router.post('/register', registerUser);

// Login a user
router.post('/login', loginUser);
// router.post('/generate-token', authController.generateToken); // Маршрут для создания токена

//logout accaunt
router.post('/logout', logoutUser);

// Применяем проверку токена к защищенным маршрутам
router.get('/getuser', protect, getUser);
router.put('/update', protect, updateUser);

module.exports = router;
