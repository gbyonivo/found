class ForbiddenError extends Error {
  constructor() {
    super('User not allowed');
    this.name = 'ForbiddenError';
  }
}

export default ForbiddenError;
