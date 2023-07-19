const taskService = require('../service/task-service');

class TaskController {
  async createTask(req, res, next) {
    try {
      const { chat_id } = req.params;
      const body = req.body;

      const task = await taskService.create(chat_id, body);
      return res.json(task);
    } catch (e) {
      next(e);
    }
  }

  async createMoneysend(req, res, next) {
    try {
      const body = req.body;
      const task = await taskService.createMoneysend(body);
      return res.json(task);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new TaskController();
