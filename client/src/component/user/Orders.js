// Orders.jsx
import React, { useState, useEffect } from 'react';

const Orders = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        // Fetch user orders from API
        // Example: axios.get('/api/user/orders').then(response => setOrders(response.data));
    }, []);

    return (
        <div className="mt-4">
            <h2 className="text-2xl font-bold mb-4">Заказы</h2>
            <ul>
                {orders.map((order, index) => (
                    <li key={index} className="border-b py-2">
                        Order {index + 1}: {order.details}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Orders;
