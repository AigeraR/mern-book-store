import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import Dashboard from './Dashboard';
import Users from './Users';
import Categories from './Categories';
import Subcategories from './Subcategories';
import Books from './Books';
import Orders from './Orders';
import Messages from './Messages';
import Header from '../header/Header';
import SidebarAdmin from './SidebarAdmin';

const AdminPanel = () => {
  return (
    <div>
        <Header/>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-10 md:mt-0 mx-4">
            <div className="md:col-span-1">
                <SidebarAdmin/>
            </div>
            <div className="md:col-span-3 p-4  rounded-md">
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/users" element={<Users />} />
                    <Route path="/orders" element={<Orders />} />
                    <Route path="/categories" element={<Categories />} />
                    <Route path='/subcategories' element={<Subcategories />} />
                    <Route path="/books" element={<Books />} />
                    <Route path="/messages" element={<Messages />} />
                </Routes>
            </div>
        </div>
    </div>
);
   
};
 export default AdminPanel;