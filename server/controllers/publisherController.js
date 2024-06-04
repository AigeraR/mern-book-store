// server/controllers/publisherController.js
const Publisher = require('../models/Publisher');

exports.getAllPublishers = async (req, res) => {
    try {
        const publishers = await Publisher.find();
        res.json(publishers);
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
