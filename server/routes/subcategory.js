// server/routes/subcategory.js
const express = require('express');
const router = express.Router();
const subcategoryController = require('../controllers/subcategoryController');
const { protect, admin } = require('../middleware/authMiddleware');

// Get all subcategories
router.get('/all', subcategoryController.getAllSubcategories);

// Create a new subcategory
router.post('/create', protect, admin, subcategoryController.createSubcategory);

module.exports = router;