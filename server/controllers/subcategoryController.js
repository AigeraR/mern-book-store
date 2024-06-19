// server/controllers/subcategoryController.js
const Subcategory = require('../models/Subcategory');
const Category = require('../models/Category');

exports.getAllSubcategories = async (req, res) => {
    try {
        const subcategories = await Subcategory.find().populate('category');
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
        await Category.findByIdAndUpdate(category, { $push: { subcategories: savedSubcategory._id } });
        res.status(201).json(savedSubcategory);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteSubcategory = async (req, res) => {
    try {
        const deletedSubcategory = await Subcategory.findByIdAndDelete(req.params.id);
        if (deletedSubcategory) {
            await Category.findByIdAndUpdate(deletedSubcategory.category, { $pull: { subcategories: deletedSubcategory._id } });
        }
        res.json(deletedSubcategory);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.updateSubcategory = async (req, res) => {
    try {
        const updatedSubcategory = await Subcategory.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate('category');
        res.json(updatedSubcategory);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};
exports.getSubcategoryById = async (req, res) => {
    try {
        const subcategory = await Subcategory.findById(req.params.id).populate('category');
        res.json(subcategory);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}