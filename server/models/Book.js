// server/models/Book.js
const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        ref: 'Author'
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    published_date: {
        type: String,
        required: true
    },
    isBestseller: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('Book', bookSchema);
