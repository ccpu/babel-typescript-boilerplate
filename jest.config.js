module.exports = {
  collectCoverageFrom: ['src/**/*.{ts,tsx,js,jsx}', '!src/**/*.d.ts'],
  coverageDirectory: 'coverage',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  testEnvironment: 'node',
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(ts|js)x?$',
  testPathIgnorePatterns: ['/__tests__/fixtures/', '/__tests__/utils/'],
  preset: 'ts-jest',
  setupFilesAfterEnv: ['./jest.setup.js'],
};
