import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AiOutlineUser } from 'react-icons/ai';
import { FaRegAddressCard } from "react-icons/fa";
import { MdBorderColor } from "react-icons/md";
import { CiBookmark } from "react-icons/ci";
import { FcSms } from "react-icons/fc";
import { GiBuyCard } from "react-icons/gi";
import { BiCategory } from "react-icons/bi";
import { MdCategory } from "react-icons/md";
import { FaBook } from "react-icons/fa";
import { FaPersonBooth } from "react-icons/fa";
import { ImOffice } from "react-icons/im";
import { HiUsers } from "react-icons/hi";




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
        navigate('/'); // Перенаправляем на главную страницу после выхода
      } else {
        console.error('Ошибка при выходе из аккаунта:', response.statusText);
      }
    } catch (error) {
      console.error('Ошибка при выходе из аккаунта:', error.message);
    }
  };

  const navLinkStyle = ({ isActive }) => isActive ? 'block py-2 px-4 bg-gray-200  rounded-md' : 'block py-2 px-4   rounded-md';
  const navLinks = [
    { text: 'Панель', to: "/admin", icon: <AiOutlineUser className="inline-block mr-2 bg-blue-500 text-white p-2 rounded-full" /> },
    { text: 'Пользователь', to: "/admin/users", icon: <HiUsers className="inline-block mr-2 text-green-500" /> },
    // { text: 'Заказы', to: "/admin/orders", icon: <GiBuyCard className="inline-block mr-2 text-purple-600" /> },
    { text: 'Категории', to: "/admin/categories", icon: <BiCategory className="inline-block mr-2 text-orange-700" /> },
    { text: 'Подкатегории', to: "/admin/subcategories", icon: <MdCategory className="inline-block mr-2 text-green-500" /> },
    { text: 'Книги', to: "/admin/books", icon: <FaBook className="inline-block mr-2 text-red-900" /> },
    {text: 'Авторы', to: "/admin/authors", icon: <FaPersonBooth className="inline-block mr-2 text-yellow-400" />},
    {text: 'Издательства', to: "/admin/publishers", icon: <ImOffice className="inline-block mr-2  text-pink-700" />},
    // { text: 'Сообщения', to: "/admin/messages", icon: <FcSms className="inline-block mr-2" /> },

  ];

  return (
    <div className=" rounded-md shadow-md p-4">
      <div className="flex flex-col items-center mb-4">
        <div className="rounded-full overflow-hidden mb-2">
          {avatar ? (
            <img src={avatar} alt="User Avatar" className="w-20 h-20 object-cover" />
          ) : (
            <div className="w-12 h-12 bg-blue-300 flex items-center justify-center rounded-full">
              <AiOutlineUser className="" />
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
        <label htmlFor="avatar-upload" className="text-blue-500 cursor-pointer text-sm mb-2">Выбрать аватар</label>
        <h1 className="text-lg font-semibold ">{userName}</h1>
      </div>
      <ul className="flex flex-col">
        {navLinks.map(({ text, to, icon }) => (
          <li key={to}>
            <NavLink to={to} className={navLinkStyle} end>
              {icon}
              <span className="ml-2">{text}</span>
            </NavLink>
          </li>
        ))}
      </ul>
      <button onClick={handleLogout} className="w-full mt-6 py-2 px-4 text-center bg-red-600 text-white rounded-md hover:bg-red-700">
        Выйти
      </button>
    </div>
  );
}

export default SidebarAdmin;
