const activityService = require('../service/activity-service');

class ActivityController {
  async create(req, res, next) {
    try {
      const { chat_id } = req.params;
      const body = req.body;
      const activity = await activityService.create(chat_id, body);
      return res.json(activity);
    } catch (e) {
      next(e);
    }
  }

  async update(req, res, next) {
    try {
      const { chat_id } = req.params;
      const body = req.body;
      const activity = await activityService.update(chat_id, body);
      return res.json(activity);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new ActivityController();
