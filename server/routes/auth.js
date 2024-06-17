// server/routes/auth.js
const express = require('express');
const { admin } = require('../middleware/authMiddleware');
const router = express.Router();
const { verifyToken } = require('../controllers/authController');
const { check } = require('express-validator');
const { registerUser, loginUser, logoutUser, updateUserById,getUserById, updatePassword, addAddress, getUserAddresses,getAllUsers,deleteUserById,currentUser} = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

// Register a new user
router.post('/register', registerUser);

// Login a user
router.post('/login', loginUser);
// router.post('/generate-token', authController.generateToken); // Маршрут для создания токена

//logout accaunt
router.post('/logout', logoutUser);

// Применяем проверку токена к защищенным маршрутам
router.get('/getuserById/:id', protect,admin, getUserById);
router.get('/getAllusers', protect, getAllUsers);
router.put('/updateUserById/:id', protect, admin,updateUserById);
router.put('/updatepassword', protect, updatePassword);
router.post('/address', protect, addAddress);
router.get('/addresses', protect, getUserAddresses);
router.delete('/deleteUserById/:id', protect,admin, deleteUserById);

module.exports = router;
