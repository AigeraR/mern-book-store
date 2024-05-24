// server/controllers/bookController.js
const Book = require('../models/Book');
const Author = require('../models/Author');

// Get all books
exports.getAllBooks = async (req, res) => {
    try {
        const books = await Book.find();
        res.json(books);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Create a new book
exports.createBook = async (req, res) => {
    const { title, author, description, price, quantity, category, image, published_date, isBestseller } = req.body;
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

        // Создаем новую книгу и связываем ее с автором
        const newBook = new Book({
            title,
            author, // Используем ID автора для связи
            description,
            price,
            quantity,
            category,
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
//update one book by id
exports.updateBook = async (req, res) => {
    try {
        const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedBook);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

//delete one book by id
exports.deleteBook = async (req, res) => {
    try {
        const deletedBook = await Book.findByIdAndDelete(req.params.id);
        res.json(deletedBook);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

//delete all books
exports.deleteAllBooks = async (req, res) => {
    try {
        const deletedBooks = await Book.deleteMany();
        res.json(deletedBooks);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }

}

//get one book by id
exports.getBookById = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        res.json(book);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

//bestseller books
exports.getBestsellerBooks = async (req, res) => {
    try {
        const books = await Book.find({ isBestseller: true });
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//get books by category
exports.getBooksByCategory = async (req, res) => {
    try {
        const books = await Book.find({ category: req.params.category });
        res.json(books);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};