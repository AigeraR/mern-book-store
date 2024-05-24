// server/controllers/authController.js
const User = require('../models/User');
const jwt = require('jsonwebtoken');

const secretKey = process.env.JWT_SECRET;

// Register a new user
exports.registerUser = async (req, res) => {
    const { name, email, password,confirmPassword } = req.body;

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
            password
        });

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
            expiresIn: '1h'
        });

        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
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

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
            expiresIn: '1h'
        });

        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            token
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
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