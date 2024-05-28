import React from 'react';
import { Link, useLocation } from 'react-router-dom';

// Сопоставление путей с их русскими эквивалентами
const pathTranslations = {
  'about': 'О нас',
  'payment': 'Оплата',
  'wholesale': 'Оптовым покупателям',
  // Добавьте другие пути по мере необходимости
};

const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  return (
    <nav className=" p-3 rounded-md w-full mb-4">
      <ol className="list-reset flex text-gray-500">
        <li>
          <Link to="/" className=" hover:text-blue-800">Главная</Link>
        </li>
        {pathnames.map((value, index) => {
          const to = `/${pathnames.slice(0, index + 1).join('/')}`;
          const isLast = index === pathnames.length - 1;
          const translatedValue = pathTranslations[value] || value;

          return (
            <li key={to} className="flex items-center">
              <span className="mx-2">/</span>
              {isLast ? (
                <span>{translatedValue}</span>
              ) : (
                <Link to={to} className=" hover:text-blue-800 capitalize">{translatedValue}</Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export default Breadcrumbs;
