const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'Tasks',
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      text: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      deadline_date: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      group_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      active: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 1,
      },
    },
    {
      sequelize,
      tableName: 'tasks',
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
