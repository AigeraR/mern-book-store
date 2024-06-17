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
    const { name, logoUrl } = req.body;
    const newPublisher = new Publisher({ name, logoUrl });

    try {
        const savedPublisher = await newPublisher.save();
        res.status(201).json(savedPublisher);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getPublisherById = async (req, res) => {
    try {
        const publisher = await Publisher.findById(req.params.id);
        if (!publisher) return res.status(404).json({ message: 'Publisher not found' });
        res.status(200).json(publisher);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updatePublisher = async (req, res) => {
    try {
        const updatedPublisher = await Publisher.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updatedPublisher);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deletePublisher = async (req, res) => {
    try {
        await Publisher.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Publisher deleted' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
