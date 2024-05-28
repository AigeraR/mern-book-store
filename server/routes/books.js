// server/routes/books.js
const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const { protect, admin } = require('../middleware/authMiddleware');

// Get all books
router.get('/allBook', bookController.getAllBooks);

// Create a new book
router.post('/addBook',protect, admin, bookController.createBook);

// Update a book
router.put('/update/:id',protect, admin, bookController.updateBook);

// Delete a book
router.delete('/delete/:id',protect, admin, bookController.deleteBook);

//delete all books
router.delete('/deleteAll',protect, admin, bookController.deleteAllBooks);

// Get a single book
router.get('/getBookById/:id', bookController.getBookById);

//Get by category
router.get('/category/:category', bookController.getBooksByCategory);

//best seller
router.get('/bestsellers', bookController.getBestsellerBooks);

// Get books by publisher
router.get('/publisher/:publisherName', bookController.getBooksByPublisher);


module.exports = router;
