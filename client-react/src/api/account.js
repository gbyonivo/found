import foundAxios from './foundAxois';

const getMyAccount = () => foundAxios.get('/accounts/my-account');

const updateMyAccount = (account) => foundAxios.put('/accounts/my-account', account);

const deleteMyAccount = () => foundAxios.delete('/accounts/my-account');

export {
  getMyAccount,
  updateMyAccount,
  deleteMyAccount,
};
