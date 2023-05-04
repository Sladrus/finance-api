const { sequelize } = require('../db');
const ApiError = require('../exceptions/api-error');
const { formatDate } = require('../utils/utils');
const LogModel = sequelize.models.Logs;
const GroupModel = sequelize.models.Groups;

class LogService {
  async create(chat_id, body) {
    try {
      return await sequelize.transaction(async function (transaction) {
        // const group = await GroupModel.findOne({
        //   where: { chat_id },
        // });
        // if (!group) {
        //   throw ApiError.BadRequest(
        //     `Группы с chat_id: ${body.chat_id} не существует`
        //   );
        // }
        const log = await LogModel.create({
          ...body,
          group_id: group.id,
          create_date: formatDate(new Date()),
        });
        return log;
      });
    } catch (e) {
      console.log(e);
      throw ApiError.BadRequest(e);
    }
  }
}

module.exports = new LogService();
