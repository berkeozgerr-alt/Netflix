import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MovieRow from '../components/MovieRow';
import HeroSection from '../components/HeroSection';

const Home = () => {
  const [featuredMovies, setFeaturedMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [moviesByGenre, setMoviesByGenre] = useState({});

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      // Öne çıkan filmler
      const featuredRes = await axios.get('/api/movies/featured');
      setFeaturedMovies(featuredRes.data);

      // Popüler filmler
      const popularRes = await axios.get('/api/movies/popular');
      setPopularMovies(popularRes.data);

      // Kategorilere göre filmler
      const genres = ['Action', 'Comedy', 'Drama', 'Horror'];
      const genrePromises = genres.map(genre => 
        axios.get(`/api/movies?genre=${genre}&limit=10`)
      );
      
      const genreResults = await Promise.all(genrePromises);
      const genreData = {};
      genres.forEach((genre, index) => {
        genreData[genre] = genreResults[index].data.movies;
      });
      setMoviesByGenre(genreData);
    } catch (error) {
      console.error('Filmleri getirirken hata:', error);
    }
  };

  return (
    <div>
      {/* Hero Section */}
      {featuredMovies.length > 0 && (
        <HeroSection movie={featuredMovies[0]} />
      )}

      {/* Movie Rows */}
      <div className="space-y-8 pb-16">
        {/* Popüler Filmler */}
        <MovieRow title="Popular on Netflix" movies={popularMovies} />

        {/* Kategorilere göre filmler */}
        {Object.entries(moviesByGenre).map(([genre, movies]) => (
          <MovieRow key={genre} title={genre} movies={movies} />
        ))}

        {/* Önerilen Filmler */}
        <MovieRow title="Because you watched..." movies={popularMovies.slice(0, 10)} />
      </div>
    </div>
  );
};

export default Home;
