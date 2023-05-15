const Router = require('express');
const router = new Router();
const authMiddleware = require('../middleware/auth-middleware');
const groupController = require('../controllers/group-controller');

router.post(
  '/create/:chat_id',
  authMiddleware,
  groupController.findOrCreateGroup
);
router.post('/restore/:chat_id', authMiddleware, groupController.restoreGroup);
router.get('/:chat_id', authMiddleware, groupController.findGroup);
router.post('/active/:chat_id', authMiddleware, groupController.activeGroup);
router.put('/update/:chat_id', authMiddleware, groupController.updateGroup);

module.exports = router;
