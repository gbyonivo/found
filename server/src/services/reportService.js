import sequleize from 'sequelize';
import { Report } from '../db/connect';
import { reportSchema } from '../helpers/report';
import InputError from '../helpers/InputError';

const createReport = async (report) => {
  const { value, error } = reportSchema.validate(report);
  if (error) throw new InputError(error);
  return Report.create(value);
};

const getReport = async (reportId) => Report
  .findOne({ where: { id: reportId } });

const getReports = async ({ start, end }) => {
  let where = {};
  if (start && end) where = { createdAt: { [sequleize.Op.gte]: start, [sequleize.Op.lte]: end } };
  return Report.findAll({ where });
};

const deleteReport = async ({ reportId, accountId }) => Report
  .destroy({ where: { id: reportId, accountId } });

const getDateMargins = async () => {
  const [max, min] = await Promise.all([Report.max('createdAt'), Report.min('createdAt')]);
  return { max, min };
};

export {
  createReport,
  getReports,
  getReport,
  deleteReport,
  getDateMargins,
};
