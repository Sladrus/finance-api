const { Op } = require("sequelize");
const { sequelize } = require("../db");
const ApiError = require("../exceptions/api-error");
const { formatDate } = require("../utils/utils");
const { default: axios } = require("axios");
const ChatModel = sequelize.models.Chats;
require("dotenv").config();

const TELEGRAM_API = `https://api.telegram.org/bot${process.env.BOT_TOKEN}`;
class ChatService {
  async findChat(chat_id) {
    return await sequelize.transaction(async function (transaction) {
      const chat = await ChatModel.findOne({
        where: { chat_id: chat_id },
        transaction,
      });
      return chat;
    });
  }

  async findChatWhere(body) {
    return await sequelize.transaction(async function (transaction) {
      const chats = await ChatModel.findAll({
        where: body,
        transaction,
      });
      return chats;
    });
  }

  async createChat(body) {
    return await sequelize.transaction(async function (transaction) {
      const chat = await ChatModel.create(
        {
          ...body,
        },
        { transaction }
      );
      return chat;
    });
  }

  async findWhereTaken() {
    return await sequelize.transaction(async function (transaction) {
      const chats = await ChatModel.findAll({
        where: {
          date_of_issue: {
            [Op.not]: null,
          },
          active: 1,
        },
        transaction,
      });
      return chats;
    });
  }

  async getEmptyChat() {
    try {
      return await sequelize.transaction(async function (transaction) {
        const chat = await ChatModel.findOne({
          where: { active: 0 },
          transaction,
        });
        if (!chat) {
          throw ApiError.BadRequest("Свободные чаты отсутствуют");
        }
        chat.active = 1;
        chat.date_of_issue = formatDate(new Date());
        chat.issued_by = "chat";
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

  async restoreChat(chat_id, link) {
    return await sequelize.transaction(async function (transaction) {
      if (chat_id === undefined || link == undefined)
        throw ApiError.BadRequest("Ошибка ввода данных");
      const chat = await ChatModel.findOne({
        where: { chat_id },
        transaction,
      });
      if (!chat) {
        throw ApiError.ForbiddenError();
      }
      await chat.destroy();
      const newChat = await ChatModel.create(
        {
          chat_url: link,
          chat_id: chat_id,
        },
        { transaction }
      );
      return newChat;
    });
  }

  async updateLink(chat_id) {
    return await sequelize.transaction(async function (transaction) {
      try {
        const response = await axios.post(
          `${TELEGRAM_API}/exportChatInviteLink`,
          {
            chat_id,
          }
        );
        console.log("Новая приватная ссылка:", response.data.result);
        return { chat_id, new_chat_url: response.data.result };
      } catch (error) {
        console.error("Ошибка при обновлении приватной ссылки:", error);
        throw ApiError.BadRequest(error?.response?.data?.description, [
          error?.response?.data,
        ]);
      }
    });
  }

  async getChatUrl(chat_id) {
    return await sequelize.transaction(async function (transaction) {
      try {
        console.log(chat_id);
        const chat = await ChatModel.findOne({
          where: { chat_id },
          transaction,
        });
        if (!chat) {
          throw ApiError.BadRequest("Такого чата не существует.");
        }
        if (!chat?.chat_url) {
          throw ApiError.BadRequest("Ссылка на чат отсутствует.");
        }
        return { chat_id, chat_url: chat?.chat_url };
      } catch (error) {
        throw ApiError.BadRequest(error?.response?.data?.description, [
          error?.response?.data,
        ]);
      }
    });
  }
}

module.exports = new ChatService();
