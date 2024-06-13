const express = require('express');
const router = express.Router();
const { getAllPublishers, createPublisher,getPublisherById } = require('../controllers/publisherController');
const { protect, admin } = require('../middleware/authMiddleware');

router.get('/getAll', getAllPublishers);
router.post('/create',protect, admin, createPublisher);
router.get('/getPublisherById/:id', getPublisherById);

module.exports = router;
