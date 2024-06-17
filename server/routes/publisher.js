const express = require('express');
const router = express.Router();
const { getAllPublishers, createPublisher, getPublisherById, updatePublisher, deletePublisher } = require('../controllers/publisherController');
const { protect, admin } = require('../middleware/authMiddleware');

router.get('/getAll', getAllPublishers);
router.post('/create', protect, admin, createPublisher);
router.get('/getPublisherById/:id', getPublisherById);
router.put('/update/:id', protect, admin, updatePublisher);
router.delete('/delete/:id', protect, admin, deletePublisher);

module.exports = router;
