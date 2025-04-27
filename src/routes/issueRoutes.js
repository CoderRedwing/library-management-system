const express = require('express');
const router = express.Router();
const {issueBook, returnBook, checkExpiry, getIssuedBooks, getIssueHistory}  = require('../controllers/bookController');
const { authenticate } = require('../middlewares/authMiddleware');


router.post('/issue', authenticate, issueBook);
router.post('/return/:issueId', authenticate, returnBook);
router.post('/check-expiry', authenticate, checkExpiry);
router.get('/issued-books', authenticate, getIssuedBooks);

router.get('/issue-history', authenticate, getIssueHistory);

module.exports = router;
