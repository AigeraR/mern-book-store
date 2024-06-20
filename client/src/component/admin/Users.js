import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";


const Users = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingUser, setEditingUser] = useState(null);
  const [newUser, setNewUser] = useState({ name: '', email: '', phone: '', role: 'user' });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('token');
        const config = { headers: { Authorization: `Bearer ${token}` } };
        const response = await axios.get('http://localhost:5000/api/auth/getAllUsers', config);
        setUsers(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUsers();
  }, []);

  const handleDeleteUser = async (userId) => {
    try {
      const token = localStorage.getItem('token');
      const config = { headers: { Authorization: `Bearer ${token}` } };
      await axios.delete(`http://localhost:5000/api/auth/deleteUserById/${userId}`, config);
      setUsers(users.filter((user) => user._id !== userId));
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
  };

  const handleAddUser = async () => {
    try {
      const token = localStorage.getItem('token');
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const response = await axios.post('http://localhost:5000/api/auth/register', newUser, config);
      setUsers([...users, response.data]);
      setNewUser({ name: '', email: '', role: 'user' }); // Сброс данных нового пользователя
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateUser = async () => {
    try {
      const token = localStorage.getItem('token');
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const response = await axios.put(`http://localhost:5000/api/auth/updateUser/${editingUser._id}`, editingUser, config);
      setUsers(users.map((user) => (user._id === editingUser._id ? response.data : user)));
      setEditingUser(null);
    } catch (error) {
      console.log(error);
    }
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h2 className="text-3xl font-semibold mb-6">Пользователи</h2>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="mb-4">
          <input
            type="text"
            placeholder="Поиск по имени......."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-250 rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-200 sm:text-sm sm:leading-6"  
            
          />
        </div>
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-3 py-2 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Имя</th>
              <th className="px-3 py-2 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-3 py-2 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Роль</th>
              <th className="px-3 py-2 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Действия</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredUsers.map((user) => (
              <tr key={user._id}>
                <td className="px-3 py-2">{user.name}</td>
                <td className="px-3 py-2">{user.email}</td>
                <td className="px-3 py-2">{user.role}</td>
                <td className="px-3 py-2 items-center space-x-2">
                  <button onClick={() => handleEditUser(user)} className="bg-green-500 text-white p-1.5  rounded-lg">
                  <FaEdit className='h-4 w-4' />
                  </button>
                  <button onClick={() => handleDeleteUser(user._id)} className="bg-red-500 text-white p-1.5 rounded-lg mr-2">
                    <RiDeleteBin6Line className='h-4 w-4' />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {editingUser && (
          <div className="mt-4">
            <h3 className="text-lg font-semibold mb-2">Редактирование пользователя</h3>
            <input
              type="text"
              placeholder="Name"
              value={editingUser.name}
              onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })}
              className="border p-2 mb-2"
            />
            <input
              type="email"
              placeholder="Email"
              value={editingUser.email}
              onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
              className="border p-2 mb-2"
            />
            <select
              value={editingUser.role}
              onChange={(e) => setEditingUser({ ...editingUser, role: e.target.value })}
              className="border p-2 mb-2"
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
            <button onClick={() => setEditingUser(null)} className="bg-gray-500 text-white p-2 rounded-lg mr-2">
              Отменить
            </button>
            <button onClick={handleUpdateUser} className="bg-green-500 text-white p-2 rounded-lg">
              Обновить
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

export default Users;
