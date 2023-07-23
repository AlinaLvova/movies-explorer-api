const rateLimit = require('express-rate-limit');

const { RATE_LIMIT_EXCEEDED } = require('../utils/constants');

// Конфигурация rate limiter
const limiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 60 минут
  max: 100, // Максимальное число запросов с одного IP за указанный период времени
  message: RATE_LIMIT_EXCEEDED,
});

module.exports = limiter;
