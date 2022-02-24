import { GENERIC_ERROR_MESSAGE } from "../constants/common";

const getRegistrationError = (e) => {
  if (e && e.response && e.response.data && e.response.data.error) {
    return e.response.data.error.reduce((acc, curr) => ({ [curr.context.key]: curr.message }), {});
  }
  return { generic: GENERIC_ERROR_MESSAGE };
};

const getLoginError = (e) => {
  if (e && e.response && e.response.status === 401) {
    return 'Sorry, we don\'t recognise your details.'
  }
  return GENERIC_ERROR_MESSAGE;
};

export {
  getRegistrationError,
  getLoginError
};