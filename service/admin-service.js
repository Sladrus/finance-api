const { sequelize } = require('../db');
const ApiError = require('../exceptions/api-error');
const AdminModel = sequelize.models.Admins;

class AdminService {
  async getAdmins() {
    try {
      return await sequelize.transaction(async function (transaction) {
        const admins = await AdminModel.findAll({ transaction });
        return admins;
      });
    } catch (e) {
      console.log(e);
      throw ApiError.BadRequest();
    }
  }
}

module.exports = new AdminService();
