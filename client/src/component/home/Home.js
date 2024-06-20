// src/component/Home.js

import React from 'react';
import Header from '../header/Header';
import Banner from './Banner';
import BestSeller from './BestSeller';
import Authors from './Authors';
import Publishers from './Publishers';
import Books from './Books';
import Footer from '../footer/Footer';

const Home = () => {
  return (
    <div>
      <Header />
      <Banner />
      <div className='pr-2 pl-2'>
        <BestSeller />
        <Authors />
        <Publishers />
        <div>
          <h1 className="text-md font-bold p-5 sm:text-sm md:text-md xl:text-xl lg:text-lg italic">Книги</h1>
          <Books />
        </div>
      </div>


      <Footer />
      {/* <Authors/> */}
    </div>
  );
}

export default Home;
