module.exports = {
    root: true,
    env: { browser: true, es2020: true },
    extends: [
        'google',
        'plugin:prettier/recommended',
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:react-hooks/recommended',
    ],
    ignorePatterns: ['dist', '.eslintrc.cjs'],
    parser: '@typescript-eslint/parser',
    plugins: ['react-refresh'],
    rules: {
        'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
        'prettier/prettier': 'error',
        'max-len': ['error', { code: 150 }],
        'object-curly-newline': ['error', { multiline: true, consistent: true }],
        'require-jsdoc': 'off',
        'semi': 'error',
        '@typescript-eslint/semi': ['error', 'always'],
    },
}
