const fs = require('fs');
const path = require('path');
const Book = require("../models/book.model");
const User = require('../models/user.model');
const IssuedBook = require('../models/issued.book');


const addBook = async (req, res) => {
    try {
        const { title, author, genre } = req.body;
        const coverImage = req.file ? req.file.filename : null; 
    
        if (!title || !author || !genre) {
            return res.status(400).json({ message: "Please provide title , auther and genre " });
        }

        const existingBook = await Book.findOne({ title, author });

        if (existingBook) {
            if (coverImage) {
                const imagePath = path.join(__dirname, '..', '..', 'uploads', coverImage);
                fs.unlink(imagePath, (err) => {
                    if (err) {
                        console.error('Error deleting file:', err);
                    }
                });
            }
            return res.status(400).json({ message: "This book already exists" });
        }
    
        const newBook = new Book({
        title,
        author,
        genre,
        coverImage
        });
    
        await newBook.save();
    
        res.status(201).json({ message: "Book added successfully", book: newBook });
    } catch (error) {
        
    }
};

const getAllBooks = async (req, res) => {
    try {
        let { page = 1, limit = 10, sort = 'asc' } = req.query;
        page = parseInt(page);
        limit = parseInt(limit);

        const skip = (page - 1) * limit;
        const sortOrder = sort === 'desc' ? -1 : 1;

        const books = await Book.find()
            .skip(skip)
            .limit(limit)
            .sort({ title: sortOrder });

        const totalBooks = await Book.countDocuments();

        const booksWithImageUrl = books.map(book => ({
            ...book.toObject(),
            coverImageUrl: `http://localhost:5000/uploads/${book.coverImage}`
        }));

        res.status(200).json({
            page,
            limit,
            totalBooks,
            books: booksWithImageUrl
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};



const getBookById = async (req, res) => {
    try {
        const id = req.params.id;
        const book = await Book.findById(id);

        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }

        res.status(200).json({ book });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const getBookByGenre = async (req, res) => {
    try {
        const genre = req.params.genre.toLowerCase();
        const book = await Book.findOne({ genre });
        if (!book) {
           return res.status(404).json({ message: "No book found for this genre" });
        }
        res.status(200).json({ books: book });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const getBookByAuthor = async (req, res) => {
    try {
        const author = req.params.author.toLowerCase();
        const book = await Book.findOne({ genre });
        if (!book) {
           return res.status(404).json({ message: "No book found for this author" });
        }
        
        res.status(200).json({ books: book });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const updateBook = async (req, res) => {
    try {
        const id = req.params.id;
        const { title, author, genre } = req.body;
        const book = await Book.findById(id);
    
        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }
        if (title) {
            book.title = title;
        }
        if (author) {
            book.author = author;
        }
        if (genre) {
            book.genre = genre;
        }
    
        res.status(200).json({ message: "Book updated successfully", book });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const deleteBook = async (req, res) => {
    try {
        const id = req.params.id;
        const book = await Book.findById(id);

        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }

        await Book.findByIdAndDelete(id);

        res.status(200).json({ message: "Book deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};


const searchAndFilterBooks = async (req, res) => {
    try {
        const { keyword, genre } = req.query;

        let query = {};

        if (keyword) {
            query.$or = [
                { title: { $regex: keyword, $options: 'i' } },
                { author: { $regex: keyword, $options: 'i' } }
            ];
        }

        if (genre) {
            query.genre = { $regex: genre, $options: 'i' };
        }

        const books = await Book.find(query);

        if (books.length === 0) {
            return res.status(404).json({ message: "No books found" });
        }

        const booksWithImageUrl = books.map(book => ({
            ...book.toObject(),
            coverImageUrl: `http://localhost:5000/uploads/${book.coverImage}`
        }));

        res.status(200).json({
            totalResults: books.length,
            books: booksWithImageUrl
        });
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const getTotalBooks = async (req, res) => {

    try {
        const totalBooks = await Book.countDocuments();
        res.status(200).json({
            totalBooks
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const getTotalUsers = async (req, res) => {
    try {
        const totalUsers = await User.countDocuments();
        res.status(200).json({ totalUsers });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const getRecentBooks = async (req, res) => {
    try {
        const recentBooks = await Book.find().sort({ createdAt: -1 }).limit(5);

        res.status(200).json({
            recentBooks: recentBooks.map(book => ({
                ...book.toObject(),
                coverImageUrl: `http://localhost:5000/uploads/${book.coverImage}`
            }))
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const getBooksPerGenre = async (req, res) => {
    try {
        const books = await Book.find();
        const genreCount = {};

        books.forEach(book => {
            const genre = book.genre;
            genreCount[genre] = (genreCount[genre] || 0) + 1;
        });

        res.status(200).json({ booksPerGenre: genreCount });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const issueBook = async (req, res) => {
    try {
        const { bookId } = req.body;
        const userId = req.user._id;

        const book = await Book.findById(bookId);
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }

        const existingIssue = await IssuedBook.findOne({
          user: req.user._id,
          book: bookId,
          status: 'issued' 
        });

        if (existingIssue) {
           return res.status(400).json({ message: "You have already issued this book" });
        }


        const dueDate = new Date();
        dueDate.setDate(dueDate.getDate() + 7); 

        const issuedBook = new IssuedBook({
            user: userId,
            book: bookId,
            dueDate: dueDate,
        });

        await issuedBook.save();

        res.status(201).json({ message: 'Book issued successfully', issuedBook });
    } catch (error) {
        console.error('Error issuing book:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

const returnBook = async (req, res) => {
    try {
        const { issueId } = req.params;
        const issuedRecord = await IssuedBook.findById(issueId);

        if (!issuedRecord) {
            return res.status(404).json({ message: "Issued Record Not found" });
        }

        if (issuedRecord.status !== 'issued') {
            return res.status(400).json({ message: `Book already ${issuedRecord.status}` });
        }

        issuedRecord.status = 'returned';
        issuedRecord.returnDate = new Date();

        await issuedRecord.save();

        res.status(200).json({ message: "Book returned successfully" });
    } catch (error) {
        console.error('Error returning book:', error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const checkExpiry = async (req, res) => {
    try {
        const expiredBooks = await IssuedBook.updateMany(
            {
                status: 'issued',
                dueDate: { $lte: new Date() }
            },
            {
                $set: { status: 'expired' }
            }
        );

        res.status(200).json({ message: "Expiry check completed", result: expiredBooks });
    } catch (error) {
        console.error('Error checking expiry:', error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const getIssuedBooks = async (req, res) => {
  try {
    const issuedBooks = await IssuedBook.find({ status: 'issued' })  // Only show currently issued books
      .populate('user', 'name email')
      .populate('book', 'title author');

    res.status(200).json({ issuedBooks });
  } catch (error) {
    console.error('Error fetching issued books:', error);
    res.status(500).json({ message: 'Failed to fetch issued books' });
  }
};

const getIssueHistory = async (req, res) => {
  try {
    const issueHistory = await IssuedBook.find()  // Show full issue history
      .populate('user', 'name email')
      .populate('book', 'title author');

    res.status(200).json({ issueHistory });
  } catch (error) {
    console.error('Error fetching issue history:', error);
    res.status(500).json({ message: 'Failed to fetch issue history' });
  }
};



module.exports = {
    addBook,
    getAllBooks,
    getBookById,
    getBookByGenre,
    getBookByAuthor,
    updateBook,
    deleteBook,
    searchAndFilterBooks,
    getTotalBooks,
    getTotalUsers,
    getRecentBooks,
    getBooksPerGenre,
    issueBook,
    returnBook,
    checkExpiry,
    getIssuedBooks,
    getIssueHistory
};