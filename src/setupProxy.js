const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "https://www.binance.com/",
      onError: (e) => console.log("reason --- ", e),
      changeOrigin: true,
      pathRewrite: { "^/api": "" },
      logLevel: "debug",
    })
  );
};
