const router = require('express').Router();

const {
  deleteMovieById, getMovies, createMovie,
} = require('../controllers/movies');

router.get('/', getMovies);
router.post('/', createMovie);
router.delete('/:movieId', deleteMovieById);

module.exports = router;
