import { Account } from '../db/connect.js';
import { accountAttributes, accountSchema } from '../helpers/account.js';
import InputError from '../helpers/InputError.js';

const createAccount = async (account) => {
  const { value, error } = accountSchema.validate(account);
  if (error) throw new InputError(error);
  return Account.create(value);
};

const getAccount = async (accountId) => Account
  .findOne({ where: { id: accountId }, attributes: accountAttributes });

const getAccounts = async () => Account
  .findAll({ attributes: accountAttributes });

const deleteAccount = async (accountId) => Account
  .destroy({ where: { id: accountId }, attributes: accountAttributes });

export {
  createAccount,
  getAccounts,
  getAccount,
  deleteAccount,
};
