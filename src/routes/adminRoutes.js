const express = require('express');
const router = express.Router();

const { getTotalBooks, getTotalUsers, getRecentBooks, getBooksPerGenre } = require('../controllers/bookController');
const { authenticate, authorizeAdmin } = require('../middlewares/authMiddleware');

router.get('/total-books', authenticate, authorizeAdmin, getTotalBooks);
router.get('/total-users', authenticate, authorizeAdmin, getTotalUsers);
router.get('/recent-books', authenticate, authorizeAdmin, getRecentBooks);
router.get('/books-per-genre', authenticate, authorizeAdmin, getBooksPerGenre);

module.exports = router;
