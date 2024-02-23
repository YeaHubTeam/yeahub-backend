export default {
    preset: "ts-jest",
    moduleFileExtensions: [
    "js",
    "json",
    "ts"
  ],
    rootDir: ".",
    testRegex: ".*\\.spec\\.ts$",
    transform: {
    "^.+\\.(t|j)s$": "ts-jest"
  },
    collectCoverageFrom: [
    "**/*.(t|j)s"
  ],
    coverageDirectory: "./coverage",
    testEnvironment: "node",
    roots: [
    "<rootDir>/src/"
  ],
  globals: {
    'ts-jest': {
      tsconfig: './tsconfig.json',
      isolatedModules: true,
    },
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
  }
}
