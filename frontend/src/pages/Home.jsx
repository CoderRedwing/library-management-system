import home from '../assets/home.jpg';
import home1 from '../assets/home1.jpg';

function Home() {
  return (
    <div className="bg-black text-white min-h-screen flex flex-col">

      {/* Top Section with Background Image 1 */}
      <section className="relative w-full h-[80vh] flex items-center justify-start px-20">
        <img
          src={home1}
          alt="Library"
          className="absolute inset-0 w-full h-full object-cover opacity-20"
        />
        <div className="relative z-10 max-w-2xl">
          <h1 className="text-5xl font-bold mb-6">Welcome to Our Library Management System</h1>
          <p className="text-lg text-gray-300">
            Simplifying library operations with smart technology. Organize, track, and grow your library with ease.
          </p>
        </div>
      </section>

      {/* What We Are Section */}
      <section className="py-20 bg-black bg-opacity-90 px-20 text-left">
        <h2 className="text-4xl font-semibold text-blue-400 mb-6">What We Are</h2>
        <p className="text-lg text-gray-400 max-w-3xl">
          We are a next-generation platform that helps libraries digitally transform and manage their book collections, members, and operations efficiently and securely.
        </p>
      </section>

      {/* Why We Are Unique */}
      <section className="py-20 bg-gray-900 bg-opacity-90 px-20 text-left">
        <h2 className="text-4xl font-semibold text-blue-400 mb-6">Why We Are Unique</h2>
        <p className="text-lg text-gray-400 max-w-3xl">
          Our system is not just about managing books; it's about building a smart library ecosystem where access to information is seamless, secure, and user-friendly.
        </p>
      </section>

      {/* Our Services */}
      <section className="py-20 bg-black bg-opacity-90 px-20">
        <h2 className="text-4xl font-semibold text-blue-400 mb-8">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="bg-gray-800 p-8 rounded-lg shadow-lg">
            <h3 className="text-2xl font-semibold mb-4">Book Management</h3>
            <p className="text-gray-400">Seamlessly add, edit, organize, and manage your book inventory with a click.</p>
          </div>
          <div className="bg-gray-800 p-8 rounded-lg shadow-lg">
            <h3 className="text-2xl font-semibold mb-4">Membership System</h3>
            <p className="text-gray-400">Automate member registration, renewals, and activity tracking effortlessly.</p>
          </div>
          <div className="bg-gray-800 p-8 rounded-lg shadow-lg">
            <h3 className="text-2xl font-semibold mb-4">Reports and Insights</h3>
            <p className="text-gray-400">Detailed analytics to help you grow and understand your community better.</p>
          </div>
        </div>
        </section>

        {/* Features */}
      <section className="py-20 bg-black bg-opacity-80 px-20">
        <h2 className="text-4xl font-semibold text-blue-400 mb-8">Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="bg-gray-800 p-8 rounded-lg shadow-lg">
            <h3 className="text-2xl font-semibold mb-4">Advanced Search</h3>
            <p className="text-gray-400">Powerful search across books, authors, categories, and members.</p>
          </div>
          <div className="bg-gray-800 p-8 rounded-lg shadow-lg">
            <h3 className="text-2xl font-semibold mb-4">Real-Time Updates</h3>
            <p className="text-gray-400">All changes reflected instantly for better collaboration.</p>
          </div>
          <div className="bg-gray-800 p-8 rounded-lg shadow-lg">
            <h3 className="text-2xl font-semibold mb-4">Security First</h3>
            <p className="text-gray-400">Industry-grade security to protect your data and member privacy.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white text-center py-6 mt-12">
        <p>© 2025 Library Management System | All Rights Reserved</p>
      </footer>

    </div>
  );
}

export default Home;
