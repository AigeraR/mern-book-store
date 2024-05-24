// src/component/Home.js

import React from 'react';
import Header from '../header/Header';
import Banner from './Banner';
import BestSeller from './BestSeller';
import Authors from './Authors';

const Home = () => {
  return (
    <div>
      <Header />
      <Banner/>
      <BestSeller/>
      <Authors/>
      {/* <Authors/> */}
    </div>
  );
}

export default Home;
