const { sequelize } = require('../db');
const ApiError = require('../exceptions/api-error');
const GroupModel = sequelize.models.Groups;
const UserModel = sequelize.models.Users;

const { v4: uuidv4 } = require('uuid');

class GroupService {
  async findOrCreate(chat_id, title) {
    try {
      return await sequelize.transaction(async function (transaction) {
        const [group, created] = await GroupModel.findOrCreate({
          where: { chat_id },
          defaults: {
            status: 1,
            admin_id: 1,
            title,
            update_date: Math.floor(Date.now() / 1000),
          },
        });
        console.log(group);
        return group;
      });
    } catch (e) {
      console.log(e);
      throw ApiError.BadRequest(e);
    }
  }

  async update(chat_id, body) {
    try {
      return await sequelize.transaction(async function (transaction) {
        const res = await GroupModel.update(body, { where: { chat_id } });
        return res;
      });
    } catch (e) {
      console.log(e);
      throw ApiError.BadRequest(e);
    }
  }

  async active(chat_id, chat_key) {
    try {
      return await sequelize.transaction(async function (transaction) {
        const user = await UserModel.findOne({ where: { chat_key } });
        if (!user) {
          return { result: false };
        }
        const res = await GroupModel.update(
          { active: 1 },
          { where: { chat_id } }
        );
        return { result: true };
      });
    } catch (e) {
      console.log(e);
      throw ApiError.BadRequest(e);
    }
  }
}

module.exports = new GroupService();
