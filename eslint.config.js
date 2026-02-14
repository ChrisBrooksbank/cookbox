import eslint from '@eslint/js';
import prettier from 'eslint-config-prettier';
import globals from 'globals';

export default [
    eslint.configs.recommended,
    prettier,
    {
        languageOptions: {
            ecmaVersion: 2022,
            sourceType: 'module',
            globals: {
                ...globals.browser,
                ...globals.serviceworker,
            },
        },
        rules: {
            'no-unused-vars': [
                'warn',
                {
                    argsIgnorePattern: '^_',
                    varsIgnorePattern: '^_',
                    caughtErrorsIgnorePattern: '^_',
                },
            ],
            'no-console': 'warn',
            'prefer-const': 'warn',
            'no-var': 'error',
        },
    },
    {
        files: ['*.config.js', 'e2e/**/*.js'],
        languageOptions: {
            globals: {
                ...globals.node,
            },
        },
    },
    {
        ignores: ['node_modules/', 'test-results/', 'playwright-report/'],
    },
];
