// server/routes/author.js
const express = require('express');
const router = express.Router();
const authorController = require('../controllers/authorController');
const { protect, admin } = require('../middleware/authMiddleware');

// Get all authors
router.get('/getAuthors', authorController.getAllAuthors);

// Create a new author
router.post('/create', protect, admin, authorController.createAuthor);

// Get a single author by ID
router.get('/getAuthorById/:id', authorController.getAuthorById);

// Update an author by ID
router.put('/updateAuthorByID/:id', protect, admin, authorController.updateAuthor);

// Delete an author by ID
router.delete('/deleteAuthorByID/:id', protect, admin, authorController.deleteAuthor);

module.exports = router;
