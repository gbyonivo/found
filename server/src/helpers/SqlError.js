class SqlError extends Error {
  constructor() {
    super('sql command failed');
    this.name = 'SqlError';
  }
}

export default SqlError;
