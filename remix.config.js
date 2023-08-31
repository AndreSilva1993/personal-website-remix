/** @type {import('@remix-run/dev').AppConfig} */
module.exports = {
  ignoredRouteFiles: ['**/.*'],
  serverBuildPath: 'api/index.js',
  future: {
    v2_dev: true,
    v2_meta: true,
    v2_headers: true,
    v2_errorBoundary: true,
    v2_routeConvention: true,
    v2_normalizeFormMethod: true,
  },
};
