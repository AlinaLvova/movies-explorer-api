const mongoose = require('mongoose');

const User = require('../models/user');
const {
  SUCCESS_STATUS,
} = require('../utils/constants');

const BadRequestError = require('../errors/badRequestError');

// Формат данных пользователя
const formatUserData = (user) => ({
  name: user.name,
  _id: user._id,
  email: user.email,
});

module.exports.getMe = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => res.status(SUCCESS_STATUS).send(formatUserData(user)))
    .catch((err) => next(err));
};

module.exports.updateUser = (req, res, next) => {
  const { name, email, password } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, email, password }, {
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
