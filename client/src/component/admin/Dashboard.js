import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FiUsers, FiBookOpen, FiShoppingBag, FiTrendingUp } from "react-icons/fi";

const API_BASE = 'https://mern-book-store-pg5d.onrender.com/api';

const Dashboard = () => {
    const [stats, setStats] = useState({ users: 0, books: 0, sales: 5000, orders: 154 });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            const token = localStorage.getItem('token');
            const config = { headers: { Authorization: `Bearer ${token}` } };
            try {
                const [u, b] = await Promise.all([
                    axios.get(`${API_BASE}/auth/getAllusers`, config),
                    axios.get(`${API_BASE}/books/allBook`, config)
                ]);
                setStats(prev => ({ ...prev, users: u.data.length, books: b.data.length }));
            } catch (e) { console.error(e); }
            finally { setLoading(false); }
        };
        fetchStats();
    }, []);

    const cards = [
        { label: 'Пользователи', val: stats.users, icon: <FiUsers />, color: 'text-blue-600', bg: 'bg-blue-50' },
        { label: 'Продажи', val: `${stats.sales.toLocaleString()} сом`, icon: <FiTrendingUp />, color: 'text-emerald-600', bg: 'bg-emerald-50' },
        { label: 'Всего книг', val: stats.books, icon: <FiBookOpen />, color: 'text-indigo-600', bg: 'bg-indigo-50' },
        { label: 'Заказы', val: stats.orders, icon: <FiShoppingBag />, color: 'text-orange-600', bg: 'bg-orange-50' },
    ];

    return (
        <div className="p-5 md:p-8 bg-gray-50 min-h-screen">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-2xl font-black text-gray-800 mb-8 tracking-tight">Панель управления</h2>

                {/* Адаптивная сетка: карточки среднего размера */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    {cards.map((card, i) => (
                        <div key={i} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4 overflow-hidden group hover:shadow-md transition-all">
                            
                            {/* Иконка среднего размера (12x12) */}
                            <div className={`w-12 h-12 shrink-0 rounded-xl flex items-center justify-center text-xl shadow-inner ${card.bg} ${card.color}`}>
                                {card.icon}
                            </div>
                            
                            {/* Текстовый блок с защитой от переполнения */}
                            <div className="min-w-0 flex-1"> 
                                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest truncate mb-0.5">
                                    {card.label}
                                </p>
                                {loading ? (
                                    <div className="h-6 w-16 bg-gray-200 animate-pulse rounded-md" />
                                ) : (
                                    <p className="text-xl font-black text-gray-900 truncate">
                                        {card.val}
                                    </p>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Секция ниже карточек */}
                <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 bg-white rounded-[2rem] border border-gray-100 p-6 h-48 flex items-center justify-center text-gray-400 font-medium">
                        График активности появится здесь
                    </div>
                    <div className="bg-black p-8 rounded-[2rem] flex flex-col justify-between shadow-xl">
                        <div>
                            <p className="text-white/60 text-xs font-bold uppercase tracking-widest mb-2">Быстрый доступ</p>
                            <h3 className="text-white text-lg font-bold">Управление отчетами</h3>
                        </div>
                        <button className="w-full py-4 bg-white text-black hover:bg-gray-100 rounded-xl font-bold transition active:scale-95">
                            Скачать аналитику
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;