const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'MoneysendHistory',
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      chat_id: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      task: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      manager_id: {
        type: DataTypes.BIGINT,
        allowNull: true,
      },
      create_date: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: 'moneysend_history',
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
