import { requestAsyncWrapper } from '../helpers/common.js';
import * as accountService from './accountService.js';

const createAccount = async ({ body }, res) => {
  requestAsyncWrapper(async () => {
    const account = await accountService.createAccount(body);
    res.status(201).send(account);
  }, res);
};

const getAccounts = async (req, res) => {
  requestAsyncWrapper(async () => {
    const account = await accountService.getAccounts();
    res.status(200).send(account);
  }, res);
};

const getAccount = async (req, res) => {
  requestAsyncWrapper(async () => {
    const account = await accountService.getAccount(req.params.id);
    res.status(200).send(account);
  }, res);
};

export {
  createAccount,
  getAccounts,
  getAccount,
};
