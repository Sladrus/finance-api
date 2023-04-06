const chatService = require('../service/chat-service');

class ChatController {
  async getEmptyChat(req, res, next) {
    try {
      const chat = await chatService.getEmptyChat();
      console.log(chat);
      return res.json(chat);
    } catch (e) {
      next(e);
    }
  }

  async createChat(req, res, next) {
    try {
      const body = req.body;
      const chat = await chatService.createChat(body);
      return res.json(chat);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new ChatController();
