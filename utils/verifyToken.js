const jwt = require('jsonwebtoken');

require('express-async-errors');

const verifyToken = (token, secret) => {
  const decoded = jwt.verify(token, secret);
  return decoded; // { userId: '5f8b3e3f9d3e2b2d3c3e1b2d' }
};

module.exports = verifyToken;
