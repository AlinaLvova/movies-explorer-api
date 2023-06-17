const express = require('express');
const { errors } = require('celebrate');

const usersRouter = require('./users');
const moviesRouter = require('./movies');
const { createUser, login, logout } = require('../controllers/users');
const { loginValidator, createUserValidator } = require('../middlewares/validators');
const { requestLogger, errorLogger } = require('../middlewares/logger');
const auth = require('../middlewares/auth');
const NotFoundError = require('../errors/notFoundError');

const router = express.Router();

router.post('/signin', loginValidator, login);
router.post('/signup', createUserValidator, createUser);

router.use(requestLogger); // логгер запросов

router.use(auth);

router.use('/users', usersRouter);
router.use('/movies', moviesRouter);
router.post('/signout', logout);

// Middleware для обработки несуществующих путей
router.use((req, res, next) => next(new NotFoundError('Маршрут не найден')));

router.use(errorLogger); // логгер ошибок

router.use(errors()); // обработчик ошибок celebrate

module.exports = router;
