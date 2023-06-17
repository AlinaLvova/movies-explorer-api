const { celebrate, Joi, Segments } = require('celebrate');

// Валидация данных пользователя при создании
const createUserValidator = celebrate({
  [Segments.BODY]: {
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(2),
  },
});

// Валидация данных пользователя при обновлении
const updateUserValidator = celebrate({
  [Segments.BODY]: {
    name: Joi.string().min(2).max(30).required(true),
    email: Joi.string().email().required(true),
  },
});

// Валидация идентификатора пользователя
const userIdValidator = celebrate({
  [Segments.PARAMS]: {
    userId: Joi.string().required().hex().length(24),
  },
});

// Валидация данных для входа в систему
const loginValidator = celebrate({
  [Segments.BODY]: {
    email: Joi.string().required().email(),
    password: Joi.string().required().min(2),
  },
});

// Валидация данных фильма при создании
const createMovieValidator = celebrate({
  [Segments.BODY]: {
    country: Joi.string().required().min(1).max(30),
    director: Joi.string().required().min(2).max(30),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().uri(),
    trailerLink: Joi.string().required().uri(),
    thumbnail: Joi.string().required().uri(),
    owner: Joi.string().required().hex().length(24),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  },
});

// Валидация идентификатора фильма
const movieIdValidator = celebrate({
  [Segments.PARAMS]: {
    movieId: Joi.string().required().hex().length(24),
  },
});

module.exports = {
  createUserValidator,
  updateUserValidator,
  loginValidator,
  userIdValidator,
  createMovieValidator,
  movieIdValidator,
};
