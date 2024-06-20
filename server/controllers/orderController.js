// orderController.js

const Order = require('../models/Order');
const User = require('../models/User');

// Размещение заказа
exports.placeOrder = async (req, res) => {
    try {
        const { userId } = req.user; // Получаем ID пользователя из аутентификации
        const { items, total } = req.body;

        // Создаем новый заказ
        const newOrder = new Order({
            user: userId,
            items,
            total
        });

        // Добавляем заказ к пользователю
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'Пользователь не найден' });
        }

        user.orders.push(newOrder);
        await newOrder.save();
        await user.save();

        res.status(201).json({ message: 'Заказ размещен успешно', order: newOrder });
    } catch (error) {
        console.error('Ошибка при размещении заказа:', error);
        res.status(500).json({ message: 'Произошла ошибка при размещении заказа' });
    }
};

// Просмотр всех заказов пользователя
exports.viewOrders = async (req, res) => {
    try {
        const { userId } = req.user; // Получаем ID пользователя из аутентификации
        const user = await User.findById(userId).populate('orders');
        if (!user) {
            return res.status(404).json({ message: 'Пользователь не найден' });
        }
        res.status(200).json(user.orders);
    } catch (error) {
        console.error('Ошибка при просмотре заказов:', error);
        res.status(500).json({ message: 'Произошла ошибка при просмотре заказов' });
    }
};

// Просмотр одного заказа
exports.viewOrder = async (req, res) => {
    try {
        const { orderId } = req.params;
        const order = await Order.findById(orderId);
        if (!order) {
            return res.status(404).json({ message: 'Заказ не найден' });
        }
        res.status(200).json(order);
    } catch (error) {
        console.error('Ошибка при просмотре заказа:', error);
        res.status(500).json({ message: 'Произошла ошибка при просмотре заказа' });
    }
};

// Отмена заказа
exports.cancelOrder = async (req, res) => {
    try {
        const { orderId } = req.params;
        const canceledOrder = await Order.findByIdAndDelete(orderId);
        if (!canceledOrder) {
            return res.status(404).json({ message: 'Заказ не найден' });
        }
        res.status(200).json({ message: 'Заказ успешно отменен', canceledOrder });
    } catch (error) {
        console.error('Ошибка при отмене заказа:', error);
        res.status(500).json({ message: 'Произошла ошибка при отмене заказа' });
    }
};
