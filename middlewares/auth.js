require('dotenv').config();
const jwt = require('jsonwebtoken');

const config = require('../utils/config');
const UnauthorizedError = require('../errors/unauthorizedError');

const { NODE_ENV, JWT_SECRET_KEY } = process.env;

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    return next(new UnauthorizedError('Необходима авторизация'));
  }

  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET_KEY : config.JWT_SECRET_KEY);
  } catch (err) {
    const error = new UnauthorizedError('Необходима авторизация');
    return next(error);
  }

  req.user = payload;
  return next();
};
