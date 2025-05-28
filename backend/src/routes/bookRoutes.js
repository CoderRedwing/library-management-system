const express = require('express');
const router = express.Router();
const { addBook, getAllBooks, getBookById,
    getBookByGenre,
    getBookByAuthor,
    updateBook,
    deleteBook,
    searchAndFilterBooks } = require('../controllers/bookController');
const { authenticate, authorizeAdmin, } = require('../middlewares/authMiddleware');
const { upload } = require('../middlewares/uploadMiddleware');

router.post('/add', authenticate, authorizeAdmin, upload.single('coverImage'), addBook);

router.get('/', authenticate, getAllBooks);

router.get('/:id',authenticate, getBookById);

router.get('/genre/:genre', authenticate, getBookByGenre);
router.get('/author/:author', authenticate, getBookByAuthor);
router.get('/search-filter', authenticate, searchAndFilterBooks);

router.put('/:id', authenticate, authorizeAdmin, updateBook);

router.delete('/:id', authenticate, authorizeAdmin, deleteBook);

module.exports = router;