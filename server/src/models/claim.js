import { DataTypes } from 'sequelize';

const claim = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  accountId: {
    type: DataTypes.INTEGER,
    foreignKey: true,
  },
  reportId: {
    type: DataTypes.INTEGER,
    foreignKey: true,
  },
};

export {
  claim,
};
