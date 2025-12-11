const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

// Config
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Basit route - test için
app.get('/api/test', (req, res) => {
  res.json({ 
    message: 'Backend çalışıyor!',
    status: 'success'
  });
});

// Filmler için test endpoint
app.get('/api/movies', (req, res) => {
  const testMovies = [
    {
      id: 1,
      title: "Stranger Things",
      description: "Bir kasabada kaybolan bir çocuğun ardından garip olaylar başlar.",
      year: 2016,
      posterUrl: "https://image.tmdb.org/t/p/w500/49WJfeN0moxb9IPfGn8AIqMGskD.jpg",
      rating: 8.7
    },
    {
      id: 2,
      title: "The Crown",
      description: "Kraliçe II. Elizabeth'in hayatı ve saltanatı.",
      year: 2016,
      posterUrl: "https://image.tmdb.org/t/p/w500/jY79PN2Cg0jDFq8HvSqk6Y1t2uD.jpg",
      rating: 8.6
    }
  ];
  res.json(testMovies);
});

app.listen(PORT, () => {
  console.log(`✅ Sunucu http://localhost:${PORT} adresinde çalışıyor`);
  console.log(`📡 Test için: http://localhost:${PORT}/api/test`);
  console.log(`🎬 Filmler için: http://localhost:${PORT}/api/movies`);
});
