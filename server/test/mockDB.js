jest.mock('../src/db/defineDB', () => jest.fn(() => ({
  connection: { transaction: jest.fn(() => {}) },
  Account: {
    create: jest.fn(() => {}),
    name: 'chrstmas card',
    findOne: jest.fn(() => Promise.resolve({})),
    findAll: jest.fn(() => Promise.resolve([])),
    update: jest.fn(() => Promise.resolve()),
  },
  Report: {
    create: jest.fn(() => {}),
    name: 'chrstmas card',
    findOne: jest.fn(() => Promise.resolve({})),
    findAll: jest.fn(() => Promise.resolve([])),
    update: jest.fn(() => Promise.resolve()),
    destroy: jest.fn(() => Promise.resolve()),
    max: jest.fn(() => Promise.resolve(10)),
    min: jest.fn(() => Promise.resolve(1)),
  },
  Claim: {
    create: jest.fn(() => {}),
    name: 'chrstmas card',
    findOne: jest.fn(() => Promise.resolve({})),
    findAll: jest.fn(() => Promise.resolve([])),
    update: jest.fn(() => Promise.resolve()),
    destroy: jest.fn(() => Promise.resolve()),
  },
})));
