// server/routes/category.js
const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const { protect, admin } = require('../middleware/authMiddleware');

router.get('/getAllCategories', categoryController.getAllCategories);

router.post('/createCategory', protect, admin, categoryController.createCategory);
router.put('/updateCategory/:id', protect, admin, categoryController.updateCategory);
router.delete('/deleteCategory/:id', protect, admin, categoryController.deleteCategory);

module.exports = router;
