// AccountPage.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from './Sidebar';
import MyAccount from './MyAccount';
import Addresses from './Addresses';
import Orders from './Orders';
import SavedBooks from './SavedBooks';
import Messages from './Messages';
import Header from '../header/Header';

const AccountPage = () => {
    return (
        <div>
            <Header />
            <div className="grid grid-cols-4 mt-10  mr-12 ml-12">
                <div className="col-span-1">
                    <Sidebar />
                </div>
                <div className="col-span-3 p-4 ml-4 bg-gray-100 rounded-md">
                    <Routes>
                        <Route path="/" element={<MyAccount />} />
                        <Route path="/addresses" element={<Addresses />} />
                        <Route path="/orders" element={<Orders />} />
                        <Route path="/saved-books" element={<SavedBooks />} />
                        <Route path="/messages" element={<Messages />} />
                    </Routes>
                </div>
            </div>
        </div>
    );
}

export default AccountPage;
