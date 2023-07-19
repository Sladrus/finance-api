const { sequelize } = require('../db');
const ApiError = require('../exceptions/api-error');
const TaskModel = sequelize.models.Tasks;
const GroupModel = sequelize.models.Groups;
const MoneysendModel = sequelize.models.MoneysendHistory;

class TaskService {
  async create(chat_id, body) {
    return await sequelize.transaction(async function (transaction) {
      const group = await GroupModel.findOne({
        where: { chat_id },
        transaction,
      });
      if (!group) {
        throw ApiError.BadRequest(
          `Группы с chat_id: ${body.chat_id} не сутществует`
        );
      }
      if (!group.active) {
        throw ApiError.ForbiddenError();
      }
      const task = await TaskModel.create(
        {
          ...body,
          group_id: group.id,
        },
        { transaction }
      );
      return task;
    });
  }

  async createMoneysend(body) {
    return await sequelize.transaction(async function (transaction) {
      const task = await MoneysendModel.create({ ...body }, { transaction });
      return task;
    });
  }
}
module.exports = new TaskService();
