import { Config } from '@jest/types';

const config: Config.ConfigGlobals = {
    preset: "ts-jest",
    verbose: true,
    //collectCoverage: true,
    //collectCoverageFrom: [
    //    //"src/**/**/**/*.js",
    //    //"src/**/**/**/*.ts",
    //    "!vendor/**/*.js",
    //    "!vendor/**/*.ts",
    //    "!**/node_modules/**",
    //    "src/Infrastructure/db/AppServices/*.ts", 
    //    "src/Infrastructure/db/Repository/*.ts",
    //    //"src/Infrastructure/implementations/AppServices/*.ts",
    //],
    ////coverageProvider: "babel",
    //coverageThreshold: {
    //    global: {
    //        branches: 100,
    //        functions: 100,
    //        lines: 100,
    //        statements: 100
    //    }
    //},
    moduleFileExtensions: ['js', 'json', 'ts'],
    moduleDirectories: ['node_modules', 'src'],
    roots: ['<rootDir>'],
    modulePaths: ['<rootDir>/src'],
    "resolver": "jest-ts-webcompat-resolver",
    testEnvironment: "allure-jest/node",
    testEnvironmentOptions: {
        resultsDir: "./allure-results"
    }
}

export default config;