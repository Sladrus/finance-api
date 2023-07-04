const { sequelize } = require('../db');
const ApiError = require('../exceptions/api-error');
const ConvertModel = sequelize.models.Converts;

class OrderService {
  async create(body) {
    return await sequelize.transaction(async function (transaction) {
      const order = await ConvertModel.create(body, { transaction });
      return order;
    });
  }

  async findOrder(id) {
    return await sequelize.transaction(async function (transaction) {
      const order = await ConvertModel.findOne({
        where: { id },
        transaction,
      });
      console.log(order);
      return order;
    });
  }
}

module.exports = new OrderService();
