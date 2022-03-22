process.env.TZ = 'UTC';

module.exports = {
  setupFiles: ['<rootDir>/node_modules/regenerator-runtime/runtime', '<rootDir>/setupTests.js'],
  moduleFileExtensions: ['js', 'json'],
  transform: {
    '^.+\\.js$': 'babel-jest',
  },
  collectCoverage: false,
  coverageDirectory: 'coverage',
  collectCoverageFrom: [
    '**/controllers/*.js',
  ],
  coverageReporters: ['json-summary', 'text', 'lcov'],
  watchPathIgnorePatterns: ['node_modules'],
};
