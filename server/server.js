//请求Node.js自带的http模块。 
var http = require('http');     
 
//http模块提供了createServer函数,这个函数会返回一个对象，我们将返回的对象赋值给server。
var server = http.createServer(function(req, res){
    //设置响应的头部。 content-Type 响应数据内容的类型
    res.setHeader("Content-Type","text/html; charset=utf-8");  
    res.writeHead(200,'ok');		//HTTP状态值
    res.write('Hello Node!!');		//响应内容
    res.end();	
	
});
 
//这个对象有个叫做listen的方法，这个方法可以有个数值参数。
//指定这个HTTP服务器监听的端口号。
//当我们打开http://localhost:8080的时候，服务器就会接收数据，并且响应数据
server.listen(7000);