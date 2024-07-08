import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";


const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState({ name: '', description: '' });
  const [showAddForm, setShowAddForm] = useState(false);
  const [editCategory, setEditCategory] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const token = localStorage.getItem('token');
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const response = await axios.get('http://localhost:5000/api/category/getAllCategories', config);
      setCategories(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddCategory = async () => {
    try {
      const token = localStorage.getItem('token');
      const config = { headers: { Authorization: `Bearer ${token}` } };
      if (editCategory) {
        await axios.put(`http://localhost:5000/api/category/updateCategory/${editCategory._id}`, newCategory, config);
      } else {
        await axios.post('http://localhost:5000/api/category/createCategory', newCategory, config);
      }
      setNewCategory({ name: '', description: '' });
      setShowAddForm(false);
      setEditCategory(null);
      fetchCategories();
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditCategory = (category) => {
    setEditCategory(category);
    setNewCategory({ name: category.name, description: category.description });
    setShowAddForm(true);
  };

  const deleteCategory = async () => {
    try {
      const token = localStorage.getItem('token');
      const config = { headers: { Authorization: `Bearer ${token}` } };
      await axios.delete(`http://localhost:5000/api/category/deleteCategory/${categoryToDelete}`, config);
      setCategoryToDelete(null);
      setShowConfirmation(false);
      fetchCategories();
    } catch (error) {
      console.log(error);
    }
  };
  const handleDeleteCategory = (categoryId) => {
    setCategoryToDelete(categoryId);
    setShowConfirmation(true);
  }
  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">Категории</h2>
      <button
        onClick={() => setShowAddForm(!showAddForm)}
        className="bg-blue-500 text-white p-2 rounded-lg font-semibold mb-4"
      >
        {editCategory ? 'Редактировать категорию' : 'Добавить категорию'}
      </button>
      {showAddForm && (
        <div className="bg-white p-4 rounded-lg shadow-md mb-4">
          <input
            type="text"
            value={newCategory.name}
            onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
            placeholder="Имя"
            className="border p-2 mb-2 w-full"
          />
          <input
            type="text"
            value={newCategory.description}
            onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
            placeholder="Описание"
            className="border p-2 mb-2 w-full"
          />
          <button onClick={handleAddCategory} className="bg-green-500 text-white p-2 rounded-lg font-semibold">
            Сохранить
          </button>
        </div>
      )}
      <div className="bg-white p-4 rounded-lg shadow-md overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-2 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
              <th className="px-2 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Имя</th>
              <th className="px-2 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Описание</th>
              <th className="px-2 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Действия</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {categories.map((category, index) => (
              <tr key={category._id}>
                <td className="px-2 py-1 whitespace-nowrap text-xs">{index + 1}</td>
                <td className="px-2 py-1 whitespace-nowrap text-xs">{category.name}</td>
                <td className="px-2 py-1 whitespace-wrap text-xs overflow-y-auto">{category.description}</td>
                <td className="px-2 py-1 whitespace-nowrap text-xs">
                  <button
                    onClick={() => handleEditCategory(category)}
                    className="bg-green-500 text-white p-1.5 rounded-lg mr-2"
                  >
                    <FaEdit className='h-4 w-4' />
                  </button>
                  <button
                    onClick={() => handleDeleteCategory(category._id)}
                    className="bg-red-500 text-white p-1.5 rounded-lg"
                  ><RiDeleteBin6Line className='h-4 w-4' />

                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showConfirmation && (
        <div
          className="fixed inset-0 flex items-center justify-center  z-50"
          style={{ backgroundColor: 'rgba(31, 41, 55, 0.75)' }} // bg-gray-800 с opacity 75%
          onClick={() => setShowConfirmation(false)}
        >
          <div
            className="bg-white p-4 rounded-lg shadow-md"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="text-sm font-semibold mb-4">Вы уверены, что хотите удалить эту категорию?</p>
            <div className="flex justify-end">
              <button
                onClick={() => setShowConfirmation(false)}
                className="bg-gray-500 text-white p-2 rounded-lg mr-2"
              >
                Отмена
              </button>
              <button
                onClick={deleteCategory}
                className="bg-red-500 text-white p-2 rounded-lg"
              >
                Удалить
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Categories;
