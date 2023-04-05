const logService = require('../service/log-service');

class LogController {
  async createLog(req, res, next) {
    try {
      const { chat_id } = req.params;
      const body = req.body;

      const log = await logService.create(chat_id, body);
      return res.json(log);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new LogController();
