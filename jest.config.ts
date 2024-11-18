import type { Config } from 'jest';
import { defaults } from 'jest-config';

const config: Config = {
    moduleFileExtensions: [...defaults.moduleFileExtensions, 'mts'],
    verbose: true,
    preset: 'ts-jest',
    testEnvironment: 'node',
    rootDir: 'src',
    testMatch: ['<rootDir>/__test__/**/*.{test,spec}.{js,ts}'],
    transform: {
        '^.+\\.ts$': 'ts-jest',
    },
    collectCoverage: true,
    coverageReporters: ['text', 'lcov'],
    coverageDirectory: '../coverage',
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/$1', // Adjust this based on your tsconfig.json paths
    },
};

export default config;
