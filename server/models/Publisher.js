const mongoose = require('mongoose');

const publisherSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    logoUrl: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Publisher', publisherSchema);
