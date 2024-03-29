const groupService = require('../service/group-service');

class GroupController {
  async findGroup(req, res, next) {
    try {
      const { chat_id } = req.params;
      const group = await groupService.findGroup(chat_id);
      return res.json(group);
    } catch (e) {
      next(e);
    }
  }

  async findOrCreateGroup(req, res, next) {
    try {
      const { chat_id } = req.params;
      const { title } = req.query;
      const group = await groupService.findOrCreate(chat_id, title);
      return res.json(group);
    } catch (e) {
      next(e);
    }
  }

  async activeGroup(req, res, next) {
    try {
      const { chat_id } = req.params;
      const body = req.body;

      const result = await groupService.active(chat_id, body);
      return res.json(result);
    } catch (e) {
      next(e);
    }
  }

  async updateGroup(req, res, next) {
    try {
      const { chat_id } = req.params;
      const body = req.body;
      const group = await groupService.update(chat_id, body);
      return res.json(group);
    } catch (e) {
      next(e);
    }
  }

  async restoreGroup(req, res, next) {
    try {
      const { chat_id } = req.params;
      const group = await groupService.restoreGroup(chat_id);
      return res.json(group);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new GroupController();
