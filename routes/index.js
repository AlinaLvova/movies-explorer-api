const express = require('express');
const usersRouter = require('./users');
const moviesRouter = require('./movies');
const { createUser, login, logout } = require('../controllers/users');
const auth = require('../middlewares/auth');

const router = express.Router();

router.post('/signin', login);
router.post('/signup', createUser);
router.post('/signout', logout);

router.use(auth);

router.use('/users', usersRouter);
router.use('/movies', moviesRouter);

module.exports = router;
