require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');

const noteRoutes = require('./routes/notes');
const errorHandler = require('./middleware/errorHandle');

const app = express();

app.use(express.json());

app.use('/api/notes', noteRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error('Database connection error:', err);
    });