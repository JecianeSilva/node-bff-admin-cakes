module.exports = {
  parse: '@typescript-eslint/parser',
  parseOptions: {
    project: 'tsconfig.json',
    tsConfigRootDir: __dirname,
    sourceType: 'module', 
  },
  plugin: ['@typescript-eslint/eslint-plugin'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended'
  ],
  root: true,
  env: {
    node: true
  },
  ignorePatterns: ['./eslintrc.js'],
  rules: {
    '@typescript-eslint/interface-name-prefix':'off',
    '@typescript-eslint/explicit-function-return-type':'off',
    '@typescript-eslint/explicit-module-boundary-types':'off',
    '@typescript-eslint/no-explicit-any':'off',
  }
}