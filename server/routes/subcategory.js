// server/routes/subcategory.js
const express = require('express');
const router = express.Router();
const subcategoryController = require('../controllers/subcategoryController');
const { protect, admin } = require('../middleware/authMiddleware');

// Get all subcategories
router.get('/getAll', subcategoryController.getAllSubcategories);

// Create a new subcategory
router.post('/create', protect, admin, subcategoryController.createSubcategory);

//edit
router.put('/update/:id', protect, admin, subcategoryController.updateSubcategory);

//delete
router.delete('/delete/:id', protect, admin, subcategoryController.deleteSubcategory);

module.exports = router;