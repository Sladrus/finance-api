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
        defaultValue: 0,
      },
      chat_id: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      title: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      admin_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      update_date: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      history_hash: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      history_update: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      active: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
      },
      chat_url: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      date_activated: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      markdown: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      in_chat: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      create_date: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      last_operation: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      mixing: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      group_status: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      members_count: {
        type: DataTypes.INTEGER,
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
