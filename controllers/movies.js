const mongoose = require('mongoose');
const Movie = require('../models/movie');
const {
  SUCCESS_STATUS,
  CREATED_STATUS,
} = require('../utils/constants');
const BadRequestError = require('../errors/badRequestError');
const NotFoundError = require('../errors/notFoundError');
const ForbiddenError = require('../errors/forbiddenError');

const populateOptions = [
  { path: 'owner', select: ['name', '_id'] },
];

const formatMovie = (movie) => ({
  _id: movie._id,
  country: movie.country,
  director: movie.director,
  duration: movie.duration,
  year: movie.year,
  description: movie.description,
  image: movie.image,
  trailerLink: movie.trailerLink,
  thumbnail: movie.thumbnail,
  owner: {
    _id: movie.owner._id,
    name: movie.owner.name,
  },
  movieId: movie.movieId,
  nameRU: movie.nameRU,
  nameEN: movie.nameEN,
});

module.exports.createMovie = (req, res, next) => {
  const data = { ...req.body, owner: req.user._id };
  Movie.create(data)
    .then((movie) => res.status(CREATED_STATUS).send(formatMovie(movie)))
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        return next(new BadRequestError('Переданы некорректные данные при создании карточки.'));
      }
      return next(err);
    });
};

module.exports.deleteMovieById = (req, res, next) => {
  const userId = req.user._id;
  Movie.findById(req.params.movieId)
    .orFail()
    .then((movie) => {
      if (movie.owner._id.toString() !== userId) {
        throw new ForbiddenError('Нет прав для удаления фильма с указанным _id');
      }
      return Movie.deleteOne({ _id: req.params.movieId })
        .then(() => {
          res.status(SUCCESS_STATUS).send({ message: 'Фильм удалён.' });
        });
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        return next(new BadRequestError('Карточка с указанным _id не найдена.'));
      }
      if (err instanceof mongoose.Error.DocumentNotFoundError) {
        return next(new NotFoundError('Передан несуществующий _id фильма.'));
      }
      return next(err);
    });
};

module.exports.getMovies = (req, res, next) => {
  Movie.find({})
    .populate(populateOptions)
    .then((Movies) => res.status(SUCCESS_STATUS).send(Movies.map(formatMovie)))
    .catch((err) => next(err));
};
