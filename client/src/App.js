// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import LoginPage from './component/header/LoginPage';
import Home from './component/home/Home';
import Authors from './component/home/Authors';
import AboutUs from './component/header/page/AboutUs';
import Payment from './component/header/page/Payment';
import WholeSale from './component/header/page/WholeSale';
import Delivery from './component/header/page/Delivery';
import BooksByPublisher from './component/home/BooksByPublisher';
import AccountPage from './component/user/AccountPage';
import RegisterPage from './component/header/RegisterPage';
import AdminPanel from './component/admin/AdminPanel';
import CatalogPage from './component/catalog/CatalogPage';
import SearchResults from './component/header/SearchResults';
import BookDetails from './component/header/page/BookDetails';
import Cart from './component/header/Cart';
const App = () => {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  const PrivateRoute = ({ element, requiredRole, ...rest }) => {
    if (!token) {
      return <Navigate to="/" />;
    }

    if (requiredRole && role !== requiredRole) {
      return <Navigate to="/" />;
    }

    return element;
  };

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/authors" element={<Authors />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/wholesale" element={<WholeSale />} />
          <Route path="/delivery" element={<Delivery />} />
          <Route path="/publisher/:publisherName" element={<BooksByPublisher />} />
          <Route path="/catalog/:categoryId" element={<CatalogPage />} />
          <Route path='/catalog/:categoryId/:subcategoryId/' element={<CatalogPage />} />
          <Route path="/catalog" element={<CatalogPage />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/book/:bookId" element={<BookDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route
            path="/account/*"
            element={<PrivateRoute element={<AccountPage />} requiredRole="user" />}
          />
          <Route
            path="/admin/*"
            element={<PrivateRoute element={<AdminPanel />} requiredRole="admin" />}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
