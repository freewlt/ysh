module.exports = {
    devServer: {
        host: "0.0.0.0",
        port: 8081,
        https: false,
        hotOnly: true,
        proxy: {
            "/api-base": {
                target: "http://192.168.0.209:7000",
                ws: true,
                changOrigin: true,
                pathRewrite: { "^/api-base": "" },
            },
            "/api-file": {
                target: "http://192.168.0.209:7200",
                ws: true,
                changOrigin: true,
                pathRewrite: { "^/api-file": "" },
            },
        }
    },
    pages: {//配置多页面入口        
        index: {
            entry: "src/main.js",
            template: "public/index.html",
        },
        admin: {
            entry: "src/admin.js",
            template: "public/admin.html",
        },
    },
};
