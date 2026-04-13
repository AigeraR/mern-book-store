import React, { useState } from 'react';
import axios from 'axios';
import { FaPlus, FaTimes } from "react-icons/fa";

const AddAuthor = ({ handleAddAuthor }) => {
    const [form, setForm] = useState({ name: '', bio: '', img: '', birthdate: '' });
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            const res = await axios.post('https://mern-book-store-pg5d.onrender.com/api/author/create', form, {
                headers: { Authorization: `Bearer ${token}` }
            });
            handleAddAuthor(res.data);
            setIsOpen(false);
            setForm({ name: '', bio: '', img: '', birthdate: '' });
        } catch (err) {
            alert('Ошибка при сохранении');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <button onClick={() => setIsOpen(true)} className="flex items-center gap-2 bg-black text-white px-5 py-2.5 rounded-full hover:bg-gray-800 transition text-sm font-medium shadow-lg">
                <FaPlus size={12} /> Добавить автора
            </button>

            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
                    <div className="bg-white w-full max-w-md rounded-3xl p-8 shadow-2xl relative">
                        <button onClick={() => setIsOpen(false)} className="absolute top-6 right-6 text-gray-400 hover:text-black">
                            <FaTimes size={18} />
                        </button>
                        
                        <h2 className="text-2xl font-bold mb-6 tracking-tight">Новый автор</h2>
                        
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <input name="name" placeholder="Имя автора" value={form.name} onChange={handleChange} className="w-full bg-gray-50 border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-black outline-none transition" required />
                            <textarea name="bio" placeholder="Биография" value={form.bio} onChange={handleChange} className="w-full bg-gray-50 border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-black outline-none transition h-24" required />
                            
                            <div className="grid grid-cols-2 gap-4">
                                <input name="birthdate" type="date" value={form.birthdate} onChange={handleChange} className="bg-gray-50 border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-black outline-none text-sm" required />
                                <input name="img" placeholder="URL фото" value={form.img} onChange={handleChange} className="bg-gray-50 border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-black outline-none text-sm" required />
                            </div>

                            <button type="submit" disabled={loading} className="w-full bg-black text-white py-4 rounded-2xl font-semibold mt-4 hover:bg-gray-800 transition disabled:bg-gray-400">
                                {loading ? 'Загрузка...' : 'Сохранить профиль'}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default AddAuthor;