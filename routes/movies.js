const router = require('express').Router();

const {
  deleteMovieById, getUserMovies, createMovie,
} = require('../controllers/movies');

router.get('/', getUserMovies);
router.post('/', createMovie);
router.delete('/:movieId', deleteMovieById);

module.exports = router;
