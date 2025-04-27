
const books = [];

const addBook = async (req, res) => {
    const { title, author, genre } = req.body;
    const coverImage = req.file ? req.file.filename : null; 

    if (!title || !author || !genre) {
        return res.status(400).json({ message: "Please provide title , auther and genre " });
    }

    const newBook = {
        id: books.length + 1,
        title,
        author,
        genre,
        coverImage
    };

    books.push(newBook);

    res.status(201).json({ message: "Book added successfully", book: newBook });
};

const getAllBooks = (req, res) => {
    let { page = 1, limit = 10, sort = "asc" } = req.query; // NEW

    page = parseInt(page);
    limit = parseInt(limit);

    let sortedBooks = [...books];

    if (sort === "desc") {
        sortedBooks = sortedBooks.reverse();
    }

    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;

    const paginatedBooks = sortedBooks.slice(startIndex, endIndex);

    const booksWithImageUrl = paginatedBooks.map(book => ({
        ...book,
        coverImageUrl: `http://localhost:5000/uploads/${book.coverImage}`
    }));

    res.status(200).json({
        page,
        limit,
        totalBooks: books.length,
        books: booksWithImageUrl
    });
};

const getBookById = (req, res) => {
    const id = parseInt(req.params.id);
    const book = books.find(book => book.id === id);

    if (!book) {
        return res.status(404).json({ message: "book not Found" });
    }

    res.status(200).json({ book });

};

const getBookByGenre = (req, res) => {
    const genre = req.params.genre.toLowerCase();
    const filterBooks = books.filter(book => book.genre.toLowerCase() === genre);
    if (filterBooks.length === 0) {
    return res.status(404).json({ message: "No book found for this author" });
    }
    res.status(200).json({ books: filterBooks });
};

const getBookByAuthor = (req, res) => {
    const author = req.params.author.toLowerCase();
    const filterBooks = books.filter(book => book.author.toLowerCase() === author);

    if (filterBooks.length === 0) {
        return res.status(404).json({ message: "No book found for this author" });
    }
    res.status(200).json({ books: filterBooks });
};

const updateBook = (req, res) => {
    const id = parseInt(req.params.id);
    const { title, author, genre } = req.body;
    const book = books.find(book => book.id === id);

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
};

const deleteBook = (req, res) => {
    const id = parseInt(req.params.id);
    const index = books.findIndex(book => book.id === id);

    if (index === -1) {
        return res.status(404).json({ message: "Book not found" });
    }
    books.splice(index, 1);

    res.status(200).json({ message: "Book deleted successfully" });
};


const searchAndFilterBooks = (req, res) => {
    const { keyword, genre } = req.query;

    console.log('All Books:', books);
    console.log('Keyword:', keyword, 'Genre:', genre);

    let filteredBooks = [...books];
    console.log(filteredBooks);

    if (keyword) {
        filteredBooks = filteredBooks.filter(book => 
            book.title.toLowerCase().includes(keyword.toLowerCase()) ||
            book.author.toLowerCase().includes(keyword.toLowerCase())
        );
    }

    console.log('After keyword filter:', filteredBooks);

    if (genre) {
        filteredBooks = filteredBooks.filter(book => 
            book.genre.toLowerCase() === genre.toLowerCase()
        );
    }

    console.log('After genre filter:', filteredBooks);

    if (filteredBooks.length === 0) {
        return res.status(404).json({ message: "No books found" });
    }


    res.status(200).json({
        totalResults: filteredBooks.length,
        books: filteredBooks.map(book => ({
            ...book,
            coverImageUrl: `http://localhost:5000/uploads/${book.coverImage}`
        }))
    });
};

const getTotalBooks = (req, res) => {
    res.status(200).json({
        totalBooks: books.length
    });
};

const getTotalUsers = (req, res) => {
    res.status(200).json({
        totalUsers: users.length
    });
};

const getRecentBooks = (req, res) => {
    const recentBooks = books.slice(-5).reverse(); 

    res.status(200).json({
        recentBooks: recentBooks.map(book => ({
            ...book,
            coverImageUrl: `http://localhost:5000/uploads/${book.coverImage}`
        }))
    });
};

const getBooksPerGenre = (req, res) => {
    const genreCount = {};

    books.forEach(book => {
        const genre = book.genre;
        genreCount[genre] = (genreCount[genre] || 0) + 1;
    });

    res.status(200).json({
        booksPerGenre: genreCount
    });
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
    getBooksPerGenre
};