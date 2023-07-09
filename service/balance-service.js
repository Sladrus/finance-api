const { sequelize } = require('../db');
const ApiError = require('../exceptions/api-error');
const { formatDate } = require('../utils/utils');
const BalanceModel = sequelize.models.Balances;
const GroupModel = sequelize.models.Groups;
const HistoryModel = sequelize.models.History;
const ActivesModel = sequelize.models.Actives;

class BalanceService {
  async setActives(chat_id, symbol, balance, body) {
    return await sequelize.transaction(async function (transaction) {
      const group = await GroupModel.findOne({
        where: { chat_id },
        transaction,
      });
      if (!group) {
        throw ApiError.BadRequest(
          `Группы с chat_id: ${body.chat_id} не существует`
        );
      }
      if (!group.active) {
        throw ApiError.ForbiddenError();
      }
      await GroupModel.update(
        { update_date: formatDate(new Date()) },
        { where: { chat_id }, transaction }
      );

      const lastRecord = await ActivesModel.create(
        {
          ...body,
          val: balance,
          symbol,
          group_id: group.id,
          create_date: formatDate(new Date()),
        },
        { transaction }
      );
      console.log(lastRecord);
      return { lastRecord };
    });
  }

  async set(chat_id, symbol, balance, body) {
    return await sequelize.transaction(async function (transaction) {
      const group = await GroupModel.findOne({
        where: { chat_id },
        transaction,
      });
      if (!group) {
        throw ApiError.BadRequest(
          `Группы с chat_id: ${body.chat_id} не существует`
        );
      }
      if (!group.active) {
        throw ApiError.ForbiddenError();
      }
      await GroupModel.update(
        { update_date: formatDate(new Date()) },
        { where: { chat_id }, transaction }
      );
      // const res = await GroupModel.update({body}, { where: { chat_id } });
      const [oldBal, created] = await BalanceModel.findOrCreate({
        where: { symbol, group_id: group.id },
        defaults: {
          balance: Number(balance),
          balance_reverse: Number(-balance),
          admin_id: 1,
        },
        transaction,
      });
      const { event } = body;
      const type = Number(balance) > 0 ? 'out' : 'in';

      const lastRecord = await HistoryModel.create(
        {
          ...body,
          type: type,
          val: balance,
          symbol,
          group_id: group.id,
          create_date: formatDate(new Date()),
          admin_id: 1,
        },
        { transaction }
      );
      console.log(lastRecord);
      if (created) return { oldBal, lastRecord };

      oldBal.balance;
      oldBal.balance = Number(oldBal.balance) + Number(balance);
      oldBal.balance_reverse = Number(-oldBal.balance);
      await oldBal.save();
      return { oldBal, lastRecord };
    });
  }

  async del(chat_id, symbol, body) {
    return await sequelize.transaction(async function (transaction) {
      const group = await GroupModel.findOne({
        where: { chat_id },
        transaction,
      });
      if (!group) {
        throw ApiError.BadRequest(
          `Группы с chat_id: ${body.chat_id} не существует`
        );
      }
      if (!group.active) {
        throw ApiError.ForbiddenError();
      }
      const bal = await BalanceModel.findOne({
        where: { symbol, group_id: group.id },
        transaction,
      });
      if (!bal) {
        throw ApiError.BadRequest(
          `Баланс с валютой <b>${symbol}</b> не существует`
        );
      }
      const type = Number(bal.balance_reverse) < 0 ? 'in' : 'out';

      const history = await HistoryModel.create(
        {
          ...body,
          type: type,
          val:
            type === 'in'
              ? Number(bal.balance_reverse) * -1
              : Number(bal.balance_reverse),
          symbol,
          group_id: group.id,
          comment: 'BDel',
          create_date: formatDate(new Date()),
          admin_id: 1,
        },
        { transaction }
      );
      console.log(history);
      await bal.destroy();
      return { bal, history };
    });
  }

  async show(chat_id) {
    return await sequelize.transaction(async function (transaction) {
      const group = await GroupModel.findOne({
        where: { chat_id },
        transaction,
      });
      if (!group) {
        throw ApiError.BadRequest(
          `Группы с chat_id: ${chat_id} не сутществует`
        );
      }
      if (!group.active) {
        throw ApiError.ForbiddenError();
      }
      const balances = await BalanceModel.findAll({
        where: { group_id: group.id },
        transaction,
      });
      const lastRecord = await HistoryModel.findOne({
        where: { group_id: group.id },
        order: [['id', 'DESC']],
        transaction,
      });

      return { balances, lastRecord };
    });
  }
}

module.exports = new BalanceService();
