const router = require('express').Router();

const {
  updateUser, getMe,
} = require('../controllers/users');

router.get('/me', getMe);
router.patch('/me', updateUser);

module.exports = router;
