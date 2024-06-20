// cartController.js
const Cart = require('../models/Cart');
const Book = require('../models/Book');
const User = require('../models/User');


// Добавление товара в корзину


exports.addToCart = async (req, res) => {
    try {
      const { bookId } = req.params;
      const userId = req.user._id; // Get the user's ID from the authentication
  
      // Find the user
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Check if the book is already in the cart
      const existingCartItem = user.cart.find(item => item.book.toString() === bookId);
      if (existingCartItem) {
        existingCartItem.quantity++; // Increment the quantity of the existing item
        await existingCartItem.save();
      } else {
        // Create a new cart item
        const newCartItem = new Cart({
          user: userId,
          book: bookId,
          quantity: 1
        });
        user.cart.push(newCartItem); // Add the new item to the user's cart
        await user.save();
      }
  
      res.status(201).json({ message: 'Book added to cart' });
    } catch (error) {
      console.error('Error adding book to cart:', error);
      res.status(500).json({ message: 'Error adding book to cart' });
    }
  };


// Просмотр содержимого корзины
exports.viewCart = async (req, res) => {
    try {
        const { userId } = req.user; // Получаем ID пользователя из аутентификации
        const user = await User.findById(userId).populate({
            path: 'cart',
            populate: { path: 'book' } // Заполнить детали о книгах
        });
        if (!user) {
            return res.status(404).json({ message: 'Пользователь не найден' });
        }
        res.status(200).json(user.cart);
    } catch (error) {
        console.error('Ошибка при просмотре корзины:', error);
        res.status(500).json({ message: 'Произошла ошибка при просмотре корзины' });
    }
};

// Обновление товара в корзине
exports.updateCartItem = async (req, res) => {
    try {
        const { itemId } = req.params;
        const { quantity } = req.body;

        const updatedItem = await Cart.findByIdAndUpdate(itemId, { quantity }, { new: true });
        res.status(200).json(updatedItem);
    } catch (error) {
        console.error('Ошибка при обновлении товара в корзине:', error);
        res.status(500).json({ message: 'Произошла ошибка при обновлении товара в корзине' });
    }
};

// Удаление товара из корзины
exports.removeCartItem = async (req, res) => {
    try {
        const { itemId } = req.params;

        await Cart.findByIdAndDelete(itemId);
        res.status(200).json({ message: 'Товар удален из корзины' });
    } catch (error) {
        console.error('Ошибка при удалении товара из корзины:', error);
        res.status(500).json({ message: 'Произошла ошибка при удалении товара из корзины' });
    }
};

// Очистка корзины
exports.clearCart = async (req, res) => {
    try {
        const { userId } = req.user; // Получаем ID пользователя из аутентификации

        await Cart.deleteMany({ user: userId });
        res.status(200).json({ message: 'Корзина очищена' });
    } catch (error) {
        console.error('Ошибка при очистке корзины:', error);
        res.status(500).json({ message: 'Произошла ошибка при очистке корзины' });
    }
};


exports.addCartItem = async (req, res) => {
  try {
    const { bookId } = req.body;
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
      cart = new Cart({ user: req.user._id });
    }

    const existingCartItem = cart.items.find(item => item.book.toString() === bookId);
    if (existingCartItem) {
      existingCartItem.quantity++;
    } else {
      cart.items.push({ book: bookId, quantity: 1 });
    }

    await cart.save();
    res.json({ message: 'Item added to cart' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error adding item to cart' });
  }
};

exports.updateCartItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;

    const cartItem = await Cart.findOne({ 'items._id': id });
    if (!cartItem) {
      return res.status(404).json({ message: 'Cart item not found' });
    }

    const itemIndex = cartItem.items.findIndex(item => item._id.toString() === id);
    if (itemIndex === -1) {
      return res.status(404).json({ message: 'Cart item not found' });
    }

    cartItem.items[itemIndex].quantity = quantity;
    await cartItem.save();
    res.json({ message: 'Cart item updated' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating cart item' });
  }
};