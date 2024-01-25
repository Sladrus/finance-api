const Router = require('express').Router;
const groupRouter = require('./group-router');
const logRouter = require('./log-router');
const taskRouter = require('./task-router');
const chatRouter = require('./chat-router');
const balanceRouter = require('./balance-router');
const adminRouter = require('./admin-router');
const orderRouter = require('./order-router');
const activityRouter = require('./activity-router');
const bpersonRouter = require('./banned-person-router');

const router = new Router();

router.use('/admins', adminRouter);
router.use('/group', groupRouter);
router.use('/log', logRouter);
router.use('/task', taskRouter);
router.use('/chat', chatRouter);
router.use('/order', orderRouter);
router.use('/balance', balanceRouter);
router.use('/activity', activityRouter);
router.use('/bperson', bpersonRouter);

module.exports = router;
