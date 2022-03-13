import jwt from 'jsonwebtoken';
import { Account } from '../db/connect.js';
import { accountAttributes, accountSchema } from '../helpers/account.js';
import InputError from '../helpers/InputError.js';

const createAccount = async (account) => {
  const { value, error } = accountSchema.validate(account);
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

const updateAccount = async (accountId, { email, firstName, lastName }) => {
  let newAccountValues = {};
  if (email) newAccountValues = { ...newAccountValues, email };
  if (firstName) newAccountValues = { ...newAccountValues, firstName };
  if (lastName) newAccountValues = { ...newAccountValues, lastName };
  await Account.update(newAccountValues, { where: { id: accountId } });
  const account = await getAccount(accountId);
  return {
    token: jwt.sign({ email: account.email, id: accountId }, process.env.SECRET),
    account,
  };
};

const deleteAccount = async (accountId) => {
  await Account.destroy({ where: { id: accountId } });
};

export {
  createAccount,
  getAccounts,
  getAccount,
  deleteAccount,
  getAccountByEmailAndPassword,
  updateAccount,
};
