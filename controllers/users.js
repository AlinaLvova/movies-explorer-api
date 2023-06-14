const mongoose = require('mongoose');

const User = require('../models/user');
const {
  SUCCESS_STATUS,
} = require('../utils/constants');

const BadRequestError = require('../errors/badRequestError');

// Формат данных пользователя
const formatUserData = (user) => ({
  _id: user._id,
  name: user.name,
  email: user.email,
});

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
