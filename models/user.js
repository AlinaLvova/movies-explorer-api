const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  email: {
    required: true,
    type: String,
    validate: {
      validator: (email) => validator.isEmail(email),
      message: 'Некорректный e-mail',
    },
    unique: true,
  },
  password: {
    required: true,
    type: String,
    select: false,
    minlength: 2,
  },
}, {
  versionKey: false, // Отключение опции versionKey
});

module.exports = mongoose.model('user', userSchema);
