// SavedBooks.jsx
import React, { useState, useEffect } from 'react';

const SavedBooks = () => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        // Fetch saved books from API
        // Example: axios.get('/api/user/saved-books').then(response => setBooks(response.data));
    }, []);

    return (
        <div className="mt-4">
            <h2 className="text-2xl font-bold mb-4">Сохраненные книги</h2>
            <ul>
                {books.map((book, index) => (
                    <li key={index} className="border-b py-2">
                        {book.title}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default SavedBooks;
