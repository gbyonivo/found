import { Sequelize } from 'sequelize';
import { claim } from '../models/claim';
import { report } from '../models/report';
import { account } from '../models/account';

const connectAndDefineDB = () => {
  const connection = new Sequelize('found', 'root', '', {
    host: 'localhost',
    port: '3306',
    dialect: 'mysql',
  });

  const Claim = connection.define('claim', claim);
  const Report = connection.define('report', report);
  const Account = connection.define('account', account);

  Account.hasMany(Claim, { as: 'Claims', foreignKey: 'accountId' });
  Account.hasMany(Report, { as: 'Reports', foreignKey: 'accountId' });
  Report.hasMany(Claim, { as: 'Claims', foreignKey: 'reportId' });

  return {
    connection,
    Account,
    Report,
    Claim,
  };
};

export default connectAndDefineDB;
