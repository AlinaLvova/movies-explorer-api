const { AUTHORIZATION_REQUIRED } = require('../utils/constants');

module.exports = class UnauthorizedError extends Error {
  constructor() {
    super(AUTHORIZATION_REQUIRED);
    this.statusCode = 401;
  }
};
