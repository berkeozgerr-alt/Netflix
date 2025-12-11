import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaPlay, FaPlus, FaCheck } from 'react-icons/fa';
import { BsChevronDown } from 'react-icons/bs';

const MovieCard = ({ movie }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToList = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsAdded(!isAdded);
    // Burada backend'e istek atılacak
  };

  return (
    <Link 
      to={`/movie/${movie._id}`}
      className="relative block group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Poster */}
      <div className="relative overflow-hidden rounded-lg">
        <img 
          src={movie.posterUrl} 
          alt={movie.title}
          className="w-full h-auto transition-transform duration-300 group-hover:scale-110"
        />
        
        {/* Hover Overlay */}
        {isHovered && (
          <div className="absolute inset-0 bg-black/70 p-4 flex flex-col justify-between transition-opacity duration-300">
            {/* Üst Butonlar */}
            <div className="flex justify-between">
              <button 
                className="bg-white text-black rounded-full w-10 h-10 flex items-center justify-center hover:bg-gray-200"
                onClick={(e) => {
                  e.preventDefault();
                  // Play işlevi
                }}
              >
                <FaPlay />
              </button>
              <button 
                className="border-2 border-gray-400 text-gray-400 rounded-full w-10 h-10 flex items-center justify-center hover:border-white hover:text-white"
                onClick={handleAddToList}
              >
                {isAdded ? <FaCheck /> : <FaPlus />}
              </button>
            </div>

            {/* Alt Bilgi */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <span className="text-green-500 font-semibold">
                    {movie.rating > 7 ? '✓ Match' : ''}
                  </span>
                  <span className="text-sm border px-2 py-1 border-gray-400">
                    {movie.year}
                  </span>
                  <span className="text-sm border px-2 py-1 border-gray-400">
                    HD
                  </span>
                </div>
                <BsChevronDown className="text-xl" />
              </div>
              
              <div className="text-xs text-gray-300">
                {movie.genre.slice(0, 2).map(g => (
                  <span key={g} className="mr-2">{g}</span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Film Bilgisi (Hover yoksa) */}
      {!isHovered && (
        <div className="mt-2">
          <h3 className="font-semibold truncate">{movie.title}</h3>
          <div className="flex items-center text-sm text-gray-400">
            <span className="mr-2">★ {movie.rating.toFixed(1)}</span>
            <span>• {movie.duration} min</span>
          </div>
        </div>
      )}
    </Link>
  );
};

export default MovieCard;
