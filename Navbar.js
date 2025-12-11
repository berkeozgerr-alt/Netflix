import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaSearch, FaBell, FaUserCircle } from 'react-icons/fa';
import { AiFillHome } from 'react-icons/ai';
import { MdLocalMovies, MdTv } from 'react-icons/md';

const Navbar = () => {
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/browse?search=${search}`);
      setSearch('');
    }
  };

  return (
    <nav className="fixed top-0 w-full z-50 transition-all duration-500 bg-gradient-to-b from-black/70 to-transparent">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-netflix-red text-3xl font-bold">
          NETFLIX
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/" className="flex items-center hover:text-gray-300 transition">
            <AiFillHome className="mr-2" />
            Home
          </Link>
          <Link to="/browse" className="flex items-center hover:text-gray-300 transition">
            <MdLocalMovies className="mr-2" />
            Movies
          </Link>
          <Link to="/browse?type=series" className="flex items-center hover:text-gray-300 transition">
            <MdTv className="mr-2" />
            TV Shows
          </Link>
        </div>

        {/* Search and User */}
        <div className="flex items-center space-x-4">
          {/* Search Bar */}
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search movies..."
              className="bg-black/50 text-white px-4 py-2 rounded-md border border-gray-700 focus:outline-none focus:border-netflix-red w-40 md:w-60"
            />
            <button type="submit" className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <FaSearch className="text-gray-400 hover:text-white" />
            </button>
          </form>

          {/* Notifications */}
          <button className="relative">
            <FaBell className="text-xl hover:text-gray-300" />
            <span className="absolute -top-1 -right-1 bg-netflix-red text-xs rounded-full w-5 h-5 flex items-center justify-center">
              3
            </span>
          </button>

          {/* Profile */}
          <Link to="/profile" className="flex items-center space-x-2">
            <FaUserCircle className="text-2xl" />
            <span className="hidden md:inline">Profile</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
