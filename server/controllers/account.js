import * as accountService from './accountService.js';

const requestAsyncWrapper = async (func, res) => {
  try {
    await func();
  } catch (e) {
    if (e.name === 'InputError') {
      res.status(400).send(e.data);
    } else {
      res.send(500).send('Internal server error');
    }
  }
};

const createAccount = async ({ body }, res) => {
  requestAsyncWrapper(async () => {
    const account = await accountService.createAccount(body);
    res.status(201).send(account);
  }, res);
};

export {
  createAccount,
};
