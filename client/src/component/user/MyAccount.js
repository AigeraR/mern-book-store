import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MyAccount = () => {
  const [user, setUser] = useState({ name: '', email: '', phone: '', role: '' });
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token');
        const config = { headers: { Authorization: `Bearer ${token}` } };
        const response = await axios.get('http://localhost:5000/api/auth/getuser', config);
        setUser(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUser();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const response = await axios.put('http://localhost:5000/api/auth/update', user, config);
      setUser(response.data);
      setMessage('Данные успешно обновлены.');
    } catch (error) {
      console.log(error);
      setMessage('Ошибка при обновлении данных.');
    }
  };

  return (
    <div className="mt-4">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Мой аккаунт</h2>
      {message && <p className="mb-2 text-green-600">{message}</p>}
      <div className='grid grid-cols-2 gap-8'>
        <form onSubmit={handleUpdate} className="bg-gray-100 p-6 rounded-lg shadow-lg">
          <div className="mb-4">
            <label className="block mb-2 font-semibold text-gray-800">Имя:</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:border-blue-500"
              value={user.name}
              onChange={(e) => setUser({ ...user, name: e.target.value })}
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 font-semibold text-gray-800">Email:</label>
            <input
              type="email"
              className="w-full border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:border-blue-500"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 font-semibold text-gray-800">Телефон:</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:border-blue-500"
              value={user.phone || ''}
              onChange={(e) => setUser({ ...user, phone: e.target.value })}
            />
          </div>
          <button type="submit" className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600">
            Обновить
          </button>
        </form>
        <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
          <h1 className="text-gray-800 font-semibold">Данные</h1>
          <p><span className="font-semibold text-gray-800">Имя:</span> {user.name}</p>
          <p><span className="font-semibold text-gray-800">Email:</span> {user.email}</p>
          <p><span className="font-semibold text-gray-800">Role:</span> {user.role}</p>
          <p><span className="font-semibold text-gray-800">Телефон:</span> {user.phone || 'не указан'}</p>
        </div>
      </div>
    </div>
  );
};

export default MyAccount;
