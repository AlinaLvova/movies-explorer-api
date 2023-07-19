const { celebrate, Joi, Segments } = require('celebrate');

// Валидация данных пользователя при создании
const createUserValidator = celebrate({
  [Segments.BODY]: {
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().regex(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/),
    password: Joi.string().required(),
  },
});

// Валидация данных пользователя при обновлении
const updateUserValidator = celebrate({
  [Segments.BODY]: {
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().email().required(),
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
    password: Joi.string().required(),
  },
});

// Валидация данных фильма при создании
const createMovieValidator = celebrate({
  [Segments.BODY]: {
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().uri(),
    trailerLink: Joi.string().required().uri(),
    thumbnail: Joi.string().required().uri(),
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
