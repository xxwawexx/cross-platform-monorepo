import rootConfig from '../../eslint.config.mjs';
import tseslint from 'typescript-eslint';
import reactPlugin from 'eslint-plugin-react';
import hooksPlugin from 'eslint-plugin-react-hooks';
import refreshPlugin from 'eslint-plugin-react-refresh';

export default tseslint.config(
  ...rootConfig,
  
  {
    files: ['src/**/*.ts', 'src/**/*.tsx'],
    plugins: {
      react: reactPlugin,
      'react-hooks': hooksPlugin,
      'react-refresh': refreshPlugin,
    },
    languageOptions: {
      parserOptions: {
        project: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      ...reactPlugin.configs.recommended.rules,
      ...hooksPlugin.configs.recommended.rules,
      'react-refresh/only-export-components': 'warn',
    },
  }
);