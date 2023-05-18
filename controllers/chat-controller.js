const chatService = require('../service/chat-service');

class ChatController {
  async findChat(req, res, next) {
    try {
      const { chat_id } = req.params;
      const chat = await chatService.findChat(chat_id);
      return res.json(chat);
    } catch (e) {
      next(e);
    }
  }

  async findWhereTaken(req, res, next) {
    try {
      const chats = await chatService.findWhereTaken();
      return res.json(chats);
    } catch (e) {
      next(e);
    }
  }

  async getEmptyChat(req, res, next) {
    try {
      const chat = await chatService.getEmptyChat();
      return res.json(chat);
    } catch (e) {
      next(e);
    }
  }

  async restoreChat(req, res, next) {
    try {
      const { chat_id, link } = req.query;
      console.log(chat_id, link);
      const chat = await chatService.restoreChat(chat_id, link);
      console.log(chat);
      return res.json(chat);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new ChatController();
