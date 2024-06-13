// server/controllers/authController.js
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

const secretKey = process.env.JWT_SECRET;

// Register a new user

exports.registerUser = async (req, res) => {
    const { name, email, password,phone,address, confirmPassword } = req.body;

    if (password !== confirmPassword) {
        return res.status(400).json({ message: 'Passwords do not match' });
    }

    try {
        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const user = await User.create({
            name,
            email,
            phone,
            address,
            password
        });

        const token = jwt.sign({ id: user._id, role: user.role }, secretKey, {
            expiresIn: '1h'
        });

        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            address: user.address,
            role: user.role,
            token
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
// Login a user
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user || !(await user.matchPassword(password))) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const token = jwt.sign({ id: user._id, role: user.role }, secretKey, {
            expiresIn: '1h'
        });

        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            address: user.address,
            role: user.role,
            token
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getUser = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

//get all users
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
}
// Generate JWT token
exports.generateToken = (req, res) => {
    const { username, role } = req.body; // Предполагается, что роль передается в теле запроса

    // Проверка роли пользователя, например, если роль - администратор, тогда можно создать токен
    if (role === 'admin') {
        // Создание JWT-токена с информацией о роли
        const token = jwt.sign({ username, role }, secretKey, { expiresIn: '1h' }); // Подпись токена с использованием секретного ключа

        res.status(200).json({ token }); // Отправка токена клиенту
    } else {
        res.status(403).json({ message: 'У вас нет доступа для создания токена' });
    }
};

//logout user
exports.logoutUser = (req, res) => {
    res.cookie('token', 'none', {
        expires: new Date(Date.now() + 10 * 1000),
        httpOnly: true
    });
    res.status(200).json({ message: 'Logged out successfully' });
}

//udate user
exports.updateUser = async (req, res) => {
    const { name, email, phone, address } = req.body;

    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.user.id,
            { name, email, phone, address },
            { new: true }
        );

        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Обновление пароля пользователя
exports.updatePassword = async (req, res) => {
    const { oldPassword, newPassword } = req.body;

    try {
        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (!(await user.matchPassword(oldPassword))) {
            return res.status(401).json({ message: 'Invalid password' });
        }
        user.password = newPassword;
        await user.save();

        res.status(200).json({ message: 'Password updated successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
  
exports.addAddress = async (req, res) => {
    const { street, city, state } = req.body;

    try {
        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.address.push({ street, city, state });
        await user.save();

        res.status(200).json(user.addresses);
    } catch (error) {
        console.error(error); // Логирование ошибки
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Функция для получения адресов пользователя
exports.getUserAddresses = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(user.address);
    } catch (error) {
        console.error(error); // Логирование ошибки
        res.status(500).json({ message: 'Internal server error' });
    }
};