import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';

const Dashboard = () => {
    const [totalUsers, setTotalUsers] = useState(0);
    const [totalBooks, setTotalBooks] = useState(0);
 //fetch all users 
 useEffect(() => {
    const fetchUsersCount = async () => {
        try {
            const token = localStorage.getItem('token');
            const config = { headers: { Authorization: `Bearer ${token}` } };
            const response = await axios.get('http://localhost:5000/api/auth/getAllusers', config);
            setTotalUsers(response.data.length);
        } catch (error) {
            console.log(error);
        }
    };
    const fetchBooksCount = async () => {
        try {
            const token = localStorage.getItem('token');
            const config = { headers: { Authorization: `Bearer ${token}` } };
            const response = await axios.get('http://localhost:5000/api/books/allBook', config);
            setTotalBooks(response.data.length);
        } catch (error) {
            console.log(error);
        }
    };

    fetchBooksCount();
    fetchUsersCount();
}, []);
 
  return (
    <div>
      <h2 className="text-3xl font-semibold mb-6"> Панель управления</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-bold">Пользователи</h3>
          <p className="text-2xl">{totalUsers}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-bold">Продажи</h3>
          <p className="text-2xl">50000 сом</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-bold">Книг</h3>
          <p className="text-2xl">{totalBooks}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-bold">Заказы</h3>
          <p className="text-2xl">154</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
