const express = require('express');
const router = express.Router();
const Movie = require('../models/Movie');

// Tüm filmleri getir
router.get('/', async (req, res) => {
  try {
    const { genre, limit = 20, page = 1 } = req.query;
    const skip = (page - 1) * limit;
    
    let query = {};
    if (genre) {
      query.genre = genre;
    }
    
    const movies = await Movie.find(query)
      .skip(skip)
      .limit(parseInt(limit))
      .sort({ createdAt: -1 });
    
    const total = await Movie.countDocuments(query);
    
    res.json({
      movies,
      totalPages: Math.ceil(total / limit),
      currentPage: parseInt(page),
      totalMovies: total
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Popüler filmler
router.get('/popular', async (req, res) => {
  try {
    const movies = await Movie.find()
      .sort({ views: -1 })
      .limit(10);
    
    res.json(movies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Öne çıkan filmler
router.get('/featured', async (req, res) => {
  try {
    const movies = await Movie.find({ featured: true })
      .limit(5);
    
    res.json(movies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Film detayı
router.get('/:id', async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    
    if (!movie) {
      return res.status(404).json({ error: 'Film bulunamadı' });
    }
    
    // İzlenme sayısını artır
    movie.views += 1;
    await movie.save();
    
    res.json(movie);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Benzer filmler
router.get('/:id/similar', async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    
    if (!movie) {
      return res.status(404).json({ error: 'Film bulunamadı' });
    }
    
    const similarMovies = await Movie.find({
      _id: { $ne: movie._id },
      genre: { $in: movie.genre }
    })
    .limit(5);
    
    res.json(similarMovies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Film ara
router.get('/search/:query', async (req, res) => {
  try {
    const movies = await Movie.find({
      $or: [
        { title: { $regex: req.params.query, $options: 'i' } },
        { description: { $regex: req.params.query, $options: 'i' } },
        { director: { $regex: req.params.query, $options: 'i' } }
      ]
    }).limit(10);
    
    res.json(movies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
