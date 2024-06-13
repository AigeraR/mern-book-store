// server/controllers/publisherController.js
const Publisher = require('../models/Publisher');


exports.getAllPublishers = async (req, res) => {
    try {
        const publishers = await Publisher.find();
        res.status(200).json(publishers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createPublisher = async (req, res) => {
    const { name, address, phone } = req.body;
    const newPublisher = new Publisher({ name, address, phone });

    try {
        const savedPublisher = await newPublisher.save();
        res.status(201).json(savedPublisher);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

//get publisher by ID
exports.getPublisherById = async (req, res) => {
    try {
        const publisher = await Publisher.findById(req.params.id);
        if (!publisher) return res.status(404).json({ message: 'Publisher not found' });
        res.status(200).json(publisher);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};