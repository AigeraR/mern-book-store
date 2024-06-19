import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-gray-600 text-gray-200 py-12">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div>
                        <h3 className="text-lg font-bold mb-4">О нас</h3>
                        <p className="text-gray-400">
                            Мы предоставляем широкий выбор книг разных жанров и направлений. Наши читатели могут найти все, что нужно для души и ума.
                        </p>
                    </div>
                    <div>
                        <h3 className="text-lg font-bold mb-4">Навигация</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link to="/" className="hover:text-white transition duration-200">Главная</Link>
                            </li>
                            <li>
                                <Link to="/catalog" className="hover:text-white transition duration-200">Каталог</Link>
                            </li>
                            <li>
                                <Link to="/about" className="hover:text-white transition duration-200">О нас</Link>
                            </li>
                            <li>
                                <Link to="/contact" className="hover:text-white transition duration-200">Контакты</Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-lg font-bold mb-4">Контакты</h3>
                        <ul className="space-y-2">
                            <li>Адрес: г. Бишкек, ул. Тыныстанова,123</li>
                            <li>Телефон: +996 (501) 123-456 (9) </li>
                            <li>Email: info@bookmark.com</li>
                        </ul>
                        <div className="mt-6 flex space-x-4">
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition duration-200">
                                <FaFacebookF size={20} />
                            </a>
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition duration-200">
                                <FaTwitter size={20} />
                            </a>
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition duration-200">
                                <FaInstagram size={20} />
                            </a>
                            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition duration-200">
                                <FaLinkedinIn size={20} />
                            </a>
                        </div>
                    </div>
                </div>
                <div className="mt-8 border-t border-gray-700 pt-6 text-center text-gray-400 text-sm">
                    © 2024 BookMark. Все права защищены.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
