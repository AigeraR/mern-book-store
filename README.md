# 📚 MERN Stack Bookstore (E-Commerce)

A robust, full-stack e-commerce platform built using the MERN stack. This application provides a seamless shopping experience for customers and a powerful management dashboard for administrators.

---


## 🚀 Key Functionalities

### 👤 For Customers
- **Authentication:** Secure registration and login using JWT and local storage.
- **Smart Catalog:** Browse books by category, sub-category, and author with instant updates.
- **Interactive Search:** Real-time search engine to find specific titles quickly.
- **Shopping Cart:** Add/remove items and manage quantities with a persistent cart.
- **Personal Account:** A dedicated dashboard for users to manage their personal data and passwords.

### 🔐 For Administrators
- **Admin Dashboard:** Exclusive access to manage the store's inventory.
- **Content Management (CRUD):** Full control over adding, editing, and deleting books, authors, and categories.
- **Access Control:** Protected routes ensure that only authorized admins can access management tools.

---

## 🛠️ Technical Tech Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | React.js, React Router 6, Tailwind CSS, Axios, React Icons |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB Atlas, Mongoose ODM |
| **Security** | JSON Web Tokens (JWT), Password Hashing, Protected Routes |

---

## 📁 Project Structure

```text
mern-bookstore/
├── client/           # React frontend & Tailwind CSS styles
├── server/           # Node.js API, MongoDB models, and Auth logic
└── README.md         # Documentation

💻 Local Installation Guide
Follow these steps to run the project on your machine:

Clone the repository:
-----------------------------
git clone [https://github.com/AigeraR/mern-book-store.git](https://github.com/AigeraR/mern-book-store.git)
cd mern-book-store


Configure Backend:
------------------------
cd server
npm install
Create a .env file in the server/ folder and add:
---------------------------
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
----------******----------
Start the server: node index.js

Configure Frontend:
----------------
cd ../client
npm i
npm start

--------------------------
Contact & Support
Developed by AigeraR - GitHub: @AigeraR