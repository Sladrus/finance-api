const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'BannedPersons',
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      fullname: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      wallet: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      category: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      type: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      subtype: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      value: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      subvalue: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      source: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      date: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      inn: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      kpp: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      reason: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      regnumber: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: 'banned_persons',
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
