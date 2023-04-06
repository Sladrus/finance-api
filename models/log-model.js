const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'Logs',
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      group_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      author: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      text: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      create_date: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      message_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: 'logs',
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
