import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MyAccount = () => {
  const [user, setUser] = useState({ name: '', email: '', phone: ''});
  const [message, setMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [passwords, setPasswords] = useState({ oldPassword: '', newPassword: '', confirmPassword: '' });
  const [passwordMessage, setPasswordMessage] = useState('');
  const [errorPasswordMessage, setErrorPasswordMessage] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token');
        const config = { headers: { Authorization: `Bearer ${token}` } };
        const response = await axios.get('http://localhost:5000/api/auth/getUser', config);
        setUser(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUser();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!user.name || !user.email || !user.phone) {
      setErrorMessage('Пожалуйста, заполните все обязательные поля.');
      return;
    }
    try {
        const token = localStorage.getItem('token');
        const config = { headers: { Authorization: `Bearer ${token}` } };
        const response = await axios.put(`http://localhost:5000/api/auth/updateUser/${user._id}`, user, config);
        setUser(response.data);
        setMessage('Данные успешно обновлены.');
    } catch (error) {
        console.log(error);
        setErrorMessage('Ошибка при обновлении данных.');
    }
};

  const handleChangePassword = async (e) => {
    e.preventDefault();

    if (passwords.newPassword !== passwords.confirmPassword) {
      setErrorPasswordMessage('Новые пароли не совпадают.');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const response = await axios.put('http://localhost:5000/api/auth/updatePassword', passwords, config);
      setPasswordMessage('Пароль успешно обновлен.');
      setPasswords({ oldPassword: '', newPassword: '', confirmPassword: '' });
    } catch (error) {
      console.log(error);
      setErrorPasswordMessage('Ошибка при обновлении пароля.');
    }
  };

  return (
    <div className="mt-4">
      {message && <p className="text-green-500">{message}</p>}
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
        <form onSubmit={handleUpdate} className=" p-6 bg-white rounded-md shadow-md">
        <h2 className="text-md font-semibold mb-4 text-gray-400">Мои данные</h2>
          <div className="mb-4">
            <label className="block text-sm mb-2 font-semibold text-gray-800">Имя:</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-sm py-1 px-4 focus:outline-none focus:border-blue-500"
              value={user.name}
              onChange={(e) => setUser({ ...user, name: e.target.value })}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm mb-2 font-semibold text-gray-800">Email:</label>
            <input
              type="email"
              className="w-full border border-gray-300 rounded-sm py-1 px-4 focus:outline-none focus:border-blue-500"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-semibold text-gray-800">Телефон:</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-sm py-1 px-4 focus:outline-none focus:border-blue-500"
              value={user.phone || ''}
              onChange={(e) => setUser({ ...user, phone: e.target.value })}
            />
          </div>
          <button type="submit" className="text-sm w-94  py-2 px-6 bg-blue-500 text-white rounded-md hover:bg-blue-600">
            Обновить
          </button>
        </form>
        <div className="p-6 bg-white rounded-md shadow-md">
          <h2 className='text-sm font-semibold mb-4 text-orange-400'>Обновить пароль</h2>
          {passwordMessage && <p className="mb-2 text-green-600">{passwordMessage}</p>}
          {errorPasswordMessage && <p className="mb-2 text-red-600">{errorPasswordMessage}</p>}
          <form onSubmit={handleChangePassword}>
            <div className="mb-4">
              <label className="block text-sm mb-2 font-semibold text-gray-800">Старый пароль:</label>
              <input
                type="password"
                className="w-full border border-gray-300 rounded-sm py-1 px-4 focus:outline-none focus:border-blue-500"
                value={passwords.oldPassword}
                onChange={(e) => setPasswords({ ...passwords, oldPassword: e.target.value })}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm mb-2 font-semibold text-gray-800">Новый пароль:</label>
              <input
                type="password"
                className="w-full border border-gray-300 rounded-sn py-1 px-4 focus:outline-none focus:border-blue-500"
                value={passwords.newPassword}
                onChange={(e) => setPasswords({ ...passwords, newPassword: e.target.value })}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm mb-2 font-semibold text-gray-800">Подтвердите новый пароль:</label>
              <input
                type="password"
                className="w-full border border-gray-300 rounded-sm py-1 px-4 focus:outline-none focus:border-blue-500"
                value={passwords.confirmPassword}
                onChange={(e) => setPasswords({ ...passwords, confirmPassword: e.target.value })}
              />
            </div>
            <button type="submit" className="w-94  text-sm py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600">
              Обновить пароль
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MyAccount;
