import { Sequelize } from 'sequelize';
import { claim } from '../models/claim.js';
import { report } from '../models/report.js';
import { account } from '../models/account.js';

const connection = new Sequelize('found', 'root', 'password', {
  host: '',
  port: '',
  dialect: 'mysql'
});

const Claim = connection.define('claim', claim);
const Report = connection.define('report', report);
const Account = connection.define('account', account);

Account.hasMany(Claim, { as: 'Claims', foreignKey: 'accountId' });
Account.hasMany(Report, { as: 'Reports', foreignKey: 'accountId' });
Report.hasOne(Claim, { as: 'AcceptedClaim', foreignKey: 'claimId' });
Report.hasMany(Claim, { as: 'Claims', foreignKey: 'reportId' });

export {
  Account,
  Report,
  Claim
};