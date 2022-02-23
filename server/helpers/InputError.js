class InputError extends Error {
  constructor(error) {
    super('Error with user inputs');
    this.name = 'InputError';
    this.data = { error: error.details };
  }
}

export default InputError;
