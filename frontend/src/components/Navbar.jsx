import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Image from "../assets/logos.png";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser && storedUser.name) {
      setUser(storedUser);
    }
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleClickOutside = (event) => {
    if (
      !event.target.closest(".navbar-menu") &&
      !event.target.closest(".md\\:hidden")
    ) {
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleAvatarClick = () => {
    navigate("/dashboard");
  };

  const getUserInitial = () => {
    return user?.name?.charAt(0)?.toUpperCase() || "U";
  };

  return (
    <nav className="bg-gray-900 p-4 text-white flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <img src={Image} alt="Logo" className="h-8 w-8 rounded-full" />
        <span className="font-bold text-xl">Library Management</span>
      </div>

      <div className="hidden md:flex space-x-6">
        <Link to="/" className="hover:text-gray-300">Home</Link>
        <Link to="/dashboard" className="hover:text-gray-300">Dashboard</Link>
        <Link to="/books" className="hover:text-gray-300">Books</Link>
        <Link to="/admin" className="hover:text-gray-300">Admin</Link>
      </div>

      {/* Auth Section */}
      <div className="hidden md:flex items-center space-x-4">
        {user ? (
          <div
            onClick={handleAvatarClick}
            className="bg-white text-gray-800 w-8 h-8 rounded-full flex items-center justify-center cursor-pointer font-semibold hover:bg-gray-200"
            title={user.name}
          >
            {getUserInitial()}
          </div>
        ) : (
          <>
            <Link to="/login" className="hover:text-gray-300">Login</Link>
            <Link to="/signup" className="hover:text-gray-300">Register</Link>
          </>
        )}
      </div>

      {/* Mobile Hamburger */}
      <div className="md:hidden flex items-center">
        <button onClick={toggleMenu} className="text-white">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="navbar-menu md:hidden absolute top-0 left-0 w-full bg-gray-900 p-4 space-y-4 z-50">
          <Link to="/" className="block hover:text-gray-300" onClick={() => setIsMenuOpen(false)}>Home</Link>
          <Link to="/dashboard" className="block hover:text-gray-300" onClick={() => setIsMenuOpen(false)}>Dashboard</Link>
          <Link to="/books" className="block hover:text-gray-300" onClick={() => setIsMenuOpen(false)}>Books</Link>
          <Link to="/admin" className="block hover:text-gray-300" onClick={() => setIsMenuOpen(false)}>Admin</Link>

          <div className="space-x-4">
            {user ? (
              <div
                onClick={() => {
                  setIsMenuOpen(false);
                  handleAvatarClick();
                }}
                className="bg-white text-gray-800 w-8 h-8 rounded-full flex items-center justify-center cursor-pointer font-semibold hover:bg-gray-200"
                title={user.name}
              >
                {getUserInitial()}
              </div>
            ) : (
              <>
                <Link to="/login" className="block hover:text-gray-300" onClick={() => setIsMenuOpen(false)}>Login</Link>
                <Link to="/signup" className="block hover:text-gray-300" onClick={() => setIsMenuOpen(false)}>Register</Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
