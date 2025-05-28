import { useState } from "react";

const dummyBooks = [
  { 
    id: 1, 
    title: "The Alchemist", 
    author: "Paulo Coelho", 
    status: "Available",
    image: "https://m.media-amazon.com/images/I/51Z0nLAfLmL.jpg"
  },
  { 
    id: 2, 
    title: "Atomic Habits", 
    author: "James Clear", 
    status: "Issued",
    image: "https://m.media-amazon.com/images/I/91bYsX41DVL.jpg"
  },
  { 
    id: 3, 
    title: "Sapiens", 
    author: "Yuval Noah Harari", 
    status: "Available",
    image: "https://m.media-amazon.com/images/I/713jIoMO3UL.jpg"
   },
  
  { 
    id: 4, 
    title: "Sapiens", 
    author: "Yuval Noah Harari", 
    status: "Available",
    image: "https://m.media-amazon.com/images/I/713jIoMO3UL.jpg"
  },
  
];

function BookManagement() {
  const [selectedBook, setSelectedBook] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");

  const handleCardClick = (book) => {
    setSelectedBook(book);
  };

  const handleCloseModal = () => {
    setSelectedBook(null);
  };

  const handleIssueBook = () => {
    if (selectedBook && selectedBook.status === "Available") {
      alert(`You have issued "${selectedBook.title}"!`);
      setSelectedBook({ ...selectedBook, status: "Issued" });
    }
  };

  const filteredBooks = dummyBooks.filter((book) => {
    const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           book.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === "All" || book.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <h1 className="text-4xl font-bold mb-8">Book Management</h1>

      {/* Search and Filter */}
<div className="flex flex-col md:flex-row items-center mb-8 gap-4">
  <input
    type="text"
    placeholder="Search by title or author..."
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    className="p-3 rounded-lg w-full md:w-1/2 
               bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-400"
  />
  <select
    value={filterStatus}
    onChange={(e) => setFilterStatus(e.target.value)}
    className="p-3 rounded-lg w-full md:w-1/4 
               bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-400"
  >
    <option value="All">All</option>
    <option value="Available">Available</option>
    <option value="Issued">Issued</option>
  </select>
</div>

      {/* Books Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-center">
        {filteredBooks.map((book) => (
          <div
            key={book.id}
            className="bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition cursor-pointer flex flex-col"
            onClick={() => handleCardClick(book)}
          >
            <img 
              src={book.image} 
              alt={book.title} 
              className="h-48 w-full object-cover"
            />
            <div className="p-4 flex flex-col flex-grow">
              <h2 className="text-lg font-semibold mb-1">{book.title}</h2>
              <p className="text-gray-400 text-sm mb-2">by {book.author}</p>
              <span className={`text-xs font-semibold mt-auto ${book.status === "Available" ? "text-green-400" : "text-red-400"}`}>
                {book.status}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedBook && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-50">
          <div className="bg-gray-900 p-8 rounded-lg w-full max-w-md relative">
            <img 
              src={selectedBook.image} 
              alt={selectedBook.title} 
              className="h-60 w-full object-cover rounded mb-6"
            />
            <h2 className="text-3xl font-bold mb-4">{selectedBook.title}</h2>
            <p className="mb-2"><span className="font-semibold">Author:</span> {selectedBook.author}</p>
            <p className="mb-2"><span className="font-semibold">Genre:</span> Fiction</p>
            <p className="mb-2"><span className="font-semibold">Year:</span> 1988</p>
            <p className="mb-4"><span className="font-semibold">Status:</span> {selectedBook.status}</p>

            {selectedBook.status === "Available" && (
              <button
                onClick={handleIssueBook}
                className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-lg text-white font-semibold mr-4"
              >
                Issue Book
              </button>
            )}

            <button
              onClick={handleCloseModal}
              className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg text-white font-semibold"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default BookManagement;
