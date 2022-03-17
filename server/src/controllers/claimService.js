import sequleize from 'sequelize';
import { Claim, connection, Report } from '../db/connect.js';
import { claimSchema } from '../helpers/claim.js';
import { statusses } from '../helpers/common.js';
import ForbiddenError from '../helpers/ForbiddenError.js';
import InputError from '../helpers/InputError.js';
import { getReport } from './reportService.js';

const createClaim = async (claim) => {
  const { value, error } = claimSchema.validate(claim);
  if (error) throw new InputError(error);
  return Claim.create(value);
};

const getClaim = async (claimId) => Claim
  .findOne({ where: { id: claimId } });

const getReportClaims = async ({ reportId, accountId }) => {
  const report = await getReport(reportId);
  let where = { reportId };
  if (report.accountId !== accountId) {
    where = { ...where, accountId };
  }
  return Claim.findAll({ where });
};

const getClaimsMadeByAccount = async (accountId) => Claim
  .findAll({ where: { accountId } });

const deleteClaim = async (claimId) => Claim
  .destroy({ where: { id: claimId } });

const answerClaim = async ({
  claimId, reportId, status, accountId,
}) => {
  const report = await getReport(reportId);
  if (accountId !== report.accountId) {
    throw new ForbiddenError();
  }
  connection.transaction(async (transaction) => {
    try {
      await Claim.update({ status }, { where: { id: claimId }, transaction });
      if (statusses.APPROVED.value === status) {
        await Claim.update(
          { status: statusses.DENIED.value },
          { where: { id: { [sequleize.Op.not]: claimId }, reportId }, transaction },
        );
      }
      await Report.update({ claimId }, { where: { id: reportId }, transaction });
    } catch (e) {
      transaction.rollback();
    }
  });
  return true;
};

export {
  createClaim,
  getReportClaims,
  getClaim,
  deleteClaim,
  getClaimsMadeByAccount,
  answerClaim,
};
