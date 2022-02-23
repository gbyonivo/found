import { Claim } from '../db/connect.js';
import { claimSchema } from '../helpers/claim.js';
import InputError from '../helpers/InputError.js';

const createClaim = async (claim) => {
  const { value, error } = claimSchema.validate(claim);
  if (error) throw new InputError(error);
  return Claim.create(value);
};

const getClaim = async (claimId) => Claim
  .findOne({ where: { id: claimId } });

const getReportClaims = async (reportId) => Claim
  .findAll({ where: { reportId } });

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
