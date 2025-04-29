import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <nav className="bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 text-2xl font-bold">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <span className="tracking-wide hover:text-blue-100 transition-colors">TodoMaster</span>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="flex justify-center">
            <Link
              to="/"
              className={`px-4 py-2 rounded-md transition-colors duration-200 font-medium ${
                isActive('/') 
                  ? 'bg-white text-blue-800' 
                  : 'hover:bg-blue-700'
              }`}
            >
              Home
            </Link>
            <Link
              to="/add"
              className={`px-4 py-2 rounded-md transition-colors duration-200 font-medium ${
                isActive('/add') 
                  ? 'bg-white text-blue-800' 
                  : 'hover:bg-blue-700'
              }`}
            >
              Add Todo
            </Link>
            <Link
              to="/completed"
              className={`px-4 py-2 rounded-md transition-colors duration-200 font-medium ${
                isActive('/completed') 
                  ? 'bg-white text-blue-800' 
                  : 'hover:bg-blue-700'
              }`}
            >
              Completed
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex justify-center
          ">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-white"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isActive('/') 
                  ? 'bg-white text-blue-800' 
                  : 'hover:bg-blue-700'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/add"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isActive('/add') 
                  ? 'bg-white text-blue-800' 
                  : 'hover:bg-blue-700'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Add Todo
            </Link>
            <Link
              to="/completed"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isActive('/completed') 
                  ? 'bg-white text-blue-800' 
                  : 'hover:bg-blue-700'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Completed
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;