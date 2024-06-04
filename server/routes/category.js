// server/routes/category.js
const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const { protect, admin } = require('../middleware/authMiddleware');

// Get all categories
router.get('/all', categoryController.getAllCategories);

// Create a new category
router.post('/create', protect, admin, categoryController.createCategory);

module.exports = router;
