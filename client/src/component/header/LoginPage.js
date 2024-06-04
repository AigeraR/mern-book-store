import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password,
      });
      

      const { token, name } = response.data; // Предполагая, что сервер возвращает токен и имя пользователя

      if (token && name) {
        localStorage.setItem('token', token);
        console.log(localStorage.getItem('token'));
        localStorage.setItem('userName', name);
        navigate('/');
      } else {
        setErrorMessage('Неправильный email или пароль');
      }
    } catch (error) {
      setErrorMessage('Неправильный email или пароль');
      console.error('Ошибка входа:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-2xl font-bold mb-6 text-center">Вход</h1>
        {errorMessage && (
          <p className="text-red-500 text-center mb-4">{errorMessage}</p>
        )}
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 mb-4 border rounded"
        />
        <input
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 mb-4 border rounded"
        />
        <button
          onClick={handleLogin}
          className="w-full bg-blue-500 text-white p-3 rounded-lg font-semibold"
        >
          Войти
        </button>
        <div className="mt-4 text-center">
          <button
            onClick={() => navigate('/register')}
            className="text-blue-500 underline"
          >
            Нет аккаунта? Зарегистрироваться
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;