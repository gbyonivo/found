import { Claim } from '../db/connect.js';
import { claimSchema } from '../helpers/claim.js';
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

export {
  createClaim,
  getReportClaims,
  getClaim,
  deleteClaim,
  getClaimsMadeByAccount,
};
