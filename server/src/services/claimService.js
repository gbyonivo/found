import sequleize from 'sequelize';
import { Claim, connection, Report } from '../db/connect';
import { claimSchema } from '../helpers/claim';
import { statusses } from '../helpers/common';
import ForbiddenError from '../helpers/ForbiddenError';
import InputError from '../helpers/InputError';
import { getReport } from './reportService';

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
  // if you didn't report the item then show only the user's claims
  if (report.accountId !== accountId) {
    where = { ...where, accountId };
  }
  return Claim.findAll({ where });
};

const getClaimsMadeByAccount = async (accountId) => Claim
  .findAll({ where: { accountId } });

const deleteClaim = async ({ claimId, accountId }) => Claim
  .destroy({ where: { id: claimId, accountId } });

const answerClaim = async ({
  claimId, reportId, status, accountId,
}) => {
  const report = await getReport(reportId);
  if (accountId !== report.accountId) {
    throw new ForbiddenError();
  }
  return connection.transaction(async (transaction) => {
    try {
      await Claim.update({ status }, { where: { id: claimId }, transaction });
      if (statusses.APPROVED.value === status) {
        await Claim.update(
          { status: statusses.DENIED.value },
          { where: { id: { [sequleize.Op.not]: claimId }, reportId }, transaction },
        );
        await Report.update({ claimId }, { where: { id: reportId }, transaction });
      }
      return true;
    } catch (e) {
      transaction.rollback();
      return false;
    }
  });
};

export {
  createClaim,
  getReportClaims,
  getClaim,
  deleteClaim,
  getClaimsMadeByAccount,
  answerClaim,
};
