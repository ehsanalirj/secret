module.exports = {
  testEnvironment: 'jsdom',
  roots: ['<rootDir>/src'],
  coverageDirectory: 'coverage',
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
  collectCoverageFrom: ['src/**/*.jsx', 'src/**/*.js'],
};
