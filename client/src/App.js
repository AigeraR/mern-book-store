// src/App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './component/header/LoginPage';
import Home from './component/home/Home';
import Header from './component/header/Header';
import Authors from './component/home/Authors';
//import tailwind output.css
// import './output.css';

const App = () => {
  return (
    <Router>
      <div>
        {/* <Home /> */}
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/authors" component={<Authors/>} />
          {/* <Route path="/author/:id" component={<AuthorInfo/>} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
