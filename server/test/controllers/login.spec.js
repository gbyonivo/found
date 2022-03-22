import jwt from 'jsonwebtoken';
import * as accountService from '../../src/services/accountService';
import * as loginController from '../../src/controllers/login';

jest.mock('jsonwebtoken');
jest.mock('../../src/services/accountService');

describe('Login - controller', () => {
  let res;
  let status;
  let sendStatus;
  let send;
  beforeEach(() => {
    send = jest.fn(() => {});
    status = jest.fn(() => ({ send }));
    sendStatus = jest.fn(() => {});
    res = { status, sendStatus };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test.each([
    ['successful', true],
    ['failed', false],
  ])('login - %p', async (testname, success) => {
    const account = { id: 8, email: 'em' };
    const body = { email: 'em', password: 'pass' };
    jwt.sign.mockImplementation(() => 'token');
    accountService.getAccountByEmailAndPassword.mockImplementation(
      () => Promise.resolve(success ? account : null),
    );

    await loginController.login({ body }, res);

    expect(accountService.getAccountByEmailAndPassword).toHaveBeenCalledWith(body);
    if (success) {
      expect(status).toHaveBeenCalledWith(200);
      expect(send).toHaveBeenCalledWith('token');
      expect(jwt.sign).toHaveBeenCalledWith(account, undefined);
    } else {
      expect(status).toHaveBeenCalledWith(401);
      expect(send).toHaveBeenCalled();
    }
  });

  test.each([
    ['with authorization token', 'bearer token'],
    ['without authorization token', null],
  ])('authenticateToken - %p', (testname, authorization) => {
    const req = { headers: { authorization } };
    jwt.verify.mockImplementation(() => {});

    loginController.authenticateToken(req, res);
    if (authorization) {
      expect(jwt.verify).toHaveBeenCalled();
    } else {
      expect(sendStatus).toHaveBeenCalledWith(401);
    }
  });
});
