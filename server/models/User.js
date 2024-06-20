// server/models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const addressSchema = new mongoose.Schema({
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true }
});

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true, // Удаляет начальные и конечные пробелы из email
        validate: {
            validator: function(v) {
                // Используем регулярное выражение для проверки формата email
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
            },
            message: props => `${props.value} не является корректным email адресом`
        }
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: false
    },
    address: [addressSchema],
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    orders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }] ,
    cart: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Cart' }],

});

// Hash the password before saving the user
UserSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Method to compare password
UserSchema.methods.matchPassword = async function(password) {
    return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('User', UserSchema);
