const adminService = require('../service/admin-service');

class AdminController {
  async getAdmins(req, res, next) {
    try {
      const admins = await adminService.getAdmins();
      return res.json(admins);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new AdminController();
