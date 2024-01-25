const bannedPersonsService = require('../service/banned-persons-service');

class BannedPersonsController {
  async checkPerson(req, res, next) {
    try {
      const body = req.body;
      const admins = await bannedPersonsService.checkPerson(body);
      return res.json(admins);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new BannedPersonsController();
