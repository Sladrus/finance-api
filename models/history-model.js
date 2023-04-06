const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'History',
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      group_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      symbol: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      type: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      val: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      comment: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      create_date: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      message_id: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      first_name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      admin_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      event: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: 'history',
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
