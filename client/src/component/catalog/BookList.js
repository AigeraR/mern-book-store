import React from 'react';
import axios from 'axios';
import BookCard from './BookCard';

const BookList = ({ books, selectedCategory, sortOption }) => {
    // Функция для сортировки книг по выбранному критерию
    const sortBooks = (books, sortOption) => {
        switch (sortOption) {
            case 'popular':
                return books.sort((a, b) => b.popularity - a.popularity);
            case 'cheap':
                return books.sort((a, b) => a.price - b.price);
            case 'bestseller':
                return books.filter(book => book.isBestseller);
            default:
                return books;
        }
    };


    const sortedBooks = sortBooks(books, sortOption);

    return (
        <div className="p-4">
            {/* <h1 className="text-2xl font-bold mb-4">{selectedCategory ? `Книги по категории: ${selectedCategory}` : 'Все книги'}</h1> */}
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 gap-6">
                {sortedBooks.map((book) => (
                    <BookCard key={book._id} book={book} />
                ))}
            </div>
        </div>
    );
};

export default BookList;