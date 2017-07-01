

//引入express框架
var express = require('express');

//引入bodyParser模块，用来接收post提交的数据
var bodyParser = require('body-parser')

//var server = http.createServer();
var app = express();

//设置表单提交方式为urlencoded提交方式
app.use( bodyParser.urlencoded({extended: true}) );

//设置前端页面目录
app.set('views', __dirname + '/views');

app.engine('html', require('ejs').__express);

app.set('view engine', 'html');

app.use('/public', express.static(__dirname + '/public') );

app.use('/admin', require('./routers/admin.js') );//后台模块

app.use('/', require('./routers/main.js') );//前台模块

app.listen(300);
