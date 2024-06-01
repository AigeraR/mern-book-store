// Addresses.jsx
import React, { useState, useEffect } from 'react';

const Addresses = () => {
    const [addresses, setAddresses] = useState([]);

    useEffect(() => {
        // Fetch user addresses from API
        // Example: axios.get('/api/user/addresses').then(response => setAddresses(response.data));
    }, []);

    const handleAddAddress = () => {
        // Handle adding a new address
    };

    return (
        <div className="mt-4">
            <h2 className="text-2xl font-bold mb-4">Адреса</h2>
            <div className="mb-4">
                <button onClick={handleAddAddress} className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">Добавить адрес</button>
            </div>
            <ul>
                {addresses.map((address, index) => (
                    <li key={index} className="border-b py-2">
                        {address}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Addresses;
