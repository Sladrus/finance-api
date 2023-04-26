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
}

module.exports = new ChatController();
