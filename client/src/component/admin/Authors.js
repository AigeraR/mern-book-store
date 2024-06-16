import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaEdit, FaPlus } from 'react-icons/fa';
import { RiDeleteBin6Line } from 'react-icons/ri';
import AddAuthor from './AddAuthor';

const Authors = () => {
    const [authors, setAuthors] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredAuthors, setFilteredAuthors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editAuthor, setEditAuthor] = useState(null);
    

    useEffect(() => {
        const fetchAuthors = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/author/getAuthors');
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
            await axios.delete(`http://localhost:5000/api/author/deleteAuthor/${id}`);
            setAuthors(authors.filter((author) => author._id !== id));
        } catch (error) {
            console.error(error);
        }
    };

    const handleEditAuthor = (author) => {
        setEditAuthor(author);
    };

    const handleUpdateAuthor = async (id, updatedAuthor) => {
        try {
            const response = await axios.put(`http://localhost:5000/api/author/updateAuthor/${id}`, updatedAuthor);
            setAuthors(authors.map((author) => (author._id === id ? response.data : author)));
            setEditAuthor(null);
        } catch (error) {
            console.error(error);
        }
    };

    const handleCancelEdit = () => {
        setEditAuthor(null);
    };

    const handleSearch = (e) => {
        const searchTerm = e.target.value.toLowerCase();
        setSearchTerm(searchTerm);
        setFilteredAuthors(authors.filter((author) => author.name.toLowerCase().includes(searchTerm)));
    };

    if (loading) return <div>Loading...</div>;
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
                    className="border p-2 mb-2 rounded-sm"
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
                        {filteredAuthors.map((author, index) => (
                            <tr key={author._id}>
                                <td className="px-3 py-2 whitespace-nowrap text-xs">{index + 1}</td>
                                <td className="px-3 py-2 whitespace-nowrap text-xs">{author.name}</td>
                                <td className="px-3 py-2 whitespace-wrap text-xs">{author.bio}</td>
                                <td className="px-3 py-2 whitespace-nowrap text-sm">
                                    <img src={author.image} alt={author.name} className="w-16 h-16 object-cover" />
                                </td>
                                <td className="px-2 py-2 whitespace-nowrap text-sm justify-center space-x-2">
                                    <button onClick={() => deleteAuthor(author._id)} className="bg-red-500 text-white p-1.5 rounded-lg"><RiDeleteBin6Line className='h-4 w-4' /></button>
                                    <button onClick={() => handleEditAuthor(author)} className="bg-green-500 text-white p-1.5 rounded-lg mr-2"><FaEdit className='h-4 w-4' /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
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
                <div className="flex justify-end mt-4">
                    <AddAuthor />
                </div>
            )}
        </div>
    );
};

export default Authors;
