import globals from "globals";
import pluginJs from "@eslint/js";
import eslintConfigPrettier from 'eslint-config-prettier';
import eslintPluginPrettier from 'eslint-plugin-prettier';


/** @type {import('eslint').Linter.Config[]} */
export default [
  pluginJs.configs.recommended,
  {
    files: ["**/*.js"], 
    languageOptions: {
      sourceType: "commonjs",
      globals: globals.node
    },
    rules: {
      "no-undef": "warn",
      "no-unused-vars": "off"
    },
    plugins: {
      prettier: eslintPluginPrettier
    }
  },
  eslintConfigPrettier,
];