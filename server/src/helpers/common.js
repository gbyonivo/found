import InputError from './InputError.js';

const requestAsyncWrapper = async (func, res) => {
  try {
    await func();
  } catch (e) {
    if (e.name === InputError.name) {
      res.status(400).send(e.data);
    } else {
      res.send(500).send('Internal server error');
    }
  }
};

const statusses = {
  APPROVED: {
    label: 'Approved',
    value: 'APPROVED',
    colour: 'green',
  },
  DENIED: {
    label: 'Denied',
    value: 'DENIED',
    colour: 'red',
  },
  PENDING: {
    label: 'Pending',
    value: 'PENDING',
    colour: 'yellow',
  },
};

export {
  requestAsyncWrapper,
  statusses,
};
