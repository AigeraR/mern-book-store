import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CategoryMenu from './CategoryMenu';
import SortOptions from './SortOptions';
import BookList from './BookList';
import Header from '../header/Header';
import Breadcrumbs from '../Breadcrumbs';
import { useParams } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';

const CatalogPage = () => {
    const [categories, setCategories] = useState([]);
    const [books, setBooks] = useState([]);
    const { categoryId, subcategoryId } = useParams();
    const [sortOption, setSortOption] = useState('default');
    const [selectedAuthors, setSelectedAuthors] = useState([]);
    const [selectedPublishers, setSelectedPublishers] = useState([]);
    const [priceRange, setPriceRange] = useState([0, 2000]); // Default price range

    useEffect(() => {
        axios.get('http://localhost:5000/api/category/getAllCategories')
            .then(response => {
                setCategories(response.data);
            })
            .catch(error => {
                console.error('Error fetching categories:', error);
            });
    }, []);

    useEffect(() => {
        let url = 'http://localhost:5000/api/books/allBook';
        if (subcategoryId) {
            url = `http://localhost:5000/api/books/subcategory/${subcategoryId}`;
        } else if (categoryId) {
            url = `http://localhost:5000/api/books/category/${categoryId}`;
        }

        axios.get(url)
            .then(response => {
                let filteredBooks = response.data;
                if (selectedAuthors.length > 0) {
                    filteredBooks = filteredBooks.filter(book => selectedAuthors.includes(book.author._id));
                }
                if (selectedPublishers.length > 0) {
                    filteredBooks = filteredBooks.filter(book => selectedPublishers.includes(book.publisher._id));
                }
                filteredBooks = filteredBooks.filter(book => book.price >= priceRange[0] && book.price <= priceRange[1]);
                setBooks(filteredBooks);
            })
            .catch(error => {
                console.error('Error fetching books:', error);
            });
    }, [categoryId, subcategoryId, selectedAuthors, selectedPublishers, priceRange]);

    const isMobile = useMediaQuery({ maxWidth: 768 });

    return (
        <>
            <Header />
            {!isMobile && <Breadcrumbs />}
            <div className="flex flex-col md:flex-row min-h-screen">
                {!isMobile && <CategoryMenu
                    categories={categories}
                    selectedAuthors={selectedAuthors}
                    setSelectedAuthors={setSelectedAuthors}
                    selectedPublishers={selectedPublishers}
                    setSelectedPublishers={setSelectedPublishers}
                    priceRange={priceRange}
                    setPriceRange={setPriceRange}
                />}
                <div className="flex-1 p-6">
                    <SortOptions sortOption={sortOption} onSortChange={setSortOption} />
                    <BookList books={books} sortOption={sortOption} />
                </div>
            </div>
        </>
    );
};

export default CatalogPage;
