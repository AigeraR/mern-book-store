import React from 'react';

const SortOptions = ({ sortOption, onSortChange }) => {
const handleSortChange = (e) => {
onSortChange(e.target.value);
};

return (
    <div className="flex justify-between mb-6 items-center">
        <select 
            value={sortOption} 
            onChange={handleSortChange}
            className="border p-2 rounded-md focus:outline-none focus:ring-2"
        >
            <option value="default">Сортировка</option>
            <option value="popular">Сначала популярные</option>
            <option value="cheap">Сначала дешевые</option>
            <option value="bestseller">Бестселлеры</option>
        </select>
    </div>
);
};

export default SortOptions;