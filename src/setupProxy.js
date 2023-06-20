const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    createProxyMiddleware('/api', {
      target: 'http://www.omdbapi.com',
      changeOrigin: true,
      pathRewrite: {
        '^/api': '', // Elimina la parte '/api' de la URL de la solicitud
      },
    })
  );
};
