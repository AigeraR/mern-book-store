import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Addresses = () => {
    const [addresses, setAddresses] = useState([]);
    const [newAddress, setNewAddress] = useState({ street: '', city: '', state: '' });
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchAddresses = async () => {
            try {
                const token = localStorage.getItem('token');
                const config = { headers: { Authorization: `Bearer ${token}` } };
                const response = await axios.get('https://mern-book-store-pg5d.onrender.com/api/auth/addresses', config);
                if (Array.isArray(response.data)) {
                    setAddresses(response.data);
                } else {
                    setAddresses([]); // или можно установить сообщение об ошибке
                }
            } catch (error) {
                console.log(error);
            }
        };

        fetchAddresses();
    }, []);

    const handleAddAddress = async () => {
        try {
            const token = localStorage.getItem('token');
            const config = { headers: { Authorization: `Bearer ${token}` } };
            const response = await axios.post('https://mern-book-store-pg5d.onrender.com/api/auth/address', newAddress, config);
            if (Array.isArray(response.data)) {
                setAddresses(response.data);
            } else {
                setMessage('Ошибка при добавлении адреса.');
            }
            setNewAddress({ street: '', city: '', state: '' });
            setMessage('Адрес успешно добавлен.');
        } catch (error) {
            console.log(error);
            setMessage('Ошибка при добавлении адреса.');
        }
    };

    return (
        <div className="mt-4">
            {message && <p className="mb-2 text-green-600">{message}</p>}
            <h2 className="text-xl font-bold mb-4 text-orange-500">Адреса</h2>
            <div className='mb-4 '>
                <div className="mb-4 grid grid-rows-4">
                    <input
                        type="text"
                        placeholder="Улица"
                        value={newAddress.street}
                        onChange={(e) => setNewAddress({ ...newAddress, street: e.target.value })}
                        className="w-1/2 border border-gray-300 rounded-md py-2 px-4 mb-2"
                    />
                    <input
                        type="text"
                        placeholder="Город"
                        value={newAddress.city}
                        onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
                        className="w-1/2 border border-gray-300 rounded-md py-2 px-4 mb-2"
                    />
                    <input
                        type="text"
                        placeholder="Район"
                        value={newAddress.state}
                        onChange={(e) => setNewAddress({ ...newAddress, state: e.target.value })}
                        className="w-1/2 border border-gray-300 rounded-md py-2 px-4 mb-2"
                    />

                    <button onClick={handleAddAddress} className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 w-1/2">
                        Добавить адрес
                    </button>
                </div>
                <ul>
                    {addresses.map((address, index) => (
                        <li key={index} className="border-b py-2">
                            {`${address.street}, ${address.city}, ${address.state}`}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Addresses;
