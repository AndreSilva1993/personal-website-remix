/** @type {import('eslint').Linter.Config} */
module.exports = {
  extends: ['@remix-run/eslint-config', '@remix-run/eslint-config/node'],
  rules: {
    'import/order': [
      'error',
      {
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
        groups: ['builtin', 'external', 'sibling', 'parent'],
        pathGroups: [
          {
            // Match CSS files and place them at the top of the file.
            pattern: '*.css',
            group: 'builtin',
            position: 'before',
            patternOptions: { matchBase: true },
          },
          {
            // Match CSS imports that contain ?url at the end (necessary for Vite)
            // and place them at the top of the file.
            pattern: '*.css\\?url',
            group: 'builtin',
            position: 'before',
            patternOptions: { matchBase: true },
          },
          {
            pattern: '~/**',
            group: 'parent',
          },
        ],
      },
    ],
  },
};
