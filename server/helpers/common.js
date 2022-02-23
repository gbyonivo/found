const requestAsyncWrapper = async (func, res) => {
  try {
    await func();
  } catch (e) {
    if (e.name === 'InputError') {
      res.status(400).send(e.data);
    } else {
      res.send(500).send('Internal server error');
    }
  }
};

export {
  requestAsyncWrapper,
};
