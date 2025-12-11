import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ReactPlayer from 'react-player';
import { FaPlay, FaPlus, FaCheck, FaShare, FaStar } from 'react-icons/fa';

const MovieDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [similarMovies, setSimilarMovies] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  useEffect(() => {
    fetchMovieDetails();
  }, [id]);

  const fetchMovieDetails = async () => {
    try {
      const movieRes = await axios.get(`/api/movies/${id}`);
      setMovie(movieRes.data);

      const similarRes = await axios.get(`/api/movies/${id}/similar`);
      setSimilarMovies(similarRes.data);
    } catch (error) {
      console.error('Film detaylarını getirirken hata:', error);
    }
  };

  if (!movie) return <div className="p-8">Loading...</div>;

  return (
    <div className="pt-16">
      {/* Video Player */}
      {isPlaying ? (
        <div className="relative pt-[56.25%]">
          <ReactPlayer
            url={movie.videoUrl}
            playing={isPlaying}
            controls={true}
            width="100%"
            height="100%"
            className="absolute top-0 left-0"
          />
        </div>
      ) : (
        /* Hero Section */
        <div 
          className="relative h-[70vh] bg-cover bg-center"
          style={{ backgroundImage: `linear-gradient(to bottom, transparent, #141414), url(${movie.posterUrl})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-netflix-black via-transparent to-transparent" />
          <div className="absolute bottom-0 left-0 p-8 md:p-16 max-w-2xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">{movie.title}</h1>
            <div className="flex flex-wrap items-center gap-4 mb-4">
              <span className="text-green-500 font-semibold">✓ Match</span>
              <span>{movie.year}</span>
              <span>{movie.duration} min</span>
              <span className="border px-2 py-1 text-xs">HD</span>
            </div>
            <p className="text-lg mb-6">{movie.description}</p>
            <div className="flex flex-wrap gap-4">
              <button 
                onClick={() => setIsPlaying(true)}
                className="flex items-center bg-white text-black px-8 py-3 rounded-md font-semibold hover:bg-opacity-80 transition"
              >
                <FaPlay className="mr-2" />
                Play
              </button>
              <button 
                onClick={() => setIsAdded(!isAdded)}
                className="flex items-center bg-gray-500 bg-opacity-50 text-white px-8 py-3 rounded-md font-semibold hover:bg-opacity-70 transition"
              >
                {isAdded ? <FaCheck className="mr-2" /> : <FaPlus className="mr-2" />}
                My List
              </button>
              <button className="flex items-center bg-gray-500 bg-opacity-50 text-white px-8 py-3 rounded-md font-semibold hover:bg-opacity-70 transition">
                <FaShare className="mr-2" />
                Share
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Film Detayları */}
      <div className="p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Sol Kolon */}
        <div className="lg:col-span-2">
          {/* Oyuncular */}
          <div className="mb-8">
            <h3 className="text-xl font-bold mb-4">Cast</h3>
            <div className="flex flex-wrap gap-4">
              {movie.cast?.slice(0, 6).map((actor, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-gray-700 rounded-full mx-auto mb-2"></div>
                  <p className="font-semibold">{actor.actor}</p>
                  <p className="text-sm text-gray-400">{actor.character}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Bölümler (Dizi ise) */}
          {movie.isSeries && movie.seasons?.length > 0 && (
            <div className="mb-8">
              <h3 className="text-xl font-bold mb-4">Episodes</h3>
              {movie.seasons.map(season => (
                <div key={season.seasonNumber} className="mb-6">
                  <h4 className="text-lg font-semibold mb-2">Season {season.seasonNumber}</h4>
                  <div className="space-y-2">
                    {season.episodes.map(episode => (
                      <div key={episode.episodeNumber} className="flex items-center p-2 hover:bg-gray-800 rounded">
                        <span className="w-8 text-center">{episode.episodeNumber}</span>
                        <div className="ml-4 flex-1">
                          <p className="font-semibold">{episode.title}</p>
                          <p className="text-sm text-gray-400">{episode.duration} min</p>
                        </div>
                        <button className="text-netflix-red hover:text-red-400">
                          <FaPlay />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Sağ Kolon */}
        <div>
          <div className="space-y-4">
            <p><span className="text-gray-400">Director:</span> {movie.director}</p>
            <p><span className="text-gray-400">Rating:</span> ★ {movie.rating.toFixed(1)}/10</p>
            <p><span className="text-gray-400">Genre:</span> {movie.genre.join(', ')}</p>
            <p><span className="text-gray-400">Views:</span> {movie.views.toLocaleString()}</p>
          </div>

          {/* Benzer Filmler */}
          {similarMovies.length > 0 && (
            <div className="mt-8">
              <h3 className="text-xl font-bold mb-4">More Like This</h3>
              <div className="space-y-4">
                {similarMovies.slice(0, 3).map(similar => (
                  <div key={similar._id} className="flex items-center p-2 hover:bg-gray-800 rounded">
                    <img src={similar.posterUrl} alt={similar.title} className="w-16 h-24 object-cover rounded" />
                    <div className="ml-4">
                      <p className="font-semibold">{similar.title}</p>
                      <p className="text-sm text-gray-400">{similar.year}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
