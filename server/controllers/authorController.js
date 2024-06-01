// server/controllers/authorController.js
const Author = require('../models/Author');
const Book = require('../models/Book');

// Get all authors
exports.getAllAuthors = async (req, res) => {
    try {
        const authors = await Author.find().populate('books');
        res.status(200).json(authors);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Создание автора или получение существующего по имени
exports.createAuthor = async (req, res) => {
    const { name, bio, birthdate, img } = req.body;

    try {
        // Проверяем наличие автора с указанным именем
        let author = await Author.findOne({ name });

        // Если автор существует, возвращаем его данные
        if (author) {
            return res.status(200).json(author);
        }

        // Если автора нет, создаем нового
        author = new Author({
            name,
            bio,
            birthdate,
            img
        });

        const savedAuthor = await author.save();
        res.status(201).json(savedAuthor);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};


// Get author by ID
exports.getAuthorById = async (req, res) => {
    try {
        const author = await Author.findById(req.params.id).populate('books');
        if (!author) return res.status(404).json({ message: 'Author not found' });
        res.status(200).json(author);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update author by ID
exports.updateAuthor = async (req, res) => {
    const { name, bio, birthdate, img, books } = req.body;
    try {
        const updatedAuthor = await Author.findByIdAndUpdate(
            req.params.id,
            { name, bio, birthdate, img, books },
            { new: true }
        );
        if (!updatedAuthor) return res.status(404).json({ message: 'Author not found' });
        res.status(200).json(updatedAuthor);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete author by ID
exports.deleteAuthor = async (req, res) => {
    try {
        const deletedAuthor = await Author.findByIdAndDelete(req.params.id);
        if (!deletedAuthor) return res.status(404).json({ message: 'Author not found' });
        res.status(200).json({ message: 'Author deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
