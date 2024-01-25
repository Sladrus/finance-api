const Router = require('express');
const router = new Router();
const authMiddleware = require('../middleware/auth-middleware');
const bannedPersonsController = require('../controllers/banned-persons-controller');

router.post('/check', authMiddleware, bannedPersonsController.checkPerson);

module.exports = router;
