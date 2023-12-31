// const { isCelebrateError } = require("celebrate");
const { INTERNAL_SERVER_ERROR, DEFAULT_ERROR_MESSAGE } = require('../utils/constants');

module.exports = (error, req, res, next) => {
  // if (isCelebrateError(error)) {
  //   return res.status(BAD_REQUEST_ERROR).send({ message: 'Ошибка валидации.' });
  // };
  const statusCode = error.statusCode || 500;
  if (statusCode === 500) {
    res.status(INTERNAL_SERVER_ERROR).send({ message: DEFAULT_ERROR_MESSAGE });
  } else {
    res.status(error.statusCode).send({ message: error.message });
  }
  next();
};
