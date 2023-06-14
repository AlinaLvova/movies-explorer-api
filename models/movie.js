const mongoose = require('mongoose');
const validator = require('validator');

const cardSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 30,
  },
  director: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  duration: {
    required: true,
    type: Number,
  },
  year: {
    required: true,
    type: String,
  },
  description: {
    required: true,
    type: String,
  },
  image: {
    required: true,
    type: String,
    validate: {
      validator: (URL) => validator.isURL(URL),
      message: 'Некорректный адрес',
    },
  },
  trailerLink: {
    required: true,
    type: String,
    validate: {
      validator: (URL) => validator.isURL(URL),
      message: 'Некорректный адрес',
    },
  },
  thumbnail: {
    required: true,
    type: String,
    validate: {
      validator: (URL) => validator.isURL(URL),
      message: 'Некорректный адрес',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  movieId: {
    type: Number,
    required: false,
    // true - id фильма, который содержится в ответе сервиса MoviesExplorer.
    // На данный этап не знаем.
  },
  nameRU: {
    required: true,
    type: String,
  },
  nameEN: {
    required: true,
    type: String,
  },
}, {
  versionKey: false, // Отключение опции versionKey
});

module.exports = mongoose.model('card', cardSchema);
