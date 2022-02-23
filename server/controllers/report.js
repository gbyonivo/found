import { requestAsyncWrapper } from '../helpers/common.js';
import * as reportService from './reportService.js';

const createReport = async ({ body, signedInAccount }, res) => {
  requestAsyncWrapper(async () => {
    const report = await reportService.createReport({ ...body, accountId: signedInAccount.id });
    res.status(201).send(report);
  }, res);
};

const getReports = async (req, res) => {
  requestAsyncWrapper(async () => {
    const report = await reportService.getReports();
    res.status(200).send(report);
  }, res);
};

const getReport = async (req, res) => {
  requestAsyncWrapper(async () => {
    const report = await reportService.getReport(req.params.id);
    res.status(200).send(report);
  }, res);
};

export {
  createReport,
  getReports,
  getReport,
};
