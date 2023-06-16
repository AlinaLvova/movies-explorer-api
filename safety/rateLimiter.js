const rateLimit = require('express-rate-limit');

// Конфигурация rate limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 минут
  max: 100, // Максимальное число запросов с одного IP за указанный период времени
  message: 'Превышен лимит запросов. Попробуйте позже.',
});

module.exports = limiter;
