const router = require('express').Router();

const {
  updateUser, getMe,
} = require('../controllers/users');

const {
  updateUserValidator, userIdValidator,
} = require('../middlewares/validators');

router.get('/me', userIdValidator, getMe);
router.patch('/me', updateUserValidator, updateUser);

module.exports = router;
