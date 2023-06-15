const express = require('express');
const usersRouter = require('./users');
const moviesRouter = require('./movies');
const { createUser, login, logout } = require('../controllers/users');
const auth = require('../middlewares/auth');
const NotFoundError = require('../errors/notFoundError');

const router = express.Router();

router.post('/signin', login);
router.post('/signup', createUser);
router.post('/signout', logout);

router.use(auth);

router.use('/users', usersRouter);
router.use('/movies', moviesRouter);

// Middleware для обработки несуществующих путей
router.use((req, res, next) => next(new NotFoundError('Маршрут не найден')));

module.exports = router;
