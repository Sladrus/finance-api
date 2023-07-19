const Router = require('express');
const router = new Router();
const authMiddleware = require('../middleware/auth-middleware');
const taskController = require('../controllers/task-controller');

router.post('/create/:chat_id', authMiddleware, taskController.createTask);
router.post('/moneysend', authMiddleware, taskController.createMoneysend);

module.exports = router;
