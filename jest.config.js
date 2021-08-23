/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: "ts-jest/presets/js-with-babel",
  collectCoverageFrom: ["**/(api|components)/**"],
  moduleDirectories: ["node_modules"],
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/setupTests.ts"],
  moduleNameMapper: {
    "^api/(.+)$": "<rootDir>/api/$1",
    "^components/(.+)$": "<rootDir>/components/$1",
    "^tests/(.+)$": "<rootDir>/tests/$1",
  },
};
