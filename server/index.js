const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cors = require('cors');

dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(cors());

const PORT = process.env.PORT || 5000;

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Import Routes
const booksRoute = require('./routes/books');
const authRoute = require('./routes/auth');
const authorsRoute = require('./routes/author');
const publisherRoute = require('./routes/publisher');
const categoryRoute = require('./routes/category');
const subcategoryRoute = require('./routes/subcategory');


// Route Middlewares
app.use('/api/books', booksRoute);
app.use('/api/auth', authRoute);
app.use('/api/author', authorsRoute);
app.use('/api/publisher', publisherRoute);
app.use('/api/category', categoryRoute);
app.use('/api/subcategory', subcategoryRoute);


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
