const express = require('express');
const usersRouter = require('./users');
const moviesRouter = require('./movies');
const { createUser } = require('../controllers/users');

const router = express.Router();

router.post('/signup', createUser);

router.use('/users', usersRouter);
router.use('/movies', moviesRouter);

module.exports = router;
