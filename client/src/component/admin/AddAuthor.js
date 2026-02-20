import React, { useState } from 'react';
import axios from 'axios';
import { FaPlus } from "react-icons/fa";

const AddAuthor = ({ handleAddAuthor }) => {
    const [name, setName] = useState('');
    const [bio, setBio] = useState('');
    const [img, setImage] = useState('');
    const [error, setError] = useState('');
    const [open, setOpen] = useState(false);
    const [birthdate, setBirthdate] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const config = { headers: { Authorization: `Bearer ${token}` } };
            
            // Проверка на пустые обязательные поля перед отправкой запроса
            if (!name || !bio || !img || !birthdate) {
                setError('Please fill in all fields.');
                return;
            }

            const response = await axios.post('https://mern-book-store-pg5d.onrender.com/api/author/create', { name, bio, img, birthdate }, config);
            handleAddAuthor(response.data);
            setName('');
            setBio('');
            setImage('');
            setBirthdate('');
            setError('');
            setOpen(false); // Закрыть форму после успешного добавления автора
        } catch (error) {
            setError(error.response.data.message || 'An error occurred while adding the author.');
        }
    };
    

    return (
        <div>
            <button onClick={() => setOpen(true)} className="bg-green-500 text-white p-2 rounded-lg mr-2"><FaPlus className='h-4 w-4' /> Добавить автора</button>
            {open && (
                <div className="bg-white p-6 rounded-lg shadow-md mt-6">
                    <h3 className="text-xl font-bold mb-4">Добавить автора</h3>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Имя"
                            className="border p-2 mb-2 w-full"
                        />
                        <textarea
                            value={bio}
                            onChange={(e) => setBio(e.target.value)}
                            placeholder="Биография"
                            className="border p-2 mb-2 w-full"
                        />
                        <input
                            type="text"
                            value={img}
                            onChange={(e) => setImage(e.target.value)}
                            placeholder="Ссылка на изображение"
                            className="border p-2 mb-2 w-full"
                        />
                        <input
                            type="date"
                            value={birthdate}
                            onChange={(e) => setBirthdate(e.target.value)}
                            placeholder="Дата рождения"
                            className="border p-2 mb-2 w-full"
                        />
                        <button type="submit" className="bg-green-500 text-white p-2 rounded-lg">Добавить</button>
                        {error && <p className="text-red-500 mt-2">{error}</p>}
                    </form>
                </div>
            )}
        </div>
    );
};

export default AddAuthor;
