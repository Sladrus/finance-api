const { sequelize } = require('../db');
const ApiError = require('../exceptions/api-error');
const { findGroup } = require('./group-service');
const ActivityModel = sequelize.models.Activity;

class ActivityService {
  async create(chat_id, body) {
    return await sequelize.transaction(async function (transaction) {
      const group = await findGroup(chat_id);
      if (!group) throw ApiError.BadRequest('Группа не найдена');
      const activity = await ActivityModel.create(body, { transaction });
      return activity;
    });
  }

  async update(chat_id, body) {
    return await sequelize.transaction(async function (transaction) {
      const res = await ActivityModel.update(body, {
        where: { chat_id },
        transaction,
      });
      return res;
    });
  }
}

module.exports = new ActivityService();
