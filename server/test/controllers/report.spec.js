import * as reportService from '../../src/services/reportService';
import * as reportController from '../../src/controllers/report';

jest.mock('../../src/services/reportService');

describe('Report - controller', () => {
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

  test('createReport', async () => {
    const report = { id: 8 };
    const req = { body: {}, signedInAccount: { id: 4 } };
    reportService.createReport.mockImplementation(() => Promise.resolve(report));

    await reportController.createReport(req, res);

    expect(reportService.createReport).toHaveBeenCalledWith({ accountId: 4 });
    expect(status).toHaveBeenCalledWith(201);
    expect(send).toHaveBeenCalledWith(report);
  });

  test('getReports', async () => {
    const report = { id: 8 };
    const req = { params: {}, signedInAccount: { id: 4 } };
    reportService.getReports.mockImplementation(() => Promise.resolve([report]));

    await reportController.getReports(req, res);

    expect(reportService.getReports).toHaveBeenCalledWith({});
    expect(status).toHaveBeenCalledWith(200);
    expect(send).toHaveBeenCalledWith([report]);
  });

  test('getReport', async () => {
    const report = { id: 8 };
    const req = { params: { id: 7 }, signedInAccount: { id: 4 } };
    reportService.getReport.mockImplementation(() => Promise.resolve(report));

    await reportController.getReport(req, res);

    expect(reportService.getReport).toHaveBeenCalledWith(7);
    expect(status).toHaveBeenCalledWith(200);
    expect(send).toHaveBeenCalledWith(report);
  });

  test('getReportDateMargins', async () => {
    const margins = { start: '1992-05-11', end: '1992-06-02' };
    const req = {};
    reportService.getDateMargins.mockImplementation(() => Promise.resolve(margins));

    await reportController.getReportDateMargins(req, res);

    expect(reportService.getDateMargins).toHaveBeenCalled();
    expect(status).toHaveBeenCalledWith(200);
    expect(send).toHaveBeenCalledWith(margins);
  });
});
