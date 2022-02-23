import { Account } from '../db/connect.js';
import { accountSchema } from '../helpers/account.js';
import InputError from '../helpers/InputError.js';

const createAccount = async (account) => {
  const { value, error } = accountSchema.validate(account);
  if (error) throw new InputError(error);
  return Account.create(value);
};

export {
  createAccount,
};
