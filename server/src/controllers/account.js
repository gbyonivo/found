import jwt from 'jsonwebtoken';
import { requestAsyncWrapper } from '../helpers/common';
import * as accountService from '../services/accountService';

const createAccount = async ({ body }, res) => {
  requestAsyncWrapper(async () => {
    const account = await accountService.createAccount(body);
    const token = jwt.sign({ email: account.email, id: account.id }, process.env.SECRET);
    res.status(201).send(token);
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

const getMyAccount = async ({ signedInAccount }, res) => {
  requestAsyncWrapper(async () => {
    const account = await accountService.getAccount(signedInAccount.id);
    res.status(200).send(account);
  }, res);
};

const updateMyAccount = async ({ signedInAccount, body: { firstName, lastName, email } }, res) => {
  requestAsyncWrapper(async () => {
    const tokenAndAccount = await accountService
      .updateAccount(signedInAccount.id, { firstName, lastName, email });
    res.status(200).send(tokenAndAccount);
  }, res);
};

const deleteMyAccount = async ({ signedInAccount }, res) => {
  requestAsyncWrapper(async () => {
    await accountService.deleteAccount(signedInAccount.id);
    res.status(200).send();
  }, res);
};

export {
  createAccount,
  getAccounts,
  getAccount,
  getMyAccount,
  updateMyAccount,
  deleteMyAccount,
};
