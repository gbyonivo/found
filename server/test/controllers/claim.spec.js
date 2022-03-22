import * as claimService from '../../src/controllers/claimService';
import * as claimController from '../../src/controllers/claim';

jest.mock('../../src/controllers/claimService');

describe('Claim - controller', () => {
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

  test('createClaim', async () => {
    const claim = { id: 8 };
    const req = { body: {}, signedInAccount: { id: 4 } };
    claimService.createClaim.mockImplementation(() => Promise.resolve(claim));

    await claimController.createClaim(req, res);

    expect(claimService.createClaim).toHaveBeenCalledWith({ accountId: 4 });
    expect(status).toHaveBeenCalledWith(201);
    expect(send).toHaveBeenCalledWith(claim);
  });

  test('answerClaim', async () => {
    const req = { body: {}, signedInAccount: { id: 4 }, params: { id: 8 } };
    claimService.answerClaim.mockImplementation(() => Promise.resolve());

    await claimController.answerClaim(req, res);

    expect(claimService.answerClaim).toHaveBeenCalledWith({ accountId: 4, reportId: 8 });
    expect(status).toHaveBeenCalledWith(200);
    expect(send).toHaveBeenCalled();
  });

  test('getClaimsMadeByAccount', async () => {
    const claim = { id: 8 };
    const req = { body: {}, signedInAccount: { id: 4 } };
    claimService.getClaimsMadeByAccount.mockImplementation(() => Promise.resolve(claim));

    await claimController.getClaimsMadeByAccount(req, res);

    expect(claimService.getClaimsMadeByAccount).toHaveBeenCalledWith(4);
    expect(status).toHaveBeenCalledWith(200);
    expect(send).toHaveBeenCalledWith(claim);
  });

  test('getReportClaims', async () => {
    const claim = { id: 8 };
    const req = { body: {}, signedInAccount: { id: 4 }, params: { id: 5 } };
    claimService.getReportClaims.mockImplementation(() => Promise.resolve([claim]));

    await claimController.getReportClaims(req, res);

    expect(claimService.getReportClaims).toHaveBeenCalledWith({ reportId: 5, accountId: 4 });
    expect(status).toHaveBeenCalledWith(200);
    expect(send).toHaveBeenCalledWith([claim]);
  });

  test('getClaim', async () => {
    const claim = { id: 8 };
    const req = { body: {}, signedInAccount: { id: 4 }, params: { id: 5 } };
    claimService.getClaim.mockImplementation(() => Promise.resolve(claim));

    await claimController.getClaim(req, res);

    expect(claimService.getClaim).toHaveBeenCalledWith(5);
    expect(status).toHaveBeenCalledWith(200);
    expect(send).toHaveBeenCalledWith(claim);
  });
});
