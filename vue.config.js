module.exports = {
    devServer: {
        host: '0.0.0.0',
        port: 8080,
        https: false,
        hotOnly: false,
        proxy: {
            '/api': {
                target: 'http://localhost:7000',
                ws: true,
                changOrigin: true,
                pathRewrite: {'^/api' : ''},
            }
        }
    }    
}
