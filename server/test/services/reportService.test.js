import '../mockDB';
import sequleize from 'sequelize';
import * as reportService from '../../src/services/reportService';
import { Report } from '../../src/db/connect';
import InputError from '../../src/helpers/InputError';

describe('reportService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  test('createReport should call the right functions', async () => {
    const report = {
      accountId: 2,
      itemName: 'Headphones',
    };
    Report.create.mockImplementation(jest.fn(() => {}));
    await reportService.createReport(report);
    expect(Report.create).toHaveBeenCalledWith(report);
  });

  test('createReport with error', async () => {
    const report = {
      accountId: '',
      description: 'abc',
    };
    await expect(reportService.createReport(report))
      .rejects
      .toThrow(InputError);
    expect(Report.create).not.toHaveBeenCalled();
  });

  test('getReport', async () => {
    await reportService.getReport(8);
    expect(Report.findOne).toHaveBeenCalledWith({ where: { id: 8 } });
  });

  test.each([
    [{ start: '11-05-2017', end: '11-05-2018' }, true],
    [{}, false],
  ])('getReport params', async (params, hasStartAndEnd) => {
    await reportService.getReports(params);
    if (hasStartAndEnd) {
      expect(Report.findAll).toHaveBeenCalledWith({
        where: { createdAt: { [sequleize.Op.gte]: params.start, [sequleize.Op.lte]: params.end } },
      });
    } else {
      expect(Report.findAll).toHaveBeenCalledWith({ where: {} });
    }
  });

  test('deleteReport', async () => {
    await reportService.deleteReport({ reportId: 6, accountId: 99 });
    expect(Report.destroy).toHaveBeenCalledWith({ where: { id: 6, accountId: 99 } });
  });

  test('getDateMargins', async () => {
    Report.min.mockImplementation(() => Promise.resolve(8));
    Report.max.mockImplementation(() => Promise.resolve(22));
    const result = await reportService.getDateMargins();
    expect(result).toMatchObject({ max: 22, min: 8 });
  });
});
