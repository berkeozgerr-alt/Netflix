import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaPlay, FaSearch, FaUser, FaBell } from 'react-icons/fa';

function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Backend'den filmleri çek
    axios.get('/api/movies')
      .then(response => {
        setMovies(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Filmler yüklenirken hata:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="spinner"></div>
        <h2>Yükleniyor...</h2>
      </div>
    );
  }

  return (
    <div className="app">
      {/* Navbar */}
      <nav className="navbar">
        <div className="nav-container">
          <div className="nav-left">
            <h1 className="logo" style={{ color: '#e50914', fontSize: '32px', fontWeight: 'bold' }}>
              NETFLIX
            </h1>
            <ul className="nav-links">
              <li><a href="#home">Ana Sayfa</a></li>
              <li><a href="#series">Diziler</a></li>
              <li><a href="#movies">Filmler</a></li>
              <li><a href="#new">Yeni ve Popüler</a></li>
              <li><a href="#mylist">Listem</a></li>
            </ul>
          </div>
          <div className="nav-right">
            <button className="nav-icon">
              <FaSearch />
            </button>
            <button className="nav-icon">
              <FaBell />
            </button>
            <button className="nav-icon">
              <FaUser />
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="hero">
        <div className="hero-content">
          <h1 className="hero-title">Sınırsız film, dizi ve çok daha fazlası.</h1>
          <p className="hero-subtitle">İstediğiniz yerde izleyin. İstediğiniz zaman iptal edin.</p>
          <div className="hero-buttons">
            <button className="btn-play">
              <FaPlay /> Oynat
            </button>
            <button className="btn-info">
              Daha Fazla Bilgi
            </button>
          </div>
        </div>
        <div className="hero-overlay"></div>
      </header>

      {/* Film Listesi */}
      <main className="main-content">
        <section className="movie-section">
          <h2 className="section-title">Popüler Filmler</h2>
          <div className="movie-grid">
            {movies.map(movie => (
              <div key={movie.id} className="movie-card">
                <img 
                  src={movie.posterUrl} 
                  alt={movie.title}
                  className="movie-poster"
                />
                <div className="movie-info">
                  <h3 className="movie-title">{movie.title}</h3>
                  <p className="movie-year">{movie.year}</p>
                  <div className="movie-rating">
                    <span>⭐ {movie.rating}</span>
                  </div>
                  <button className="movie-play-btn">
                    <FaPlay /> İzle
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Hakkında */}
        <section className="about-section">
          <h2>Netflix Clone Projesi</h2>
          <p>Bu bir demo Netflix klonudur. React.js ve Node.js kullanılarak geliştirilmiştir.</p>
          <div className="features">
            <div className="feature">
              <h3>📱 Responsive Tasarım</h3>
              <p>Tüm cihazlarda uyumlu</p>
            </div>
            <div className="feature">
              <h3>⚡ Hızlı</h3>
              <p>Optimize edilmiş performans</p>
            </div>
            <div className="feature">
              <h3>🎬 Film Kütüphanesi</h3>
              <p>Geniş içerik yelpazesi</p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="footer">
        <p>© 2024 Netflix Clone Demo. Tüm hakları saklıdır.</p>
        <p>Bu proje eğitim amaçlıdır.</p>
      </footer>

      {/* CSS inline - kolaylık olsun diye */}
      <style jsx="true">{`
        .app {
          min-height: 100vh;
        }

        .loading-screen {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          height: 100vh;
          background: #141414;
        }

        .spinner {
          width: 50px;
          height: 50px;
          border: 5px solid #333;
          border-top: 5px solid #e50914;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin-bottom: 20px;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        /* Navbar */
        .navbar {
          position: fixed;
          top: 0;
          width: 100%;
          padding: 20px 40px;
          background: linear-gradient(to bottom, rgba(0,0,0,0.7) 10%, transparent);
          z-index: 1000;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .nav-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
        }

        .nav-left {
          display: flex;
          align-items: center;
          gap: 40px;
        }

        .nav-links {
          display: flex;
          list-style: none;
          gap: 20px;
        }

        .nav-links a {
          color: white;
          text-decoration: none;
          font-weight: 500;
          transition: color 0.3s;
        }

        .nav-links a:hover {
          color: #e50914;
        }

        .nav-right {
          display: flex;
          gap: 20px;
        }

        .nav-icon {
          background: none;
          border: none;
          color: white;
          font-size: 20px;
          cursor: pointer;
          transition: color 0.3s;
        }

        .nav-icon:hover {
          color: #e50914;
        }

        /* Hero Section */
        .hero {
          position: relative;
          height: 80vh;
          background: linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.7)),
                      url('https://assets.nflxext.com/ffe/siteui/vlv3/9d3533b2-0e2b-40b2-95e0-ecd7979cc88b/a3873901-5b7c-46eb-b9fa-12fea5197bd3/TR-tr-20240311-popsignuptwoweeks-perspective_alpha_website_large.jpg');
          background-size: cover;
          background-position: center;
          display: flex;
          align-items: center;
          padding: 0 40px;
          margin-top: 60px;
        }

        .hero-content {
          max-width: 600px;
          z-index: 2;
        }

        .hero-title {
          font-size: 48px;
          font-weight: bold;
          margin-bottom: 20px;
        }

        .hero-subtitle {
          font-size: 24px;
          margin-bottom: 30px;
          color: #ccc;
        }

        .hero-buttons {
          display: flex;
          gap: 15px;
        }

        .btn-play {
          background: #e50914;
          color: white;
          border: none;
          padding: 12px 30px;
          font-size: 18px;
          font-weight: bold;
          border-radius: 4px;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 10px;
          transition: background 0.3s;
        }

        .btn-play:hover {
          background: #f40612;
        }

        .btn-info {
          background: rgba(109, 109, 110, 0.7);
          color: white;
          border: none;
          padding: 12px 30px;
          font-size: 18px;
          font-weight: bold;
          border-radius: 4px;
          cursor: pointer;
          transition: background 0.3s;
        }

        .btn-info:hover {
          background: rgba(109, 109, 110, 0.9);
        }

        .hero-overlay {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 100px;
          background: linear-gradient(to top, #141414, transparent);
        }

        /* Movie Grid */
        .main-content {
          padding: 40px;
        }

        .section-title {
          font-size: 24px;
          margin-bottom: 20px;
          color: #fff;
        }

        .movie-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 20px;
          margin-bottom: 40px;
        }

        .movie-card {
          background: #181818;
          border-radius: 8px;
          overflow: hidden;
          transition: transform 0.3s, box-shadow 0.3s;
        }

        .movie-card:hover {
          transform: scale(1.05);
          box-shadow: 0 10px 20px rgba(0,0,0,0.5);
        }

        .movie-poster {
          width: 100%;
          height: 300px;
          object-fit: cover;
        }

        .movie-info {
          padding: 15px;
        }

        .movie-title {
          font-size: 16px;
          font-weight: bold;
          margin-bottom: 5px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .movie-year {
          color: #999;
          font-size: 14px;
          margin-bottom: 10px;
        }

        .movie-rating {
          margin-bottom: 10px;
        }

        .movie-play-btn {
          background: #e50914;
          color: white;
          border: none;
          padding: 8px 15px;
          border-radius: 4px;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 5px;
          font-size: 14px;
          width: 100%;
          justify-content: center;
          transition: background 0.3s;
        }

        .movie-play-btn:hover {
          background: #f40612;
        }

        /* About Section */
        .about-section {
          background: #181818;
          padding: 40px;
          border-radius: 8px;
          margin-top: 40px;
          text-align: center;
        }

        .about-section h2 {
          font-size: 32px;
          margin-bottom: 20px;
          color: #e50914;
        }

        .about-section p {
          font-size: 18px;
          color: #ccc;
          margin-bottom: 30px;
          max-width: 800px;
          margin-left: auto;
          margin-right: auto;
        }

        .features {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 30px;
          margin-top: 30px;
        }

        .feature {
          padding: 20px;
          background: #222;
          border-radius: 8px;
          transition: transform 0.3s;
        }

        .feature:hover {
          transform: translateY(-5px);
        }

        .feature h3 {
          color: #e50914;
          margin-bottom: 10px;
          font-size: 20px;
        }

        .feature p {
          color: #999;
          font-size: 16px;
          margin-bottom: 0;
        }

        /* Footer */
        .footer {
          background: #000;
          padding: 40px;
          text-align: center;
          margin-top: 60px;
        }

        .footer p {
          color: #999;
          margin: 10px 0;
        }

        /* Responsive */
        @media (max-width: 768px) {
          .navbar {
            padding: 15px 20px;
          }

          .nav-links {
            display: none;
          }

          .hero-title {
            font-size: 32px;
          }

          .hero-subtitle {
            font-size: 18px;
          }

          .hero-buttons {
            flex-direction: column;
          }

          .btn-play, .btn-info {
            width: 100%;
            justify-content: center;
          }

          .movie-grid {
            grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
          }

          .main-content {
            padding: 20px;
          }
        }
      `}</style>
    </div>
  );
}

export default App;
