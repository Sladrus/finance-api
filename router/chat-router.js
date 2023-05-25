const Router = require('express');
const router = new Router();
const authMiddleware = require('../middleware/auth-middleware');
const chatController = require('../controllers/chat-controller');

router.get('/empty', authMiddleware, chatController.getEmptyChat);
router.post('/create', authMiddleware, chatController.createChat);
router.get('/:chat_id', authMiddleware, chatController.findChat);
router.post('/where', authMiddleware, chatController.findWhereTaken);
router.post('/restore', authMiddleware, chatController.restoreChat);

module.exports = router;
