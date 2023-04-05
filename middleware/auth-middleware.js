require('dotenv').config();
const ApiError = require('../exceptions/api-error');
const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  try {
    // Получаем заголовок авторизации из запроса
    const apiKey = req.headers['x-api-key']; // получаем значение поля 'x-api-key' из заголовка запроса

    if (!apiKey || apiKey !== process.env.API_TOKEN) {
      // проверяем соответствие переданного значения и ожидаемого ключа
      return next(ApiError.UnauthorizedError()); // отправляем ошибку, если ключ не прошел проверку
    }

    next();
  } catch (e) {
    return next(ApiError.UnauthorizedError());
  }
};
