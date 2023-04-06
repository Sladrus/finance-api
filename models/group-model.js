const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'Groups',
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      status: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
      chat_id: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      admin_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      update_date: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      history_hash: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      history_update: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      active: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
      },
      chat_url: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: 'groups',
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
