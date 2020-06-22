module.exports = {
    devServer: {
        host: '0.0.0.0',
        port: 8080,
        https: false,
        hotOnly: true,
        proxy: {
            '/api': {
                target: 'http://localhost:7000',
                ws: true,
                changOrigin: true,
                pathRewrite: {'^/api' : ''},
            }
        }
    },
    pages: {//配置多页面入口        
        index: {          
          entry: 'src/main.js',          
          template: 'public/index.html',        
        },        
        admin: {          
          entry: 'src/admin.js',          
          template: 'public/admin.html',        
        },    
    }   
}
