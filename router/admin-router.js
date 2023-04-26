const Router = require('express');
const router = new Router();
const authMiddleware = require('../middleware/auth-middleware');
const adminController = require('../controllers/admin-controller');

router.get('/', authMiddleware, adminController.getAdmins);

module.exports = router;
