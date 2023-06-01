const Router = require('express');
const router = new Router();
const authMiddleware = require('../middleware/auth-middleware');
const orderController = require('../controllers/order-controller');

router.post('/create', orderController.create);
router.get('/:id', authMiddleware, orderController.findOrder);

module.exports = router;
