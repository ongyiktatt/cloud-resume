import js from '@eslint/js';
import nextPlugin from '@next/eslint-plugin-next';
import stylistic from '@stylistic/eslint-plugin';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import importX from 'eslint-plugin-import-x';
import perfectionist from 'eslint-plugin-perfectionist';
import prettierConfig from 'eslint-config-prettier/flat';
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
      '@stylistic': stylistic,
      '@typescript-eslint': tsPlugin,
      'import-x': importX,
      perfectionist,
      'react-hooks': reactHooks,
      'react-memo': reactMemo,
      'simple-import-sort': simpleImportSort,
    },
    rules: {
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
      'import-x/first': 'error',
      'import-x/newline-after-import': 'error',
      'import-x/no-duplicates': 'error',
      'import-x/order': 'off',
      'no-irregular-whitespace': 'off',
      '@typescript-eslint/no-unused-vars': ['warn', {argsIgnorePattern: '^_'}],
      'object-curly-spacing': ['error', 'never'],
      // jsx-no-duplicate-props has no home here: TypeScript reports duplicate JSX
      // attributes itself as TS17001, and `tsc --build` runs before `next build`.
      '@stylistic/jsx-curly-brace-presence': [2, 'never'],
      'perfectionist/sort-jsx-props': 'error',
      'simple-import-sort/exports': 'error',
      'simple-import-sort/imports': 'error',
      'sort-imports': 'off',
      '@next/next/no-img-element': 'off',
    },
  },

  {
    files: ['**/*.js'],
    rules: {
      '@typescript-eslint/no-var-requires': 'off',
    },
  },
];
