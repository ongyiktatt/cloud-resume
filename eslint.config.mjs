import js from '@eslint/js';
import nextPlugin from '@next/eslint-plugin-next';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import importPlugin from 'eslint-plugin-import';
import prettierConfig from 'eslint-config-prettier/flat';
import reactPlugin from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import simpleImportSort from 'eslint-plugin-simple-import-sort';

import reactMemo from './tools/eslint-plugin-react-memo/index.js';

const asArray = config => (Array.isArray(config) ? config : [config]);

export default [
  {
    ignores: ['out/**', '.next/**', 'build-tsc/**', 'node_modules/**', 'public/**', 'next-env.d.ts'],
  },

  js.configs.recommended,
  ...asArray(tsPlugin.configs['flat/eslint-recommended']),
  ...asArray(tsPlugin.configs['flat/recommended']),
  ...asArray(nextPlugin.configs.recommended),
  prettierConfig,

  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      parser: tsParser,
      ecmaVersion: 2020,
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: {jsx: true},
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
      import: importPlugin,
      react: reactPlugin,
      'react-hooks': reactHooks,
      'react-memo': reactMemo,
      'simple-import-sort': simpleImportSort,
    },
    settings: {
      react: {
        pragma: 'React',
        version: 'detect',
      },
    },
    rules: {
      'react/display-name': 'off',
      // The next two rules should be errors. But for now we'll leave them as warnings since this will take a while
      'react-memo/require-usememo': 'error',
      'react-memo/require-memo': 'error',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'error',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/member-ordering': [
        'warn',
        {
          interfaces: ['signature', 'method', 'constructor', 'field'],
          typeLiterals: ['signature', 'method', 'constructor', 'field'],
        },
      ],
      'import/first': 'error',
      'import/newline-after-import': 'error',
      'import/no-duplicates': 'error',
      'import/order': 'off',
      'no-irregular-whitespace': 'off',
      '@typescript-eslint/no-unused-vars': ['warn', {argsIgnorePattern: '^_'}],
      'object-curly-spacing': ['error', 'never'],
      'react/jsx-curly-brace-presence': [2, 'never'],
      'react/jsx-no-duplicate-props': 'error',
      'react/jsx-sort-props': 'error',
      'react/react-in-jsx-scope': 'off',
      'react/no-unescaped-entities': 'off',
      'simple-import-sort/exports': 'error',
      'simple-import-sort/imports': 'error',
      'sort-imports': 'off',
      '@next/next/no-img-element': 'off',
    },
  },

  {
    files: ['**/*.tsx'],
    rules: {
      'react/prop-types': 'off',
    },
  },

  {
    files: ['**/*.js'],
    rules: {
      '@typescript-eslint/no-var-requires': 'off',
    },
  },
];
