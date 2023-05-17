const Router = require('express');
const router = new Router();
const authMiddleware = require('../middleware/auth-middleware');
const activityController = require('../controllers/activity-controller');

router.post('/create/:chat_id', authMiddleware, activityController.create);
router.post('/update/:chat_id', authMiddleware, activityController.update);

module.exports = router;
