import eslint from 'eslint';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import reactPlugin from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import n from 'eslint-plugin-n';
import globals from 'globals';

export default [
  {
    ignores: ['**/*.{js,mjs}','**/*.d.ts','**/dist','**/__tests__/*'],
  },
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: ['./tsconfig.json','./test/tsconfig.spec.json','./test/cypress/tsconfig.json'],
        tsconfigRootDir: new URL('.', import.meta.url).pathname,
      },
      globals: { ...globals.es2021, ...globals.browser },
    },
    plugins: { react: reactPlugin, 'react-hooks': reactHooks, n, '@typescript-eslint': tsPlugin },
    settings: {
      node: { tryExtensions: ['.ts'], resolvePaths: ['node_modules/@types'] }
    },
    rules: {
      // keep your rules; update names if plugin authors renamed them
      ...reactHooks.configs.recommended.rules,
      'react-hooks/refs': 'off',
      'react-hooks/set-state-in-effect': 'off',
      'react-hooks/exhaustive-deps': 'off',
      'react-hooks/immutability': 'off',
      'react-hooks/immutability': 'off',
      'react-hooks/purity': 'off',
      '@typescript-eslint/ban-ts-comment': 'off',
      '@typescript-eslint/consistent-type-exports': 'error',
      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/no-empty-object-type': ['error',{ allowInterfaces: 'with-single-extends' }],
      '@typescript-eslint/no-empty-function': 'off',
      '@typescript-eslint/no-unsafe-function-type': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/no-inferrable-types': 'error',
      '@typescript-eslint/no-unused-vars': ['error',{ argsIgnorePattern:'^_', destructuredArrayIgnorePattern:'^_', caughtErrors:'none' }],
      '@typescript-eslint/no-use-before-define': 'off',
      'object-shorthand': 'error',
      'no-async-promise-executor': 'off',
      'no-case-declarations': 'off',
      'no-prototype-builtins': 'off',
      'no-extra-boolean-cast': 'off',
      'no-use-before-define': 'off',
      'semi': 'off',
    }
  }
];
