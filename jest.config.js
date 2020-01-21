module.exports = {
  rootDir: './',
  roots: [
    '<rootDir>'
  ],
  testEnvironment: 'node',
  testPathIgnorePatterns: [
    '/node_modules/'
  ],
  moduleDirectories: [
    'node_modules/'
  ],
  coveragePathIgnorePatterns: [
    'node_modules/'
  ],
  coverageDirectory: '<rootDir>/coverage'
}
