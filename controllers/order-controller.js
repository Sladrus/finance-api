const orderService = require('../service/order-service');

class OrderController {
  async create(req, res, next) {
    try {
      const body = req.body;
      const order = await orderService.create(body);
      return res.json(order);
    } catch (e) {
      next(e);
    }
  }

  async findOrder(req, res, next) {
    try {
      const { id } = req.params;
      const order = await orderService.findOrder(id);
      return res.json(order);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new OrderController();
