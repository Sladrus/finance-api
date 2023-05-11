const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'Chats',
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      chat_url: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      active: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
      },
      chat_id: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      issued_by: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      date_of_issue: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: 'chats',
      timestamps: false,
      indexes: [
        {
          name: 'id',
          using: 'BTREE',
          fields: [{ name: 'id' }],
        },
      ],
    }
  );
};
