import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FiEdit3, FiTrash2, FiSearch, FiX, FiShield, FiUser } from "react-icons/fi";

const API_BASE = 'https://mern-book-store-pg5d.onrender.com/api/auth';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingUser, setEditingUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const getHeaders = () => ({
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
  });

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${API_BASE}/getAllUsers`, getHeaders());
      setUsers(response.data);
    } catch (error) { console.error(error); }
  };

  useEffect(() => { fetchUsers(); }, []);

  const handleDeleteUser = async (userId) => {
    if (!window.confirm("Удалить пользователя?")) return;
    try {
      await axios.delete(`${API_BASE}/deleteUserById/${userId}`, getHeaders());
      setUsers(users.filter((u) => u._id !== userId));
    } catch (error) { console.error(error); }
  };

  const handleUpdateUser = async () => {
    setLoading(true);
    try {
      const response = await axios.put(`${API_BASE}/updateUser/${editingUser._id}`, editingUser, getHeaders());
      setUsers(users.map((u) => (u._id === editingUser._id ? response.data : u)));
      setEditingUser(null);
    } catch (error) { console.error(error); }
    finally { setLoading(false); }
  };

  const filteredUsers = users.filter((u) =>
    u.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4 md:p-8 bg-[#f9fafb] min-h-screen font-sans">
      <div className="max-w-6xl mx-auto">
        
        {/* Header & Search */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl font-black text-gray-900 tracking-tight">Пользователи</h2>
            <p className="text-gray-500 text-sm">Управление доступом и ролями</p>
          </div>
          
          <div className="relative w-full md:w-80">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Поиск по имени или email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-white border border-gray-100 rounded-2xl shadow-sm focus:ring-2 focus:ring-orange-500 transition-all outline-none text-sm"
            />
          </div>
        </div>

        {/* Unified List (Desktop & Mobile) */}
        <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden">
          <div className="flex flex-col divide-y divide-gray-50">
            {filteredUsers.length > 0 ? filteredUsers.map((user) => (
              <div 
                key={user._id} 
                className="p-4 md:px-8 md:py-5 flex items-center justify-between gap-4 hover:bg-gray-50/50 transition-colors"
              >
                {/* User Info */}
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <div className={`w-10 h-10 md:w-12 md:h-12 shrink-0 rounded-xl md:rounded-2xl flex items-center justify-center font-bold text-sm md:text-lg shadow-sm ${user.role === 'admin' ? 'bg-black text-white' : 'bg-orange-50 text-orange-600'}`}>
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="min-w-0">
                    <p className="font-bold text-gray-900 text-sm md:text-base truncate">{user.name}</p>
                    <p className="text-[10px] md:text-xs text-gray-400 truncate leading-none mt-1">{user.email}</p>
                  </div>
                </div>

                {/* Status Badge */}
                <div className="shrink-0">
                  {user.role === 'admin' ? (
                    <span className="bg-orange-500 text-white p-1.5 md:px-3 md:py-1.5 rounded-lg md:rounded-xl text-[10px] font-black shadow-sm flex items-center gap-1">
                      <FiShield size={12} />
                      <span className="hidden sm:inline uppercase">Admin</span>
                    </span>
                  ) : (
                    <span className="bg-gray-100 text-gray-500 p-1.5 md:px-3 md:py-1.5 rounded-lg md:rounded-xl text-[10px] font-black flex items-center gap-1">
                      <FiUser size={12} />
                      <span className="hidden sm:inline uppercase">User</span>
                    </span>
                  )}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1 md:gap-3 shrink-0">
                  <button 
                    onClick={() => setEditingUser(user)} 
                    className="p-2 md:p-3 bg-white border border-gray-100 text-gray-600 hover:bg-black hover:text-white rounded-xl shadow-sm transition-all active:scale-90"
                  >
                    <FiEdit3 size={14} className="md:size-4" />
                  </button>
                  <button 
                    onClick={() => handleDeleteUser(user._id)} 
                    className="p-2 md:p-3 bg-white border border-gray-100 text-gray-400 hover:bg-red-50 hover:text-red-600 rounded-xl shadow-sm transition-all active:scale-90"
                  >
                    <FiTrash2 size={14} className="md:size-4" />
                  </button>
                </div>
              </div>
            )) : (
              <div className="p-20 text-center text-gray-400 text-sm font-medium">Пользователи не найдены</div>
            )}
          </div>
        </div>

        {/* Modal Overlay */}
        {editingUser && (
          <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-black/60 backdrop-blur-sm p-0 md:p-4">
            <div className="bg-white w-full max-w-md md:rounded-[2.5rem] rounded-t-[2.5rem] p-8 md:p-10 shadow-2xl relative animate-in slide-in-from-bottom duration-300">
              <button 
                onClick={() => setEditingUser(null)} 
                className="absolute top-6 right-6 p-2 bg-gray-50 rounded-full text-gray-400 hover:text-black transition-colors"
              >
                <FiX size={20} />
              </button>
              
              <h3 className="text-2xl font-black mb-8 tracking-tight text-gray-900">Редактировать профиль</h3>
              
              <div className="space-y-5">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-gray-400 uppercase ml-1 tracking-widest">Имя пользователя</label>
                  <input 
                    value={editingUser.name} 
                    onChange={(e) => setEditingUser({...editingUser, name: e.target.value})} 
                    className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-5 py-4 focus:ring-2 focus:ring-orange-500 outline-none font-bold transition-all" 
                  />
                </div>
                
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-gray-400 uppercase ml-1 tracking-widest">Электронная почта</label>
                  <input 
                    value={editingUser.email} 
                    onChange={(e) => setEditingUser({...editingUser, email: e.target.value})} 
                    className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-5 py-4 focus:ring-2 focus:ring-orange-500 outline-none font-bold transition-all" 
                  />
                </div>
                
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-gray-400 uppercase ml-1 tracking-widest">Роль в системе</label>
                  <select 
                    value={editingUser.role} 
                    onChange={(e) => setEditingUser({...editingUser, role: e.target.value})} 
                    className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-5 py-4 focus:ring-2 focus:ring-orange-500 outline-none font-bold appearance-none cursor-pointer"
                  >
                    <option value="user">Обычный пользователь</option>
                    <option value="admin">Администратор</option>
                  </select>
                </div>
                
                <button 
                  onClick={handleUpdateUser} 
                  disabled={loading} 
                  className="w-full bg-black text-white py-5 rounded-2xl font-black mt-4 hover:bg-gray-800 shadow-xl transition-all disabled:bg-gray-200 active:scale-95"
                >
                  {loading ? 'Загрузка...' : 'Сохранить изменения'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Users;