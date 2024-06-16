import React, { useState } from 'react';
import axios from 'axios';
import { FaPlus } from "react-icons/fa";

const AddAuthor = ({ handleAddAuthor }) => {
    const [name, setName] = useState('');
    const [bio, setBio] = useState('');
    const [image, setImage] = useState('');
    const [error, setError] = useState('');
    const [open, setOpen] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/author/addAuthor', { name, bio, image });
            handleAddAuthor(response.data);
            setName('');
            setBio('');
            setImage('');
            setError('');
        } catch (error) {
            setError(error.message);
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
                            value={image}
                            onChange={(e) => setImage(e.target.value)}
                            placeholder="Ссылка на изображение"
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
