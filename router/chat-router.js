const Router = require('express');
const router = new Router();
const authMiddleware = require('../middleware/auth-middleware');
const chatController = require('../controllers/chat-controller');

router.get('/empty', authMiddleware, chatController.getEmptyChat);
router.post('/create', authMiddleware, chatController.createChat);

module.exports = router;
