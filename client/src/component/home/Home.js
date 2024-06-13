// src/component/Home.js

import React from 'react';
import Header from '../header/Header';
import Banner from './Banner';
import BestSeller from './BestSeller';
import Authors from './Authors';
import Publishers from './Publishers';
import Books from './Books';

const Home = () => {
  return (
    <div>
      <Header />
      <Banner />
      <BestSeller />
      <Authors />
      <Publishers />
      <Books />
      {/* <Authors/> */}
    </div>
  );
}

export default Home;
