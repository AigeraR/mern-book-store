import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaAngleDown, FaAngleUp, FaEdit, FaPlus } from 'react-icons/fa';
import { RiDeleteBin6Line } from 'react-icons/ri';
import AddAuthor from './AddAuthor';

const Authors = () => {
    const [authors, setAuthors] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredAuthors, setFilteredAuthors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editAuthor, setEditAuthor] = useState(null);
    const [expandedBio, setExpandedBio] = useState(null);
    const [showAll, setShowAll] = useState(false); 


    useEffect(() => {
        const fetchAuthors = async () => {
            try {
                const response = await axios.get('https://mern-book-store-pg5d.onrender.com/api/author/getAuthors');
                setAuthors(response.data);
                setFilteredAuthors(response.data);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };
        fetchAuthors();
    }, []);

    const deleteAuthor = async (id) => {
        try {
            const token = localStorage.getItem('token');
            const config = { headers: { Authorization: `Bearer ${token}` } };
            await axios.delete(`https://mern-book-store-pg5d.onrender.com/api/author/deleteAuthorByID/${id}`, config);
            setAuthors(authors.filter((author) => author._id !== id));
            setFilteredAuthors(filteredAuthors.filter((author) => author._id !== id));
        } catch (error) {
            console.error(error);
        }
    };

    const handleEditAuthor = (author) => {
        setEditAuthor(author);
    };

    const handleUpdateAuthor = async (id, updatedAuthor) => {
        try {
            const token = localStorage.getItem('token');
            const config = { headers: { Authorization: `Bearer ${token}` } };
            const response = await axios.put(`https://mern-book-store-pg5d.onrender.com/api/author/updateAuthorByID/${id}`, updatedAuthor, config);
            const updatedAuthors = authors.map((author) => (author._id === id ? response.data : author));
            setAuthors(updatedAuthors);
            setFilteredAuthors(updatedAuthors);
            setEditAuthor(null);
        } catch (error) {
            console.error(error);
        }
    };

    const handleAddAuthor = (newAuthor) => {
        setAuthors([...authors, newAuthor]);
        setFilteredAuthors([...filteredAuthors, newAuthor]);
    };

    const handleCancelEdit = () => {
        setEditAuthor(null);
    };

    const handleSearch = (e) => {
        const searchTerm = e.target.value.toLowerCase();
        setSearchTerm(searchTerm);
        setFilteredAuthors(authors.filter((author) => author.name.toLowerCase().includes(searchTerm)));
    };

    const handleToggleBio = (authorId) => {
        setExpandedBio(prevId => prevId === authorId ? null : authorId);
    }
    const handleShowAllToggle = () => { 
        setShowAll(prevShowAll => !prevShowAll);
    }
    if (loading) return <div>Загрузка...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="container mx-auto p-4 text-sm">
            <h2 className="text-3xl font-semibold mb-6">Авторы</h2>
            <div className="shadow-md mb-6 p-4">
                <h3 className="text-xl font-bold mb-4">Поиск</h3>
                <input
                    type="text"
                    placeholder="Поиск..."
                    value={searchTerm}
                    onChange={handleSearch}
                    className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-200 sm:text-sm sm:leading-6"
                />
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                        <tr>
                            <th className="px-3 py-2 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">№</th>
                            <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Имя</th>
                            <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Биография</th>
                            <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Изображение</th>
                            <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Действия</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {(showAll ? filteredAuthors : filteredAuthors.slice(0, 5)).map((author, index) => (
                            <tr key={author._id}>
                                <td className="px-3 py-2 whitespace-nowrap text-xs">{index + 1}</td>
                                <td className="px-3 py-2 whitespace-nowrap text-xs">{author.name}</td>
                                <td className="px-3 py-2 whitespace-wrap text-xs">
                                    {expandedBio === author._id ? author.bio : `${author.bio.slice(0, 20)}...`}
                                    <button onClick={() => handleToggleBio(author._id)} className="ml-2 text-blue-500">
                                        {expandedBio === author._id ? 'Скрыть' : 'Подробнее'}
                                    </button>
                                </td>
                                <td className="px-3 py-2 whitespace-nowrap text-sm">
                                    <img src={author.img} alt={author.name} className="w-10 h-10 object-cover" />
                                </td>
                                <td className="px-2 py-2 whitespace-nowrap text-sm justify-center space-x-2">
                                    <button onClick={() => deleteAuthor(author._id)} className="bg-red-500 text-white p-1.5 rounded-lg"><RiDeleteBin6Line className='h-4 w-4' /></button>
                                    <button onClick={() => handleEditAuthor(author)} className="bg-green-500 text-white p-1.5 rounded-lg mr-2"><FaEdit className='h-4 w-4' /></button>
                                </td>
                            </tr>       
                        ))}
                    </tbody>
                </table>
                <div className="flex justify-start mt-4">
                    <button onClick={handleShowAllToggle} className="bg-blue-500 text-white p-2 rounded-lg">
                        {showAll ? 'Показать меньше' : 'Показать все'}
                    </button>
                </div>
            </div>
            {editAuthor ? (
                <div className="bg-white p-6 rounded-lg shadow-md mt-6">
                    <h3 className="text-xl font-bold mb-4">Редактировать автора</h3>
                    <form onSubmit={(e) => { e.preventDefault(); handleUpdateAuthor(editAuthor._id, editAuthor); }}>
                        <input
                            type="text"
                            value={editAuthor.name}
                            onChange={(e) => setEditAuthor({ ...editAuthor, name: e.target.value })}
                            placeholder="Имя"
                            className="border p-2 mb-2 w-full"
                        />
                        <textarea
                            value={editAuthor.bio}
                            onChange={(e) => setEditAuthor({ ...editAuthor, bio: e.target.value })}
                            placeholder="Биография"
                            className="border p-2 mb-2 w-full"
                        />
                        <input
                            type="text"
                            value={editAuthor.image}
                            onChange={(e) => setEditAuthor({ ...editAuthor, image: e.target.value })}
                            placeholder="Ссылка на изображение"
                            className="border p-2 mb-2 w-full"
                        />
                        <button type="submit" className="bg-green-500 text-white p-2 rounded-lg">Сохранить изменения</button>
                        <button type="button" onClick={handleCancelEdit} className="bg-red-500 text-white p-2 rounded-lg ml-2">Отмена</button>
                    </form>
                </div>
            ) : (
                <div className="flex justify-start mt-4">
                    <AddAuthor handleAddAuthor={handleAddAuthor} />
                </div>
            )}
        </div>
    );
};

export default Authors;
