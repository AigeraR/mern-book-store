// server/controllers/subcategoryController.js
const Subcategory = require('../models/Subcategory');

exports.getAllSubcategories = async (req, res) => {
    try {
        const subcategories = await Subcategory.find();
        res.json(subcategories);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createSubcategory = async (req, res) => {
    const { name, description, category, image } = req.body;
    const newSubcategory = new Subcategory({ name, description, category, image });

    try {
        const savedSubcategory = await newSubcategory.save();
        res.status(201).json(savedSubcategory);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};