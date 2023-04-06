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

  async createChat(body) {
    return await sequelize.transaction(async function (transaction) {
      if (!body?.invite_users)
        throw ApiError.BadRequest('Список юзеров отсутствует');
      const chatParams = await TelegramService.createChats(body);
      for (var i = 0; i < chatParams.length; i++) {
        const chat = await ChatModel.create({
          chat_id: chatParams[i].chatId,
          chat_url: chatParams[i].url,
          active: 1,
        });
      }
      return chatParams;
    });
  }
}

module.exports = new ChatService();
