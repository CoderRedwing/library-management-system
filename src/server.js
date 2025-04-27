require('dotenv').config();
const express = require('express');

const app = express();
const path = require('path');
const authRoutes = require('./routes/authRoutes');
const bookRoutes = require('./routes/bookRoutes');
const adminRoutes = require('./routes/adminRoutes');
const connectDb = require('./config/db');

connectDb();
app.use(express.json());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes);
app.use('/admin', adminRoutes);

const PORT = 5000;

app.listen(PORT, () => console.log(`server running on port ${PORT}`));