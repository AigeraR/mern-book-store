import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";

const Publishers = () => {
    const [publishers, setPublishers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [editingPublisher, setEditingPublisher] = useState(null);

    useEffect(() => {
        fetchPublishers();
    }, []);

    const fetchPublishers = async () => {
        const response = await axios.get('http://localhost:5000/api/publisher/getAll');
        setPublishers(response.data);
    };

    const handleDeletePublisher = async (publisherId) => {
      try{
        const token = localStorage.getItem('token');
        const config = { headers: { Authorization: `Bearer ${token}` } };
        await axios.delete(`http://localhost:5000/api/publisher/delete/${publisherId}`, config);
        fetchPublishers();
      }
      catch(error){
        console.log(error);
      }
        
    };

    const handleUpdatePublisher = async (publisherId, updatedPublisher) => {
      try{
        const token = localStorage.getItem('token');
        const config = { headers: { Authorization: `Bearer ${token}` } };
        await axios.put(`http://localhost:5000/api/publisher/update/${publisherId}`, updatedPublisher, config);
        fetchPublishers();
        setEditingPublisher(null);
      }
      catch(error){
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
            <h2 className="text-3xl font-semibold mb-6">Издатели</h2>

            <div className="bg-white p-6 rounded-lg shadow-md overflow-x-auto">
                <h3 className="text-xl font-bold mb-4">Управление издателями</h3>
                <div className="mb-6">
                    <h3 className="text-xl font-bold mb-4">Поиск</h3>
                    <input type="text" placeholder="Поиск..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="block w-100 rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-200 sm:text-sm sm:leading-6"  />
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
                                <td className="px-3 py-2 whitespace-wrap text-xs">{index + 1}</td>
                                <td className="px-3 py-2 whitespace-wrap text-xs">{publisher.name}</td>
                                <td className="px-3 py-2 whitespace-wrap text-sm">
                                    <img src={publisher.logoUrl} alt={publisher.name} className="w-16 h-16 object-cover" />
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
