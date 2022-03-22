import '../mockDB';
import sequleize from 'sequelize';
import * as claimService from '../../src/services/claimService';
import * as reportService from '../../src/services/reportService';
import { Claim, connection, Report } from '../../src/db/connect';
import InputError from '../../src/helpers/InputError';
import ForbiddenError from '../../src/helpers/ForbiddenError';
import { statusses } from '../../src/helpers/common';

jest.mock('../../src/services/reportService');

const lessThan20Chars = 'abcdefghijklmnopq';

describe('claimService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  test('createClaim should call the right functions', async () => {
    const claim = {
      reportId: 1,
      accountId: 2,
      description: 'its a red gucci purse',
    };
    Claim.create.mockImplementation(jest.fn(() => {}));
    await claimService.createClaim(claim);
    expect(Claim.create).toHaveBeenCalledWith(claim);
  });

  test('createClaim with error', async () => {
    const claim = {
      reportId: 1,
      description: lessThan20Chars,
    };
    await expect(claimService.createClaim(claim))
      .rejects
      .toThrow(InputError);
    expect(Claim.create).not.toHaveBeenCalled();
  });

  test('getClaim', async () => {
    await claimService.getClaim(8);
    expect(Claim.findOne).toHaveBeenCalledWith({ where: { id: 8 } });
  });

  test.each([
    [{ accountId: 7, reportId: 9 }, true],
    [{ accountId: 29, reportId: 9 }, false],
  ])('getReportClaims with %p', async (params, matchingAccountId) => {
    const report = { id: 6, accountId: 7 };
    reportService.getReport.mockImplementation(() => Promise.resolve(report));

    await claimService.getReportClaims(params);

    if (matchingAccountId) {
      expect(Claim.findAll).toHaveBeenCalledWith({ where: { reportId: params.reportId } });
    } else {
      expect(Claim.findAll).toHaveBeenCalledWith({ where: params });
    }
  });

  test('getClaimsMadeByAccount', async () => {
    await claimService.getClaimsMadeByAccount(8);
    expect(Claim.findAll).toHaveBeenCalledWith({ where: { accountId: 8 } });
  });

  test('deleteClaim', async () => {
    await claimService.deleteClaim({ claimId: 6, accountId: 99 });
    expect(Claim.destroy).toHaveBeenCalledWith({ where: { id: 6, accountId: 99 } });
  });

  test('answerClaim throws forbidden error when account id is not a match', async () => {
    reportService.getReport.mockImplementation(() => ({ id: 1, accountId: 7 }));
    await expect(claimService.answerClaim({ accountId: 82 })).rejects.toThrow(ForbiddenError);
  });

  test('answerClaim should roll back transaction if a failure occurs', async () => {
    const transaction = { rollback: jest.fn(() => {}) };
    connection.transaction.mockImplementation((func) => func(transaction));
    reportService.getReport.mockImplementation(() => ({ id: 1, accountId: 7 }));
    Claim.update.mockImplementation(() => Promise.reject());
    const result = await claimService.answerClaim({ accountId: 7 });
    expect(transaction.rollback).toHaveBeenCalled();
    expect(result).toBe(false);
  });

  test.each([
    [statusses.APPROVED.value],
    [statusses.DENIED.value],
  ])('answerClaim is successful with status set to %p', async (status) => {
    const accountId = 7; const claimId = 3; const reportId = 9;
    const transaction = { rollback: jest.fn(() => {}) };
    connection.transaction.mockImplementation((func) => func(transaction));
    reportService.getReport.mockImplementation(() => ({ id: 1, accountId: 7 }));
    Claim.update.mockImplementation(() => Promise.resolve());
    Report.update.mockImplementation(() => Promise.resolve());

    const result = await claimService.answerClaim({
      accountId, status, claimId, reportId,
    });

    expect(Claim.update).toHaveBeenCalledWith({ status }, { where: { id: claimId }, transaction });
    if (status === statusses.APPROVED.value) {
      expect(Claim.update).toHaveBeenCalledWith(
        { status: statusses.DENIED.value },
        { where: { id: { [sequleize.Op.not]: claimId }, reportId }, transaction },
      );
      expect(Report.update)
        .toHaveBeenCalledWith({ claimId }, { where: { id: reportId }, transaction });
    }
    expect(result).toBe(true);
  });
});
