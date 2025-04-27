require('dotenv').config();
const express = require('express');
const cron = require('node-cron');

const app = express();
const path = require('path');
const authRoutes = require('./routes/authRoutes');
const bookRoutes = require('./routes/bookRoutes');
const adminRoutes = require('./routes/adminRoutes');
const connectDb = require('./config/db');
const issueRoutes = require('./routes/issueRoutes');
const { checkBookExpiry } = require('./controllers/book.expiry.controller');



connectDb();
app.use(express.json());

cron.schedule('0 9 * * *', async () => {
  const currentTime = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
  console.log(`Cron job triggered at: ${currentTime}`);
  await checkBookExpiry();
}, {
  scheduled: true,
  timezone: "Asia/Kolkata"
});




app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes);
app.use('/admin', adminRoutes);
app.use('/api/book', issueRoutes);

const PORT = 5000;

app.listen(PORT, () => console.log(`server running on port ${PORT}`));