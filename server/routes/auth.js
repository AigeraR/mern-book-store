// server/routes/auth.js
const express = require('express');
const { admin } = require('../middleware/authMiddleware');
const router = express.Router();
const { verifyToken } = require('../controllers/authController');
const { check } = require('express-validator');
const { registerUser, loginUser, logoutUser, updateUser,getUser, updatePassword, addAddress, getUserAddresses,getAllUsers,deleteUserById,currentUser} = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

// Register a new user
router.post('/register', registerUser);

// Login a user
router.post('/login', loginUser);
// router.post('/generate-token', authController.generateToken); // Маршрут для создания токена

//logout accaunt
router.post('/logout', logoutUser);

// Применяем проверку токена к защищенным маршрутам
router.get('/getUser', protect, getUser);
router.get('/getAllusers', protect, getAllUsers);
router.put('/updateUser/:id', protect,updateUser);
router.put('/updatepassword', protect, updatePassword);
router.post('/address', protect, addAddress);
router.get('/addresses', protect, getUserAddresses);
router.delete('/deleteUserById/:id', protect,admin, deleteUserById);

module.exports = router;
