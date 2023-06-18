require('dotenv').config();
const jwt = require('jsonwebtoken');

const config = require('../utils/config');
const UnauthorizedError = require('../errors/unauthorizedError');

const { NODE_ENV, JWT_SECRET_KEY } = process.env;

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    return next(new UnauthorizedError());
  }

  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET_KEY : config.JWT_SECRET_KEY_DEFAULT);
  } catch (err) {
    const error = new UnauthorizedError();
    return next(error);
  }

  req.user = payload;
  return next();
};
