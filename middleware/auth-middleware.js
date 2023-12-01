require('dotenv').config();
const ApiError = require('../exceptions/api-error');
const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  try {
    const apiKey = req.headers['x-api-key'];

    if (!apiKey || apiKey !== process.env.API_TOKEN) {
      return next(ApiError.UnauthorizedError());
    }
    next();
  } catch (e) {
    return next(ApiError.UnauthorizedError());
  }
};
