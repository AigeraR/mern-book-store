import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  FiGrid, 
  FiUsers, 
  FiLayers, 
  FiHash, 
  FiBook, 
  FiUser, 
  FiHome, 
  FiLogOut,
  FiUserPlus
} from "react-icons/fi"; // Набор более современных и тонких иконок

const SidebarAdmin = () => {
  const [avatar, setAvatar] = useState(localStorage.getItem('avatar') || '');
  const userName = localStorage.getItem('userName');
  const navigate = useNavigate();

  useEffect(() => {
    if (avatar) {
      localStorage.setItem('avatar', avatar);
    }
  }, [avatar]);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLogout = async () => {
    try {
      const response = await fetch('https://mern-book-store-pg5d.onrender.com/api/auth/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        localStorage.removeItem('userName');
        localStorage.removeItem('avatar');
        navigate('/'); 
      } else {
        console.error('Ошибка при выходе из аккаунта:', response.statusText);
      }
    } catch (error) {
      console.error('Ошибка при выходе из аккаунта:', error.message);
    }
  };

  // Твои стили без изменений
  const navLinkStyle = ({ isActive }) => isActive ? 'block py-2 px-4 bg-gray-200 rounded-md transition-all' : 'block py-2 px-4 rounded-md transition-all hover:bg-gray-50';
  
  const navLinks = [
    { text: 'Панель', to: "/admin", icon: <FiGrid className="inline-block mr-2 bg-blue-500 text-white p-2 rounded-full shadow-sm" /> },
    { text: 'Пользователь', to: "/admin/users", icon: <FiUsers className="inline-block mr-2 text-green-500 text-xl" /> },
    { text: 'Категории', to: "/admin/categories", icon: <FiLayers className="inline-block mr-2 text-orange-600 text-xl" /> },
    { text: 'Подкатегории', to: "/admin/subcategories", icon: <FiHash className="inline-block mr-2 text-green-500 text-xl" /> },
    { text: 'Книги', to: "/admin/books", icon: <FiBook className="inline-block mr-2 text-red-700 text-xl" /> },
    { text: 'Авторы', to: "/admin/authors", icon: <FiUser className="inline-block mr-2 text-yellow-500 text-xl" /> },
    { text: 'Издательства', to: "/admin/publishers", icon: <FiHome className="inline-block mr-2 text-pink-700 text-xl" /> },
  ];

  return (
    <div className="rounded-md shadow-md p-4 bg-white">
      <div className="flex flex-col items-center mb-4">
        <div className="rounded-full overflow-hidden mb-2 ring-2 ring-gray-100 shadow-sm">
          {avatar ? (
            <img src={avatar} alt="User Avatar" className="w-20 h-20 object-cover" />
          ) : (
            <div className="w-12 h-12 bg-blue-100 flex items-center justify-center rounded-full text-blue-600">
              <FiUserPlus size={24} />
            </div>
          )}
        </div>
        <input
          type="file"
          accept="image/*"
          onChange={handleAvatarChange}
          className="hidden"
          id="avatar-upload"
        />
        <label htmlFor="avatar-upload" className="text-blue-500 hover:text-blue-700 cursor-pointer text-xs font-medium mb-2 transition-colors">Выбрать аватар</label>
        <h1 className="text-lg font-bold text-gray-800">{userName}</h1>
      </div>

      <ul className="flex flex-col gap-1">
        {navLinks.map(({ text, to, icon }) => (
          <li key={to}>
            <NavLink to={to} className={navLinkStyle} end>
              {icon}
              <span className="ml-2 font-medium text-gray-700">{text}</span>
            </NavLink>
          </li>
        ))}
      </ul>

      <button onClick={handleLogout} className="w-full mt-6 py-2.5 px-4 flex items-center justify-center gap-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-all shadow-md active:scale-95">
        <FiLogOut />
        <span>Выйти</span>
      </button>
    </div>
  );
}

export default SidebarAdmin;