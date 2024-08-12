import globals from 'globals';
import pluginJs from '@eslint/js';
import pluginReact from 'eslint-plugin-react';
import babelParser from '@babel/eslint-parser';


export default [
  // Frontend config
  {
    files: ['task-manager/**/*.{js,jsx}'],
    languageOptions: {
      sourceType: 'module',
      globals: {...globals.browser},
      parser: babelParser,            
    },
    ...pluginJs.configs.recommended,
    ...pluginReact.configs.flat.recommended,
  },
  // Backend configuration (CommonJS)
  {
    files: ['task-manager-backend/**/*.js'],
    languageOptions: {
      sourceType: 'commonjs', // CommonJS for backend
      globals: {...globals.node},
    },
    ...pluginJs.configs.recommended,
  },
  // Test configuration
  {
    files: ['task-manager-backend/test/**/*.js'],
    languageOptions: {
      globals: {
        ...globals.node,
        mocha: true,
      },
    },
    rules: {
      'no-undef': 'off',
    },
  },
  // General configuration (applies to all files)
  {
    rules: {
      quotes: ['error', 'single'],
      semi: ['error', 'always'],    
    }
  }
];