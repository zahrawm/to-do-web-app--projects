import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold">
              Todo App
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/" className="hover:bg-blue-700 px-3 py-2 rounded">
              Home
            </Link>
            <Link to="/add" className="hover:bg-blue-700 px-3 py-2 rounded">
              Add Todo
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;