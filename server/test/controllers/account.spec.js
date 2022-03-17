import jwt from 'jsonwebtoken';
import * as accountService from '../../src/controllers/accountService';
import * as accountController from '../../src/controllers/account';

jest.mock('jsonwebtoken');
jest.mock('../../src/controllers/accountService');

describe('Account - controller', () => {
  let res;
  let status;
  let send;
  beforeEach(() => {
    send = jest.fn(() => {});
    status = jest.fn(() => ({ send }));
    res = { status };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('createAccount', async () => {
    const account = { id: 8 };
    jwt.sign.mockImplementation(() => 'token');
    accountService.createAccount.mockImplementation(() => Promise.resolve(account));

    await accountController.createAccount({ body: {} }, res);

    expect(accountService.createAccount).toHaveBeenCalledWith({});
    expect(status).toHaveBeenCalledWith(201);
    expect(send).toHaveBeenCalledWith('token');
  });

  test('getAccount', async () => {
    const account = { id: 8 };
    accountService.getAccount.mockImplementation(() => Promise.resolve(account));

    await accountController.getAccount({ params: { id: 8 } }, res);

    expect(accountService.getAccount).toHaveBeenCalledWith(8);
    expect(status).toHaveBeenCalledWith(200);
    expect(send).toHaveBeenCalledWith(account);
  });

  test('getMyAccount', async () => {
    const account = { id: 8 };
    accountService.getAccount.mockImplementation(() => Promise.resolve(account));

    await accountController.getMyAccount({ signedInAccount: { id: 8 } }, res);

    expect(accountService.getAccount).toHaveBeenCalledWith(8);
    expect(status).toHaveBeenCalledWith(200);
    expect(send).toHaveBeenCalledWith(account);
  });

  test('updateMyAccount', async () => {
    const account = { firstName: 'first', lastName: 'last', email: 'email' };
    const response = { ...account, token: 'token' };

    const req = { signedInAccount: { id: 1 }, body: account };
    accountService.updateAccount.mockImplementation(() => Promise.resolve(response));

    await accountController.updateMyAccount(req, res);

    expect(accountService.updateAccount).toHaveBeenCalledWith(1, account);
    expect(status).toHaveBeenCalledWith(200);
    expect(send).toHaveBeenCalledWith(response);
  });

  test('deleteMyAccount', async () => {
    const req = { signedInAccount: { id: 1 } };
    accountService.deleteAccount.mockImplementation(() => Promise.resolve());

    await accountController.deleteMyAccount(req, res);

    expect(accountService.deleteAccount).toHaveBeenCalledWith(1);
    expect(status).toHaveBeenCalledWith(200);
    expect(send).toHaveBeenCalled();
  });
});
