const { createProxyMiddleware } = require('http-proxy-middleware');

const context = [
    "/weatherforecast",
    "/musteri",
    "/GetMusteriaa",
    "/GetMusteriListGrid",
    "/api/Musteri/Delete"
];

module.exports = function (app) {
    const appProxy = createProxyMiddleware(context, {
        target: 'https://localhost:7002',
        secure: false
    });

    app.use(appProxy);
};
