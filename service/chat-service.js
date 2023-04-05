const { sequelize } = require('../db');
const ApiError = require('../exceptions/api-error');
const TelegramService = require('../telegram');
const ChatModel = sequelize.models.Chats;

class ChatService {
  async getEmptyChat() {
    try {
      return await sequelize.transaction(async function (transaction) {
        await ChatModel.update({ active: 0 }, { where: { active: 1 } });
        const chat = await ChatModel.findOne({
          where: { active: 0, group_id: null },
        });
        if (!chat) {
          throw ApiError.BadRequest('Свободные чаты отсутствуют');
        }
        chat.active = 1;
        await chat.save();
        const res = await chat.get();
        console.log(res);
        return res;
      });
    } catch (e) {
      console.log(e);
      throw ApiError.BadRequest();
    }
  }

  async createChat(title) {
    try {
      return await sequelize.transaction(async function (transaction) {
        const chatParams = await TelegramService.createChat(title);
        const chat = await ChatModel.create({
          chat_id: chatParams.chatId,
          chat_url: chatParams.link,
          active: 1,
        });
        return chat;
      });
    } catch (e) {
      console.log(e);
      if (e?.errorMessage) {
        await TelegramService.disconnect();
        return await this.createChat(title);
      }
    }
  }
}

module.exports = new ChatService();
