import { DataTypes } from 'sequelize';

const report = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  itemName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  accountId: {
    type: DataTypes.INTEGER,
    foreignKey: true
  },
  claimId: {
    type: DataTypes.INTEGER,
    foreignKey: true,
    allowNull: true
  }
};

export {
  report
};