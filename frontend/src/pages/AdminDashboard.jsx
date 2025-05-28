import { useState } from "react";

function AdminDashboard() {
  // Dummy Data
  const dummyBooks = [
    { id: 1, title: "The Alchemist", author: "Paulo Coelho", status: "Available" },
    { id: 2, title: "Atomic Habits", author: "James Clear", status: "Issued" },
    { id: 3, title: "Sapiens", author: "Yuval Noah Harari", status: "Available" },
    { id: 4, title: "1984", author: "George Orwell", status: "Available" },
    { id: 5, title: "Educated", author: "Tara Westover", status: "Issued" },
    { id: 6, title: "The Catcher in the Rye", author: "J.D. Salinger", status: "Available" },
  ];

  const dummyMembers = [
    { id: 1, name: "John Doe", email: "johndoe@example.com" },
    { id: 2, name: "Jane Smith", email: "janesmith@example.com" },
    { id: 3, name: "Alice Brown", email: "alicebrown@example.com" },
    { id: 4, name: "Bob Johnson", email: "bobjohnson@example.com" },
  ];

  const dummyRequests = [
    { id: 1, book: "The Alchemist", member: "John Doe", status: "Pending" },
    { id: 2, book: "Atomic Habits", member: "Jane Smith", status: "Approved" },
    { id: 3, book: "Sapiens", member: "Alice Brown", status: "Pending" },
  ];

  const [selectedBook, setSelectedBook] = useState(null);

  const handleCardClick = (book) => {
    setSelectedBook(book);
  };

  const handleCloseModal = () => {
    setSelectedBook(null);
  };

  const handleApproveRequest = (id) => {
    alert(`Issue request for book ID: ${id} has been approved!`);
  };

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <h1 className="text-3xl font-bold mb-8 text-blue-600">Library Admin Dashboard</h1>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-12">
        <div className="bg-gray-800 p-6 rounded-lg shadow-md text-white cursor-pointer">
          <h2 className="text-xl font-semibold mb-2">Total Books</h2>
          <p className="text-2xl font-bold">{dummyBooks.length}</p>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg shadow-md text-white cursor-pointer">
          <h2 className="text-xl font-semibold mb-2">Issued Books</h2>
          <p className="text-2xl font-bold">{dummyBooks.filter(book => book.status === "Issued").length}</p>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg shadow-md text-white cursor-pointer">
          <h2 className="text-xl font-semibold mb-2">Available Books</h2>
          <p className="text-2xl font-bold">{dummyBooks.filter(book => book.status === "Available").length}</p>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg shadow-md text-white cursor-pointer">
          <h2 className="text-xl font-semibold mb-2">Total Members</h2>
          <p className="text-2xl font-bold">{dummyMembers.length}</p>
        </div>
      </div>

      {/* Manage Books Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-gray-800 text-white p-6 rounded-lg shadow-md hover:bg-gray-700 cursor-pointer">
          <h2 className="text-2xl font-bold mb-2">Manage Books</h2>
          <p>Add, edit, or delete book records</p>
        </div>
        <div className="bg-gray-800 text-white p-6 rounded-lg shadow-md hover:bg-gray-700 cursor-pointer">
          <h2 className="text-2xl font-bold mb-2">Manage Members</h2>
          <p>View or remove members</p>
        </div>
        <div className="bg-gray-800 text-white p-6 rounded-lg shadow-md hover:bg-gray-700 cursor-pointer">
          <h2 className="text-2xl font-bold mb-2">Reports</h2>
          <p>View borrowing reports</p>
        </div>
      </div>

      {/* Issue Requests Section */}
      <div className="bg-gray-800 p-6 rounded-lg shadow-md text-white mb-12">
        <h2 className="text-2xl font-semibold mb-4">Issue Requests</h2>
        <div className="space-y-4">
          {dummyRequests.map((request) => (
            <div key={request.id} className="flex justify-between items-center">
              <p>
                <span className="font-semibold">{request.book}</span> requested by {request.member} ({request.status})
              </p>
              {request.status === "Pending" && (
                <button
                  onClick={() => handleApproveRequest(request.id)}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
                >
                  Approve
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Book Detail Modal */}
      {selectedBook && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-50">
          <div className="bg-gray-900 p-8 rounded-lg w-full max-w-md relative">
            <h2 className="text-3xl font-bold mb-4">{selectedBook.title}</h2>
            <p className="mb-2"><span className="font-semibold">Author:</span> {selectedBook.author}</p>
            <p className="mb-4"><span className="font-semibold">Status:</span> {selectedBook.status}</p>

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

export default AdminDashboard;
