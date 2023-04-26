require('dotenv').config();
const express = require('express');
const cors = require('cors');
const router = require('./router/index');
const errorMiddleware = require('./middleware/error-middleware');
const { sequelize } = require('./db');

const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json({ extended: false }));
app.use(cors({ origin: true }));
app.use('/bot', router);
app.use(errorMiddleware);

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
    // await sequelize.sync({ force: true, alter: true });
    app.listen(PORT, () => console.log(`Server started on PORT = ${PORT}`));
  } catch (e) {
    console.log(e);
  }
};

start();
