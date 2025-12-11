import React from 'react';
import { FaPlay, FaInfoCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const HeroSection = ({ movie }) => {
  if (!movie) return null;

  return (
    <div className="relative h-[70vh] md:h-[90vh] w-full">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(to bottom, transparent, #141414), url(${movie.posterUrl})`,
        }}
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-netflix-black via-transparent to-transparent" />
      
      {/* Content */}
      <div className="absolute bottom-0 left-0 p-8 md:p-16 max-w-2xl">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">{movie.title}</h1>
        <p className="text-lg md:text-xl mb-6 line-clamp-3">{movie.description}</p>
        
        <div className="flex flex-wrap gap-4">
          <Link 
            to={`/movie/${movie._id}`}
            className="flex items-center bg-white text-black px-6 py-2 rounded-md font-semibold hover:bg-opacity-80 transition"
          >
            <FaPlay className="mr-2" />
            Play
          </Link>
          <button className="flex items-center bg-gray-500 bg-opacity-50 text-white px-6 py-2 rounded-md font-semibold hover:bg-opacity-70 transition">
            <FaInfoCircle className="mr-2" />
            More Info
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
