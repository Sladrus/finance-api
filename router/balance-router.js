const Router = require('express');
const router = new Router();
const authMiddleware = require('../middleware/auth-middleware');
const balanceController = require('../controllers/balance-controller');

router.post('/set/:chat_id', authMiddleware, balanceController.setBalance);
router.post('/actives/:chat_id', authMiddleware, balanceController.setActives);

router.post('/del/:chat_id', authMiddleware, balanceController.delBalance);
router.get('/show/:chat_id', authMiddleware, balanceController.showBalance);

module.exports = router;
