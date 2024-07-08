import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";

const Subcategories = () => {
    const [subcategories, setSubcategories] = useState([]);
    const [newSubcategory, setNewSubcategory] = useState({ name: '', description: '', category: '' });
    const [categories, setCategories] = useState([]);
    const [editSubcategory, setEditSubcategory] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [showInputs, setShowInputs] = useState(false); // Add state for input visibility
    const [showAll, setShowAll] = useState(false);
    useEffect(() => {
        fetchSubcategories();
        fetchCategories();
    }, []);

    const fetchSubcategories = async () => {
        const response = await axios.get('http://localhost:5000/api/subcategory/getAll');
        setSubcategories(response.data);
    };

    const fetchCategories = async () => {
        const token = localStorage.getItem('token');
        const config = { headers: { Authorization: `Bearer ${token}` } };
        const response = await axios.get('http://localhost:5000/api/category/getAllCategories', config);
        setCategories(response.data);
    };

    const handleAddOrEditSubcategory = async () => {
        const token = localStorage.getItem('token');
        const config = { headers: { Authorization: `Bearer ${token}` } };
        if (!newSubcategory.name || !newSubcategory.description || !newSubcategory.category) {
            setErrorMessage('Пожалуйста, заполните все обязательные поля.');
            return;
        }

        try {
            if (editSubcategory) {
                await axios.put(`http://localhost:5000/api/subcategory/update/${editSubcategory._id}`, newSubcategory, config);
                setSuccessMessage('Подкатегория успешно обновлена.');
            } else {
                await axios.post('http://localhost:5000/api/subcategory/create', newSubcategory, config);
                setSuccessMessage('Подкатегория успешно добавлена.');
            }
            setNewSubcategory({ name: '', description: '', category: '' });
            setEditSubcategory(null);
            setShowInputs(false); // Hide inputs after adding/editing
            fetchSubcategories();
        } catch (error) {
            console.log(error);
            setErrorMessage('Произошла ошибка при сохранении подкатегории.');
        }
    };

    const handleEditSubcategory = (subcategory) => {
        setEditSubcategory(subcategory);
        setNewSubcategory({ name: subcategory.name, description: subcategory.description, category: subcategory.category });
        setShowInputs(true); // Show inputs when editing
    };

    const handleDeleteSubcategory = async (id) => {
        const token = localStorage.getItem('token');
        const config = { headers: { Authorization: `Bearer ${token}` } };
        try {
            await axios.delete(`http://localhost:5000/api/subcategory/delete/${id}`, config);
            fetchSubcategories();
        } catch (error) {
            console.log(error);
        }
    };

    const getCategoryName = (categoryId) => {
        const category = categories.find((category) => category._id === categoryId);
        return category ? category.name : 'y';
    };
    const hangleShowAll = () => {
        setShowAll(prevShowAll => !prevShowAll);
    };
    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-semibold mb-4">Подкатегории</h2>
            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                {errorMessage && <div className="text-red-500 mb-2">{errorMessage}</div>}
                {successMessage && <div className="text-green-500 mb-2">{successMessage}</div>}
                {!showInputs && (
                    <button onClick={() => setShowInputs(true)} className="bg-blue-500 text-white p-2 rounded-lg font-semibold">
                        Добавить подкатегорию
                    </button>
                )}
                {showInputs && (
                    <div className="mt-4">
                        <input
                            type="text"
                            value={newSubcategory.name}
                            onChange={(e) => setNewSubcategory({ ...newSubcategory, name: e.target.value })}
                            placeholder="Новая подкатегория"
                            className="border p-2 mb-2 w-full"
                        />
                        <textarea
                            value={newSubcategory.description}
                            onChange={(e) => setNewSubcategory({ ...newSubcategory, description: e.target.value })}
                            placeholder="Описание"
                            className="border p-2 mb-2 w-full"
                        />
                        <select
                            value={newSubcategory.category}
                            onChange={(e) => setNewSubcategory({ ...newSubcategory, category: e.target.value })}
                            className="border p-2 mb-2 w-full"
                        >
                            <option value="">Выберите категорию</option>
                            {categories.map(category => (
                                <option key={category._id} value={category._id}>{category.name}</option>
                            ))}
                        </select>
                        <button onClick={handleAddOrEditSubcategory} className="bg-blue-500 text-white p-2 rounded-lg font-semibold">
                            {editSubcategory ? 'Сохранить изменения' : 'Добавить подкатегорию'}
                        </button>
                    </div>
                )}
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                        <tr>
                            <th className="px-2 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
                            <th className="px-2 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Имя</th>
                            <th className="px-2 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Описание</th>
                            <th className="px-2 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Категория</th>
                            <th className="px-2 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Действия</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {subcategories.slice(0, showAll ? subcategories.length : 5).map((subcategory, index) => (
                            <tr key={subcategory._id}>
                                <td className="px-2 py-1 whitespace-nowrap text-xs">{index + 1}</td>
                                <td className="px-2 py-1 whitespace-nowrap text-xs">{subcategory.name}</td>
                                <td className="px-2 py-1 whitespace-wrap text-xs">{subcategory.description}</td>
                                <td className="px-2 py-1 whitespace-nowrap text-xs"> {subcategory.category ? subcategory.category.name : ' '}</td>
                                <td className="px-2 py-1 whitespace-nowrap text-xs">
                                    <button onClick={() => handleEditSubcategory(subcategory)} className="bg-green-500 text-white p-1.5 rounded-lg mr-2">
                                        <FaEdit className='h-4 w-4' />
                                    </button>
                                    <button onClick={() => handleDeleteSubcategory(subcategory._id)} className="bg-red-500 text-white p-1.5 rounded-lg">
                                        <RiDeleteBin6Line className='h-4 w-4' />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="flex justify-start mt-4">
                    <button onClick={hangleShowAll} className="bg-blue-500 text-white p-2 text-xs rounded-lg">
                        {showAll ? 'Показать меньше' : 'Показать все'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Subcategories;
