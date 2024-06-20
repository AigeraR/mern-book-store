import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddBook = ({ fetchBooks }) => {
  const [newBook, setNewBook] = useState({
    title: '',
    author: '',
    description: '',
    price: '',
    quantity: '',
    category: '',
    subcategory: '',
    image: '',
    published_date: '',
    publisher: '',
    isBestseller: false
  });
  const [authors, setAuthors] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [publishers, setPublishers] = useState([]);
  const [showAddBookForm, setShowAddBookForm] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    fetchAuthors();
    fetchCategories();
    fetchSubcategories();
    fetchPublishers();
  }, []);

  const fetchPublishers = async () => {
    const response = await axios.get('http://localhost:5000/api/publisher/getAll');
    setPublishers(response.data);
  };

  const fetchAuthors = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/author/getAuthors');
      setAuthors(response.data);
    } catch (error) {
      console.error('Error fetching authors:', error);
    }
  };

  const fetchCategories = async () => {
    const response = await axios.get('http://localhost:5000/api/category/getAllCategories');
    setCategories(response.data);
  };

  const fetchSubcategories = async () => {
    const response = await axios.get(`http://localhost:5000/api/subcategory/getAll`);
    setSubcategories(response.data);
  };

  const loadSubcategories = async (categoryId) => {
    try {
      const token = localStorage.getItem('token');
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const response = await axios.get(`http://localhost:5000/api/category/getSubcategoryArray/${categoryId}`, config);
      setSubcategories(response.data);
    } catch (error) {
      console.error('Error fetching subcategories:', error);
    }
  };

  const handleAddBook = async () => {
    try {
      const token = localStorage.getItem('token');
      const config = { headers: { Authorization: `Bearer ${token}` } };
      await axios.post('http://localhost:5000/api/books/addBook', newBook, config);

      setNewBook({
        title: '',
        author: '',
        description: '',
        price: '',
        quantity: '',
        category: '',
        subcategory: '',
        image: '',
        published_date: '',
        publisher: '',
        isBestseller: false
      });
      fetchBooks();
      setShowAddBookForm(false);
      setSuccessMessage('Книга успешно добавлена!');
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
    } catch (error) {
      console.error('Error adding book:', error);
    }
  };

  const handleCategoryChange = async (e) => {
    const categoryId = e.target.value;
    setNewBook({ ...newBook, category: categoryId, subcategory: '' });
    if (categoryId) {
      await loadSubcategories(categoryId);
    } else {
      setSubcategories([]);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h3 className="text-md font-bold mb-4">Добавить книгу</h3>
      <button onClick={() => setShowAddBookForm(!showAddBookForm)} className="bg-blue-500 text-white p-2 rounded-lg mb-4">
        {showAddBookForm ? 'Отменить' : 'Добавить книгу'}
      </button>
      {showAddBookForm && (
        <div>
          <input type="text" placeholder="Название" value={newBook.title} onChange={(e) => setNewBook({ ...newBook, title: e.target.value })} className="border p-2 mb-2" />
          <select value={newBook.author} onChange={(e) => setNewBook({ ...newBook, author: e.target.value })} className="border p-2 mb-2">
            <option value="">Выберите автора</option>
            {authors.map(author => (
              <option key={author.name} value={author.name}>{author.name}</option>
            ))}
          </select>
          <input type="text" placeholder="Описание" value={newBook.description} onChange={(e) => setNewBook({ ...newBook, description: e.target.value })} className="border p-2 mb-2" />
          <input type="number" placeholder="Цена" value={newBook.price} onChange={(e) => setNewBook({ ...newBook, price: parseFloat(e.target.value) })} className="border p-2 mb-2" />
          <input type="number" placeholder="Количество" value={newBook.quantity} onChange={(e) => setNewBook({ ...newBook, quantity: parseInt(e.target.value) })} className="border p-2 mb-2" />
          <select value={newBook.category} onChange={handleCategoryChange} className="border p-2 mb-2">
            <option value="">Выберите категорию</option>
            {categories.map(category => (
              <option key={category._id} value={category._id}>{category.name}</option>
            ))}
          </select>
          <select value={newBook.subcategory} onChange={(e) => setNewBook({ ...newBook, subcategory: e.target.value })} className="border p-2 mb-2">
            <option value="">Выберите подкатегорию</option>
            {subcategories.map(subcategory => (
              <option key={subcategory._id} value={subcategory._id}>{subcategory.name}</option>
            ))}
          </select>
          <input type="text" placeholder="Изображение" value={newBook.image} onChange={(e) => setNewBook({ ...newBook, image: e.target.value })} className="border p-2 mb-2" />
          <input type="text" placeholder="Дата публикации" value={newBook.published_date} onChange={(e) => setNewBook({ ...newBook, published_date: e.target.value })} className="border p-2 mb-2" />
          <select value={newBook.publisher} onChange={(e) => setNewBook({ ...newBook, publisher: e.target.value })} className="border p-2 mb-2">
            <option value="">Выберите издателя</option>
            {publishers.map(publisher => (
              <option key={publisher._id} value={publisher._id}>{publisher.name}</option>
            ))}
          </select>
          <div className="flex items-center mb-2">
            <input type="checkbox" checked={newBook.isBestseller} onChange={(e) => setNewBook({ ...newBook, isBestseller: e.target.checked })} className="mr-2" />
            <label>Бестселлер</label>
          </div>
          <button onClick={handleAddBook} className="bg-blue-500 text-white p-3 rounded-lg font-semibold mt-4">Добавить</button>
        </div>
      )}
      {successMessage && <div className="mt-4 text-green-500">{successMessage}</div>}
    </div>
  );
}

export default AddBook;
