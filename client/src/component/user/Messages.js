// Messages.jsx
import React, { useState, useEffect } from 'react';

const Messages = () => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');

    useEffect(() => {
        // Fetch messages from API
        // Example: axios.get('/api/user/messages').then(response => setMessages(response.data));
    }, []);

    const handleSendMessage = () => {
        // Handle sending a new message
    };

    return (
        <div className="mt-4">
            <h2 className="text-2xl font-bold mb-4">Сообщения</h2>
            <div className="mb-4">
                <textarea value={newMessage} onChange={(e) => setNewMessage(e.target.value)} className="w-full border rounded-md p-2" rows="4" placeholder="Введите ваше сообщение"></textarea>
            </div>
            <div className="flex items-center justify-end">
                <button onClick={handleSendMessage} className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">Отправить</button>
            </div>
            <div className="mt-4">
                <h3 className="text-xl font-semibold mb-2">История сообщений</h3>
                <ul>
                    {messages.map((message, index) => (
                        <li key={index} className="border-b py-2">
                            {message.content}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Messages;
