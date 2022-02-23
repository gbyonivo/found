import { Report } from '../db/connect.js';
import { reportSchema } from '../helpers/report.js';
import InputError from '../helpers/InputError.js';

const createReport = async (report) => {
  const { value, error } = reportSchema.validate(report);
  if (error) throw new InputError(error);
  return Report.create(value);
};

const getReport = async (reportId) => Report
  .findOne({ where: { id: reportId } });

const getReports = async () => Report.findAll();

const deleteReport = async (reportId) => Report
  .destroy({ where: { id: reportId } });

export {
  createReport,
  getReports,
  getReport,
  deleteReport,
};
