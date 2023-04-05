const Router = require('express');
const router = new Router();
const authMiddleware = require('../middleware/auth-middleware');
const logController = require('../controllers/log-controller');

router.post('/create/:chat_id', authMiddleware, logController.createLog);

module.exports = router;
