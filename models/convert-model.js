const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'Converts',
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      giveAmount: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      giveType: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      getAmount: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      getType: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: 'converts',
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
