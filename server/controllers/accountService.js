import { Account } from '../db/connect.js';
import { accountAttributes, accountSchema } from '../helpers/account.js';
import InputError from '../helpers/InputError.js';

const createAccount = async (account) => {
  const { value, error, ...rest } = accountSchema.validate(account);
  if (error) throw new InputError(error);
  return Account.create(value);
};

const getAccountByEmailAndPassword = async ({ email, password }) => {
  const account = await Account.findOne({ where: { email, password } });
  return account;
};

const getAccount = async (accountId) => Account
  .findOne({ where: { id: accountId }, attributes: accountAttributes });

const getAccounts = async () => Account
  .findAll({ attributes: accountAttributes });

const deleteAccount = async (accountId) => Account
  .destroy({ where: { id: accountId } });

export {
  createAccount,
  getAccounts,
  getAccount,
  deleteAccount,
  getAccountByEmailAndPassword,
};
