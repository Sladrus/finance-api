const { sequelize } = require('../db');
const ApiError = require('../exceptions/api-error');
const GroupModel = sequelize.models.Groups;
const UserModel = sequelize.models.Users;
const ChatModel = sequelize.models.Chats;

const { v4: uuidv4 } = require('uuid');
const { formatDate } = require('../utils/utils');

class GroupService {
  async findGroup(chat_id) {
    try {
      return await sequelize.transaction(async function (transaction) {
        const group = await GroupModel.findOne({
          where: { chat_id },
          transaction,
        });
        return group;
      });
    } catch (e) {
      console.log(e);
      throw ApiError.BadRequest(e);
    }
  }

  async findOrCreate(chat_id, title) {
    try {
      return await sequelize.transaction(async function (transaction) {
        const [group, created] = await GroupModel.findOrCreate({
          where: { chat_id },
          defaults: {
            status: 1,
            group_status: 'READY',
            members_count: 0,
            admin_id: 1,
            title,
            ym_client_id: 0,
            update_date: formatDate(new Date()),
            create_date: formatDate(new Date()),
          },
          transaction,
        });
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
        const res = await GroupModel.update(body, {
          where: { chat_id },
          transaction,
        });
        return res;
      });
    } catch (e) {
      console.log(e);
      throw ApiError.BadRequest(e);
    }
  }

  async active(chat_id, { city }) {
    try {
      return await sequelize.transaction(async function (transaction) {
        const res = await GroupModel.update(
          {
            group_status: 'ACTIVE',
            active: 1,
            date_activated: formatDate(new Date()),
            city: city,
          },
          { where: { chat_id }, transaction }
        );
        return { result: true };
      });
    } catch (e) {
      console.log(e);
      throw ApiError.BadRequest(e);
    }
  }

  async restoreGroup(chat_id) {
    try {
      return await sequelize.transaction(async function (transaction) {
        const group = await GroupModel.findOne({
          where: { chat_id },
          transaction,
        });
        if (!group) {
          throw ApiError.BadRequest('Группа не найдена.');
        }
        let groupClone = { ...group };
        await group.destroy();
        delete groupClone.dataValues.id;
        delete groupClone.dataValues?.in_chat;
        groupClone.dataValues.create_date = formatDate(new Date());
        groupClone.dataValues.admin_id = 1;
        groupClone.dataValues.status = 1;
        groupClone.dataValues.group_status = 'READY';
        const newGroup = await GroupModel.create(groupClone.dataValues, {
          transaction,
        });
        console.log(newGroup);
        return newGroup;
      });
    } catch (e) {
      console.log(e);
      throw ApiError.BadRequest(e);
    }
  }
}

module.exports = new GroupService();
