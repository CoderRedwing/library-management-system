function Dashboard() {
  return (
    <div className="min-h-screen bg-black text-white px-8 py-12">

      {/* Welcome Message */}
      <h1 className="text-4xl font-bold mb-8">Welcome Back, Ajitesh!</h1>

      {/* Profile Overview */}
      <section className="bg-gray-800 p-6 rounded-lg shadow-lg mb-10">
        <h2 className="text-2xl font-semibold mb-4">Your Profile</h2>
        <div className="flex items-center gap-6">
          <img
            src="https://via.placeholder.com/100"
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover"
          />
          <div>
            <p><span className="font-semibold">Name:</span> Ajitesh</p>
            <p><span className="font-semibold">Member ID:</span> #123456</p>
            <p><span className="font-semibold">Status:</span> Active</p>
          </div>
        </div>
      </section>

      {/* Borrowed & Reserved Books */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Currently Borrowed Books</h2>
          <ul className="text-gray-400">
            <li>📖 The Alchemist - Due: May 15, 2025</li>
            <li>📖 Atomic Habits - Due: May 20, 2025</li>
          </ul>
        </div>

        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Reserved Books</h2>
          <ul className="text-gray-400">
            <li>📖 Sapiens - Available until May 10, 2025</li>
          </ul>
        </div>
      </section>

      {/* Borrowing History */}
      <section className="bg-gray-800 p-6 rounded-lg shadow-lg mb-10">
        <h2 className="text-2xl font-semibold mb-4">Borrowing History</h2>
        <ul className="text-gray-400">
          <li>✔️ Rich Dad Poor Dad (Returned on Apr 10, 2025)</li>
          <li>✔️ Deep Work (Returned on Mar 20, 2025)</li>
        </ul>
      </section>

      {/* Notifications */}
      <section className="bg-gray-800 p-6 rounded-lg shadow-lg mb-10">
        <h2 className="text-2xl font-semibold mb-4">Notifications</h2>
        <ul className="text-red-400">
          <li>⚠️ The Alchemist is due soon. Return by May 15, 2025.</li>
        </ul>
      </section>

      {/* Recommended Books */}
      <section className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">Recommended for You</h2>
        <div className="flex gap-6 overflow-x-auto">
          <div className="min-w-[150px] bg-gray-700 p-4 rounded-lg">
            📚 Ikigai
          </div>
          <div className="min-w-[150px] bg-gray-700 p-4 rounded-lg">
            📚 Think Like a Monk
          </div>
          <div className="min-w-[150px] bg-gray-700 p-4 rounded-lg">
            📚 Zero to One
          </div>
        </div>
      </section>

    </div>
  );
}

export default Dashboard;
