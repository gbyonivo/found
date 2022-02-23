import * as accountService from './accountService.js';

const createAccount = async ({ body }, res) => {
  try {
    const account = await accountService.createAccount(body);
    res.status(201).send(account);
  } catch (e) {
    if (e.name === 'InputError') {
      res.status(400).send(e.data);
    } else {
      res.send(500).send('Internal server error');
    }
  }
};

export {
  createAccount,
};
