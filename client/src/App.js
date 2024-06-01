// src/App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
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
const App = () => {
  return (
    <Router>
      <div>
        {/* <Home /> */}
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path="/authors" element={<Authors/>} />
          <Route path='/about' element={<AboutUs/>} />
          <Route path="/payment" element={<Payment/>} />
          <Route path="wholesale" element={<WholeSale/>} />
          <Route path="/delivery" element={<Delivery/>} />
          <Route path="/publisher/:publisherName" element={<BooksByPublisher />} />
          <Route path="/account/*" element={<AccountPage />} />

          {/* <Route path="/author/:id" component={<AuthorInfo/>} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
