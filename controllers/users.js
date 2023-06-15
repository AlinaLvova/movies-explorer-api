const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const User = require('../models/user');
const {
  SUCCESS_STATUS,
  CREATED_STATUS,
} = require('../utils/constants');

const BadRequestError = require('../errors/badRequestError');
const ConflictError = require('../errors/badRequestError');

// Формат данных пользователя
const formatUserData = (user) => ({
  _id: user._id,
  name: user.name,
  email: user.email,
});

module.exports.createUser = (req, res, next) => {
  const {
    name,
    email,
    password,
  } = req.body;

  bcrypt.hash(password, 10).then((hash) => {
    User.create({
      name, email, password: hash,
    })
      .then((user) => res.status(CREATED_STATUS).send(formatUserData(user)))
      .catch((err) => {
        if (err instanceof mongoose.Error.ValidationError) {
          return next(new BadRequestError('Переданы некорректные данные при создании пользователя.'));
        }
        if (err.code === 11000) {
          return next(new ConflictError('Пользователь с таким email уже зарегистрирован'));
        }
        return next(err);
      })
      .catch(next);
  });
};

module.exports.getMe = (req, res, next) => {
  const userId = '648a23ebcf8216756f8be6a4'; // req.user._id;
  User.findById(userId)
    .then((user) => res.status(SUCCESS_STATUS).send(formatUserData(user)))
    .catch((err) => next(err));
};

module.exports.updateUser = (req, res, next) => {
  const { name, email, password } = req.body;
  const userId = '648a23ebcf8216756f8be6a4'; // req.user._id;
  User.findByIdAndUpdate(userId, { name, email, password }, {
    new: true,
    runValidators: true,
  })
    .then((user) => {
      res.status(SUCCESS_STATUS).send(formatUserData(user));
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        return next(new BadRequestError('Переданы некорректные данные при обновлении пользователя.'));
      }
      return next(err);
    });
};
