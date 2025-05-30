import eslint from '@eslint/js';
import reactPlugin from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import globals from 'globals';
import n from 'eslint-plugin-n';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    ignores: [
      '**/*.{js,mjs}',
      '**/*.d.ts',
      '**/dist',
      '**/__tests__/*',
    ],
  },
  {
    extends: [
      eslint.configs.recommended,
      ...tseslint.configs.recommended,
    ],
    plugins: {
      'react-hooks': reactHooks,
      react: reactPlugin,
      n
    },
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      globals: {
        ...globals.es2021,
        ...globals.browser,
      },
      parser: tseslint.parser,
      parserOptions: {
        project: ['./tsconfig.json', './test/tsconfig.spec.json', './test/cypress/tsconfig.json'],
        tsconfigRootDir: import.meta.dirname,
      }
    },
    settings: {
      node: {
        tryExtensions: ['.ts'],
        resolvePaths: ['node_modules/@types']
      }
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      '@typescript-eslint/ban-ts-comment': 'off',
      '@typescript-eslint/consistent-type-exports': 'error',
      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/no-empty-object-type': [
        'error',
        { allowInterfaces: 'with-single-extends' }, // maybe we should turn this on in a new PR
      ],
      '@typescript-eslint/no-empty-function': 'off',
      '@typescript-eslint/no-empty-object-type': 'off',
      '@typescript-eslint/no-unsafe-function-type': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/no-inferrable-types': 'error',
      '@typescript-eslint/no-unused-expressions': 'off',
      '@typescript-eslint/no-unused-vars': ['error', { 'argsIgnorePattern': '^_', 'destructuredArrayIgnorePattern': '^_', caughtErrors: 'none' }],
      'object-shorthand': 'error',
      'no-async-promise-executor': 'off',
      'no-case-declarations': 'off',
      'no-prototype-builtins': 'off',
      'no-extra-boolean-cast': 'off',
      "react-hooks/exhaustive-deps": 'off',
      'semi': 'off',
    }
  });
