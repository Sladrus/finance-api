const { sequelize } = require('../db');
const ApiError = require('../exceptions/api-error');
const TaskModel = sequelize.models.Tasks;
const GroupModel = sequelize.models.Groups;

class TaskService {
  async create(chat_id, body) {
    try {
      return await sequelize.transaction(async function (transaction) {
        const group = await GroupModel.findOne({
          where: { chat_id },
        });
        if (!group) {
          throw ApiError.BadRequest(
            `Группы с chat_id: ${body.chat_id} не сутществует`
          );
        }
        if (!group.active) {
          throw ApiError.ForbiddenError();
        }
        const task = await TaskModel.create({
          ...body,
          group_id: group.id,
        });
        return task;
      });
    } catch (e) {
      console.log(e);
      throw ApiError.BadRequest(e);
    }
  }
}
module.exports = new TaskService();
