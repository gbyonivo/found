import { useCallback, useEffect } from 'react';
import { getMyAccount, updateMyAccount, deleteMyAccount } from '../api/account';

const useAccountApiCalls = ({
  setBusy,
  setError,
  setAccount,
  setDeletingAccount,
}) => {
  useEffect(() => {
    const getAccount = async () => {
      setBusy(true);
      setError(null);
      try {
        const { data } = await getMyAccount({});
        setAccount(data);
        setBusy(false);
      } catch (e) {
        setError(e);
        setBusy(false);
      }
    }
    getAccount();
  }, [setAccount, setBusy, setError]);

  const updateAccount = useCallback(async (busy, body) => {
    busy(true)
    try {
      const { data: { token } } = await updateMyAccount(body);
      busy(false)
      localStorage.setItem('token', token);
    } catch (e) {
      busy(false)
    }
  }, []);
  const deleteAccount = useCallback(async () => {
    try {
      setDeletingAccount(true);
      await deleteMyAccount();
      localStorage.removeItem('token');
      location.href = '/'; // eslint-disable-line
    } catch (e) {
      setDeletingAccount(false);
    }
  }, [setDeletingAccount]);

  return {
    updateAccount,
    deleteAccount,
  }
};

export default useAccountApiCalls;
