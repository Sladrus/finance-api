const { sequelize } = require('../db');
const ApiError = require('../exceptions/api-error');
const { formatDate } = require('../utils/utils');
const BalanceModel = sequelize.models.Balances;
const GroupModel = sequelize.models.Groups;
const HistoryModel = sequelize.models.History;

class BalanceService {
  async set(chat_id, symbol, balance, body) {
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
      await GroupModel.update(
        { update_date: formatDate(new Date()) },
        { where: { chat_id } }
      );
      // const res = await GroupModel.update({body}, { where: { chat_id } });
      const [oldBal, created] = await BalanceModel.findOrCreate({
        where: { symbol, group_id: group.id },
        defaults: {
          balance: Number(balance),
          balance_reverse: Number(-balance),
          admin_id: 1,
        },
      });

      const lastRecord = await HistoryModel.create({
        ...body,
        type: Number(balance) > 0 ? 'out' : 'in',
        val: balance,
        symbol,
        group_id: group.id,
        create_date: formatDate(new Date()),
        admin_id: 1,
      });
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
      });
      if (!bal) {
        throw ApiError.BadRequest(
          `Баланс с валютой <b>${symbol}</b> не существует`
        );
      }

      const history = await HistoryModel.create({
        ...body,
        type: Number(bal.balance) > 0 ? 'out' : 'in',
        val: bal.balance,
        symbol,
        group_id: group.id,
        comment: 'BDel',
        create_date: formatDate(new Date()),
        admin_id: 1,
      });
      await bal.destroy();
      return { bal, history };
    });
  }

  async show(chat_id) {
    return await sequelize.transaction(async function (transaction) {
      const group = await GroupModel.findOne({
        where: { chat_id },
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
      });
      const lastRecord = await HistoryModel.findOne({
        where: { group_id: group.id },
        order: [['id', 'DESC']],
      });

      return { balances, lastRecord };
    });
  }
}

module.exports = new BalanceService();
