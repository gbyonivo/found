import { requestAsyncWrapper } from '../helpers/common.js';
import * as claimService from './claimService.js';

const createClaim = async ({ body }, res) => {
  requestAsyncWrapper(async () => {
    const claim = await claimService.createClaim(body);
    res.status(201).send(claim);
  }, res);
};

const getClaimsMadeByAccount = async (req, res) => {
  requestAsyncWrapper(async () => {
    const claim = await claimService.getClaimsMadeByAccount();
    res.status(200).send(claim);
  }, res);
};

const getReportClaims = async (req, res) => {
  requestAsyncWrapper(async () => {
    const claim = await claimService.getReportClaims();
    res.status(200).send(claim);
  }, res);
};

const getClaim = async (req, res) => {
  requestAsyncWrapper(async () => {
    const claim = await claimService.getClaim(req.params.id);
    res.status(200).send(claim);
  }, res);
};

export {
  createClaim,
  getClaimsMadeByAccount,
  getReportClaims,
  getClaim,
};
