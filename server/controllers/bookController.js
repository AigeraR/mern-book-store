// server/controllers/bookController.js
const Book = require('../models/Book');
const Author = require('../models/Author');
const Category = require('../models/Category');
const Subcategory = require('../models/Subcategory');
const Publisher = require('../models/Publisher');
const Order = require('../models/Order');
// Get all books
exports.getAllBooks = async (req, res) => {
    try {
        const books = await Book.find().populate('author').populate('category').populate('subcategory').populate('publisher');
        res.json(books);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Create a new book
exports.createBook = async (req, res) => {
    const { title, author, description, price, quantity, category, subcategory, publisher, image, published_date, isBestseller } = req.body;
    try {
        // Проверяем, существует ли автор с таким именем
        let authorData = await Author.findOne({ name: author });

        // Если автор с таким именем не существует, создаем нового автора
        if (!authorData) {
            authorData = new Author({
                name: author,
                bio: 'Bio not available', // Вы можете добавить здесь дополнительные данные для нового автора
                birthdate: new Date(),
                img: 'https://example.com/default-image.jpg', // URL изображения по умолчанию
                books: [] // Пока у автора нет книг
            });
            await authorData.save();
        }

        // Проверяем, существует ли категория
        const categoryData = await Category.findById(category);
        if (!categoryData) {
            return res.status(400).json({ message: 'Invalid category ID' });
        }

        // Проверяем, существует ли подкатегория
        let subcategoryData = null;
        if (subcategory) {
            subcategoryData = await Subcategory.findById(subcategory);
            if (!subcategoryData) {
                return res.status(400).json({ message: 'Invalid subcategory ID' });
            }
        }

        // Проверяем, существует ли издатель
        const publisherData = await Publisher.findById(publisher);
        if (!publisherData) {
            return res.status(400).json({ message: 'Invalid publisher ID' });
        }

        // Создаем новую книгу и связываем ее с автором, категорией, подкатегорией (если она указана) и издателем
        const newBook = new Book({
            title,
            author: authorData._id,
            description,
            price,
            quantity,
            category: categoryData._id,
            subcategory: subcategoryData ? subcategoryData._id : null,
            publisher: publisherData._id,
            image,
            published_date,
            isBestseller
        });
        const savedBook = await newBook.save();

        // Обновляем массив books у автора, добавляя ID новой книги
        await Author.findByIdAndUpdate(
            authorData._id,
            { $push: { books: savedBook._id } },
            { new: true }
        );

        res.status(201).json(savedBook);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update a book
exports.updateBook = async (req, res) => {
    try {
        const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate('author').populate('category').populate('subcategory').populate('publisher');
        res.json(updatedBook);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Delete a book
exports.deleteBook = async (req, res) => {
    try {
        const deletedBook = await Book.findByIdAndDelete(req.params.id);
        res.json(deletedBook);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Delete all books
exports.deleteAllBooks = async (req, res) => {
    try {
        const deletedBooks = await Book.deleteMany();
        res.json(deletedBooks);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get a single book
exports.getBookById = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id).populate('author').populate('category').populate('subcategory').populate('publisher');
        res.json(book);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Bestseller books
exports.getBestsellerBooks = async (req, res) => {
    try {
        const books = await Book.find({ isBestseller: true }).populate('author').populate('category').populate('subcategory').populate('publisher');
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get books by category
exports.getBooksByCategory = async (req, res) => {
    try {
        const books = await Book.find({ category: req.params.category }).populate('author').populate('category').populate('subcategory').populate('publisher');
        res.json(books);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get books by subcategory
exports.getBooksBySubcategory = async (req, res) => {
    try {
        const books = await Book.find({ subcategory: req.params.subcategory }).populate('author').populate('category').populate('subcategory').populate('publisher');
        res.json(books);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// // Get books by publisher
// exports.getBooksByPublisher = async (req, res) => {
//     try {
//         const books = await Book.find({ publisher: req.params.publisher }).populate('author').populate('category').populate('subcategory').populate('publisher');
//         res.json(books);
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// };

exports.getBooksByCategoryId = async (req, res) => {
    try {
        const books = await Book.find({ category: req.params.categoryId }).populate('author').populate('category').populate('subcategory').populate('publisher');
        res.json(books);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

exports.getBooksBySubcategoryId = async (req, res) => {
    try {
        const books = await Book.find({ subcategory: req.params.subcategoryId }).populate('author').populate('category').populate('subcategory').populate('publisher');
        res.json(books);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
exports.getBooksByAuthor = async (req, res) => {
    const authorName = req.params.authorName;
    try {
      const books = await Book.find({ 'author.name': { $regex: new RegExp(authorName, 'i') } });
      res.json(books);
    } catch (error) {
      res.status(500).json({ message: 'Server Error' });
    }
  };
  
  // Получение книг по частичному совпадению названия
  exports.searchBooksByName = async (req, res) => {
    const name = req.params.name;
    try {
      const books = await Book.find({ title: { $regex: new RegExp(name, 'i') } });
      res.json(books);
    } catch (error) {
      res.status(500).json({ message: 'Server Error' });
    }
  };
  
  // Получение книг по издательству
  exports.getBooksByPublisher = async (req, res) => {
    const publisherName = req.params.publisherName;
    try {
      const books = await Book.find({ publisher: { $regex: new RegExp(publisherName, 'i') } });
      res.json(books);
    } catch (error) {
      res.status(500).json({ message: 'Server Error' });
    }
  };

// Get similar books by book id
exports.getSimilarBooks = async (req, res) => {
    try {
        const books = await Book.find({ _id: { $ne: req.params.id } }).limit(4).populate('author').populate('category').populate('subcategory').populate('publisher');
        res.json(books);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


