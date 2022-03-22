import '../mockDB';
import jwt from 'jsonwebtoken';
import * as accountService from '../../src/services/accountService';
import * as passwordHelpers from '../../src/helpers/passwordHelper';
import { Account } from '../../src/db/connect';
import InputError from '../../src/helpers/InputError';
import { accountAttributes } from '../../src/helpers/account';

jest.mock('../../src/helpers/passwordHelper');
jest.mock('jsonwebtoken');

const moreThan20Chars = 'abcdefghijklmnopqrstuvwxyz';
const moreThan45Chars = moreThan20Chars + moreThan20Chars;

describe('accountService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  test('createAccount should call the right functions', async () => {
    const account = {
      firstName: 'frist',
      lastName: 'last',
      password: 'password',
      phone: '07435544444',
      email: 'email@ema.com',
    };
    Account.create.mockImplementation(jest.fn(() => {}));
    passwordHelpers.hashPassword
      .mockImplementation(jest.fn(() => Promise.resolve('hashed')));
    await accountService.createAccount(account);
    expect(Account.create).toHaveBeenCalledWith({ ...account, password: 'hashed' });
  });

  test.each([
    [{
      firstName: '', lastName: '', password: '', email: '', phone: '',
    }],
    [{
      firstName: moreThan45Chars, lastName: moreThan45Chars, password: 'tttt', email: 'kuma', phone: moreThan20Chars,
    }],
  ])('createAccount throws error when validation fails with %p', async (account) => {
    await expect(accountService.createAccount(account))
      .rejects
      .toThrow(InputError);
  });

  test.each([
    ['No matching account is found', null, false, false],
    ['Password does NOT match', { password: 'pass' }, false, false],
    ['when password matching', { password: 'password' }, true, { password: 'password' }],
  ])('getAccountByEmailAndPassword when %p', async (testname, account, isMatching, expected) => {
    Account.findOne.mockImplementation(() => account);
    passwordHelpers.comparePassword.mockImplementation(() => (isMatching
      ? Promise.resolve() : Promise.reject()));
    const result = await accountService.getAccountByEmailAndPassword({ email: 'email', password: 'passw' });
    expect(Account.findOne).toHaveBeenCalledWith({ where: { email: 'email' } });
    if (account) expect(passwordHelpers.comparePassword).toHaveBeenCalledWith('passw', account.password);
    if (isMatching) expect(result).toMatchObject(expected);
    else expect(result).toBe(expected);
  });

  test('getAccount', async () => {
    const accountId = 9;
    await accountService.getAccount(accountId);
    expect(Account.findOne)
      .toHaveBeenCalledWith({ where: { id: accountId }, attributes: accountAttributes });
  });

  test('getAccounts', async () => {
    await accountService.getAccounts();
    expect(Account.findAll).toHaveBeenCalledWith({ attributes: accountAttributes });
  });

  test.each([
    [{ email: 'email@em.com' }, { email: 'email@em.com' }],
    [{ firstName: 'Kuma', password: 8, lastName: 'Kums' }, { firstName: 'Kuma', lastName: 'Kums' }],
  ])('updateAccount - with %p', async (updatedAccount, calledWith) => {
    const accountId = 10;
    Account.findOne.mockImplementation(() => Promise.resolve({ id: 10, email: 'email@em.com' }));
    jwt.sign.mockImplementation(() => 'token');

    const result = await accountService.updateAccount(accountId, updatedAccount);
    expect(Account.update).toHaveBeenCalledWith(calledWith, { where: { id: accountId } });
    expect(result).toMatchObject({ token: 'token', account: { id: 10 } });
    expect(jwt.sign).toHaveBeenCalledWith({ email: 'email@em.com', id: 10 }, undefined);
  });
});
