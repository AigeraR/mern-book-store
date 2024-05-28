// src/component/Home.js

import React from 'react';
import Header from '../header/Header';
import Banner from './Banner';
import BestSeller from './BestSeller';
import Authors from './Authors';
import Publishers from './Publishers';

const Home = () => {
  return (
    <div>
      <Header />
      <Banner/>
      <BestSeller/>
      <Authors/>
      <Publishers />
      {/* <Authors/> */}
    </div>
  );
}

export default Home;
