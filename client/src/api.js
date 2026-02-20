import axios from 'axios';

const API = axios.create({
  baseURL: 'https://mern-book-store-pg5d.onrender.com/api', 
});

export default API;