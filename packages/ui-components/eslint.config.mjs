import rootConfig from '../../eslint.config.mjs';
import tseslint from 'typescript-eslint';
import reactPlugin from 'eslint-plugin-react';
import hooksPlugin from 'eslint-plugin-react-hooks';

export default tseslint.config(
  ...rootConfig,
  
  {
    files: ['src/**/*.ts', 'src/**/*.tsx'],
    plugins: {
      react: reactPlugin,
      'react-hooks': hooksPlugin,
    },
    languageOptions: {
      parserOptions: {
        project: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    settings: {
        react: {
            version: 'detect',
        },
    },
    rules: {
      ...reactPlugin.configs.recommended.rules,
      ...hooksPlugin.configs.recommended.rules,
      
      'react/prop-types': 'off',
      'react/react-in-jsx-scope': 'off',
    },
  }
);