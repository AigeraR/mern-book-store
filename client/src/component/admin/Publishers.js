import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";

const Publishers = () => {
    const [publishers, setPublishers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [editingPublisher, setEditingPublisher] = useState(null);
    const [newPublisher, setNewPublisher] = useState({ name: '', logoUrl: '' });
    const [showForm, setShowForm] = useState(false);
    const [message, setMessage] = useState(null);

    useEffect(() => {
        fetchPublishers();
    }, []);

    const fetchPublishers = async () => {
        const response = await axios.get('https://mern-book-store-pg5d.onrender.com/api/publisher/getAll');
        setPublishers(response.data);
    };

    const handleAddPublisher = async (e) => {
        e.preventDefault();
        const trimmedName = newPublisher.name.trim();
        const trimmedLogoUrl = newPublisher.logoUrl.trim();
    
        // Проверка на пустые поля после удаления пробелов
        if (!trimmedName || !trimmedLogoUrl) {
            alert('Пожалуйста, заполните все поля.');
            return;
        }
        if (publishers.some(publisher => publisher.name === newPublisher.name) && publishers.some(publisher => publisher.logoUrl === newPublisher.logoUrl) ) {
            setMessage({ type: 'error', text: 'Такой издатель уже существует!' });
            return;
        }

        try {
            const token = localStorage.getItem('token');
            const config = { headers: { Authorization: `Bearer ${token}` } };
            await axios.post(`https://mern-book-store-pg5d.onrender.com/api/publisher/create`, newPublisher, config);
            fetchPublishers();
            setNewPublisher({ name: '', logoUrl: '' });
            setShowForm(false);
            setMessage({ type: 'success', text: 'Издатель успешно добавлен!' });
        } catch (error) {
            console.log(error);
            setMessage({ type: 'error', text: 'Ошибка при добавлении издателя!' });
        }
    };

    const handleUpdatePublisher = async (publisherId, updatedPublisher) => {
        const isNameExist = publishers.some(publisher => publisher.name === updatedPublisher.name && publisher._id !== publisherId);
        if (isNameExist) {
            setMessage({ type: 'error', text: 'Такой издатель уже существует!' });
            return;
        }

        try {
            const token = localStorage.getItem('token');
            const config = { headers: { Authorization: `Bearer ${token}` } };
            await axios.put(`https://mern-book-store-pg5d.onrender.com/api/publisher/update/${publisherId}`, updatedPublisher, config);
            fetchPublishers();
            setEditingPublisher(null);
            setMessage({ type: 'success', text: 'Издатель успешно обновлен!' });
        } catch (error) {
            console.log(error);
            setMessage({ type: 'error', text: 'Ошибка при обновлении издателя!' });
        }
    };

    const handleDeletePublisher = async (publisherId) => {
        try {
            const token = localStorage.getItem('token');
            const config = { headers: { Authorization: `Bearer ${token}` } };
            await axios.delete(`https://mern-book-store-pg5d.onrender.com/api/publisher/delete/${publisherId}`, config);
            fetchPublishers();
        } catch (error) {
            console.log(error);
        }
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditingPublisher(prevPublisher => ({ ...prevPublisher, [name]: value }));
    };

    const filteredPublishers = publishers.filter(publisher =>
        publisher.name.toLowerCase().includes(searchTerm.toLowerCase())
    );


    return (
        <div className="container mx-auto p-4 text-sm">
            <h2 className="text-xl font-semibold mb-6">Издатели</h2>

            <div className="bg-white p-6 rounded-lg shadow-md overflow-x-auto">
                <div className="mt-6 p-4 rounded-lg shadow-md">
                    {message && <p className={`text-${message.type === 'error' ? 'red' : 'green'}-500 mb-4`}>{message.text}</p>}
                    {showForm ? (
                        <>
                            <h3 className="text-xl font-bold mb-4">Добавить издателя</h3>
                            <form onSubmit={handleAddPublisher}>
                                <input type="text" name="name" placeholder="Название" value={newPublisher.name} onChange={(e) => setNewPublisher({ ...newPublisher, name: e.target.value })} className="border p-2 mb-2" required />
                                <input type="text" name="logoUrl" placeholder="Логотип" value={newPublisher.logoUrl} onChange={(e) => setNewPublisher({ ...newPublisher, logoUrl: e.target.value })} className="border p-2 mb-2" required />
                                <button type="submit" className="bg-blue-500 text-white p-2 rounded-lg mt-4">Добавить</button>
                            </form>
                        </>
                    ) : (
                        <button onClick={() => setShowForm(true)} className="bg-blue-500 text-white p-2 rounded-lg mt-4">Добавить издателя</button>
                    )}
                </div>
                <div className="mb-6">
                    <h3 className="text-xl font-bold mb-4">Поиск</h3>
                    <input type="text" placeholder="Поиск..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-200 sm:text-sm sm:leading-6" />
                </div>
                <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                        <tr>
                            <th className="px-3 py-2 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">№</th>
                            <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Название</th>
                            <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Логотип</th>
                            <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Действия</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {filteredPublishers.map((publisher, index) => (
                            <tr key={publisher._id}>
                                <td className="px-1 py-2 whitespace-wrap text-xs">{index + 1}</td>
                                <td className="px-1 py-2 whitespace-wrap text-xs">{publisher.name}</td>
                                <td className="px-1 py-2 whitespace-wrap text-sm">
                                    <img src={publisher.logoUrl} alt={publisher.name} className="w-10 h-10 object-cover" />
                                </td>
                                <td className="px-2 py-2 whitespace-wrap text-sm justify-center space-x-2">
                                    <button onClick={() => handleDeletePublisher(publisher._id)} className="bg-red-500 text-white p-1.5 rounded-lg"><RiDeleteBin6Line className='h-4 w-4' /></button>
                                    <button onClick={() => setEditingPublisher(publisher)} className="bg-green-500 text-white p-1.5 rounded-lg mr-2"><FaEdit className='h-4 w-4' /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {editingPublisher && (
                    <div className="mt-6 bg-gray-100 p-4 rounded-lg shadow-md">
                        <h3 className="text-xl font-bold mb-4">Редактирование издателя</h3>
                        <div>
                            {message && <p className={`text-${message.type === 'error' ? 'red' : 'green'}-500 mb-4`}>{message.text}</p>}
                            <input type="text" name="name" placeholder="Название" value={editingPublisher.name} onChange={handleEditChange} className="border p-2 mb-2" />
                            <input type="text" name="logoUrl" placeholder="Логотип" value={editingPublisher.logoUrl} onChange={handleEditChange} className="border p-2 mb-2" />
                            <button onClick={() => handleUpdatePublisher(editingPublisher._id, editingPublisher)} className="bg-blue-500 text-white p-2 rounded-lg mt-4">Сохранить</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );

}

export default Publishers;
