import { requestAsyncWrapper } from '../helpers/common.js';
import * as claimService from '../services/claimService';

const createClaim = async ({ body, signedInAccount }, res) => {
  requestAsyncWrapper(async () => {
    const claim = await claimService.createClaim({ ...body, accountId: signedInAccount.id });
    res.status(201).send(claim);
  }, res);
};

const answerClaim = async ({ body, signedInAccount, params }, res) => {
  requestAsyncWrapper(async () => {
    await claimService.answerClaim({ ...body, accountId: signedInAccount.id, reportId: params.id });
    res.status(200).send();
  }, res);
};

const getClaimsMadeByAccount = async ({ signedInAccount }, res) => {
  requestAsyncWrapper(async () => {
    const claim = await claimService.getClaimsMadeByAccount(signedInAccount.id);
    res.status(200).send(claim);
  }, res);
};

const getReportClaims = async (req, res) => {
  requestAsyncWrapper(async () => {
    const claims = await claimService.getReportClaims({
      reportId: req.params.id, accountId: req.signedInAccount.id,
    });
    res.status(200).send(claims);
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
  answerClaim,
};
