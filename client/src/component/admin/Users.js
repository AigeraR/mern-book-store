import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsersCount = async () => {
        try {
            const token = localStorage.getItem('token');
            const config = { headers: { Authorization: `Bearer ${token}` } };
            const response = await axios.get('http://localhost:5000/api/auth/getAllusers', config);
            setUsers(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    fetchUsersCount();
}, []);

  return (
    <div>
      <h2 className="text-3xl font-semibold mb-6">Users</h2>
      <div className="bg-white p-6 rounded-lg shadow-md">
        {users.map(user => (
            user.role === 'user' &&(
                 <div key={user._id} className="border p-4 mb-4">
            <h3 className="text-lg font-bold">{user.name}</h3>
            <p>Email: {user.email}</p>
          </div>
            )
         
        ))}
      </div>
    </div>
  );
};

export default Users;
