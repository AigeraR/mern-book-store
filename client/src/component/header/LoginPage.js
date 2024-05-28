// src/component/header/LoginPage.js

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password,
      });

      console.log(response.data); // Логирование ответа для отладки
      const userName = response.data.userName;
      console.log(userName);
      localStorage.setItem('userName', userName); // Сохранение userName как строки
      navigate('/home');
    } catch (error) {
      console.error('Ошибка входа:', error);
      // Обработка ошибки входа, показ сообщения пользователю и т.д.
    }
  };

  return (
    <div>
      <h1>Страница входа</h1>
      <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Пароль" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleLogin}>Войти</button>
    </div>
  );
}

export default LoginPage;
