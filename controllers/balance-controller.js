const balanceService = require('../service/balance-service');

class BalanceController {
  async showBalance(req, res, next) {
    try {
      const { chat_id } = req.params;

      const bal = await balanceService.show(chat_id);
      return res.json(bal);
    } catch (e) {
      next(e);
    }
  }

  async setBalance(req, res, next) {
    try {
      const { chat_id } = req.params;
      const { symbol, balance } = req.query;
      const body = req.body;

      const bal = await balanceService.set(chat_id, symbol, balance, body);
      return res.json(bal);
    } catch (e) {
      next(e);
    }
  }

  async delBalance(req, res, next) {
    try {
      const { chat_id } = req.params;
      const { symbol } = req.query;
      const body = req.body;

      const bal = await balanceService.del(chat_id, symbol, body);
      return res.json(bal);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new BalanceController();
