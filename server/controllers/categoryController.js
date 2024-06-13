
// server/controllers/categoryController.js
const Category = require('../models/Category');

exports.getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.json(categories);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createCategory = async (req, res) => {
    const { name, description, image } = req.body;
    const newCategory = new Category({ name, description, image });

    try {
        const savedCategory = await newCategory.save();
        res.status(201).json(savedCategory);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.updateCategory = async (req, res) => {
    try {
      const category = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.status(200).json(category);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
  
  // Delete a category
  exports.deleteCategory = async (req, res) => {
    try {
      await Category.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: 'Category deleted' });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };

