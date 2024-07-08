// server/controllers/categoryController.js
const Category = require('../models/Category');
const Subcategory = require('../models/Subcategory');
const Book = require('../models/Book');

exports.getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find().populate('subcategories');
        res.json(categories);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createCategory = async (req, res) => {
    const { name, description, image, subcategories } = req.body;
    const newCategory = new Category({ name, description, image, subcategories });

    try {
        const savedCategory = await newCategory.save();
        res.status(201).json(savedCategory);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.updateCategory = async (req, res) => {
    try {
        const category = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate('subcategories');
        res.status(200).json(category);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// exports.deleteCategory = async (req, res) => {
//     try {
//         await Category.findByIdAndDelete(req.params.id);
//         res.status(200).json({ message: 'Category deleted' });
//     } catch (error) {
//         res.status(400).json({ message: error.message });
//     }
// };
//delete category by id and all subcategories and books associated with it
// Удаление категории по ID вместе с подкатегориями и книгами
exports.deleteCategory = async (req, res) => {
    try {
      const category = await Category.findById(req.params.id);
      if (!category) {
        return res.status(404).json({ message: 'Category not found' });
      }
      await Subcategory.deleteMany({ category: category._id});
      await Book.deleteMany({ category: category._id });
      await Category.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: 'Category deleted' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
  

//get subcategoryArray from categoryId

exports.getSubcategoryArray = async (req, res) => {
    try {
        const categoryId = req.params.id;
        const category = await Category.findById(categoryId).populate('subcategories');

        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }

        res.json(category.subcategories);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

