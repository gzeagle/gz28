## Express框架介绍

一个简洁而灵活的NodeJS Web应用框架，提供一系列强大的特性帮助我们创建各种Web应用。

express官网: http://www.expressjs.com.cn/

## 第三方模块介绍

1. body-parser: 解析post请求数据

	cnpm install body-parser --save



2. cookie: 读取cookie

       cnpm install cookie  --save

3. ejs: 前端模板引擎

   cnpm install ejs --save


   教程：https://github.com/mde/ejs

4. express-session: 可以将数据存放数据到session

   cnpm install  express-session --save


# 利用express来写一个博客

> 以下通过写一个博客，来学习express框架

## 安装步骤

1. 安装

  cnpm init

  cnpm install express --save

  cnpm install body-parser --save

  cnpm install cookie  --save

  cnpm install ejs --save

  cnpm install  express-session  --save

  cnpm install mysql  --save

2. 创建相关目录

   models  数据库模型文件目录

   node_modules  node第三方模块目录

   public  公共资源目录(css,js,image)

   routers   路由文件目录

   views   模板文件目录(前端页面目录)   商品详情页  模板。

   app.js   入口文件

   package.json  

3. 创建并编写入口文件app.js

    //加载express框架
    var express = require('express');



    //创建web服务器, app就是之前的var http = http.createServer();的http
    var app = express();

    //监听端口
    app.listen(3000);


4. 创建路由
    //比如用户访问  / ，显示首页
    // 访问  /login, 显示登录页


    //通过app.get()或者app.post等方法可以把一个url路径与一个或多个函数绑定

    /*

      例如：

        app.get('/', funciton (req, res, next) {
            //req,request对象，通过这个对象可以拿到url等信息
            //res,response对象，提供了响应客户端的方法
            //next,用于执行下一个和路径匹配的函数

        });

      服务器响应数据给客户端：

      res.send(string);

    

    */

    app.get('/', function (req, res, next) {

        res.send('<h1>欢迎光临我的小站</h1>');
    });

5. 使用模板引擎ejs, 修改app.js文件内容


    //设置模板文件目录
    app.set('views',__dirname + '/views');

    //配置当前应用使用的模板引擎为ejs,第一个参数为模板的名称，也是模板的后缀 
    //第二个参数表示用于解析处理模板内容的方法
    app.engine('html', require('ejs').__express);

    //注册使用模板引擎，第一个参数必须是view engine,第二个参数与app.engine中的第一个参数一致
    app.set('view engine', 'html');

    app.get('/', function (req, res, next) {

      // res.send('<h2>我的博客</h2>');


        //render()加载模板文件，并且响应给浏览器
       //render()的第一个参数：表示模板的文件名
       //第二个参数是传递给模板的数据
       res.render('index.html', {title:'首页'});


    });


6. 处理静态文件(css/图片/js)

    //修改app.js文件


    //设置静态文件托管目录
    //当浏览器访问的url以/public开头，那么直接返回public目录下对应的文件
    app.use('/public', express.static(__dirname + '/public') );

    //注意：html文件必须这样写<link rel="stylesheet" href="/public/master.css">,也就是必须是/public开头



7. 模块划分

     根据功能进行模块划分：
         a. 前台模块
         b. 后台模块
        

     使用app.use()进行模块划分：

         a.  app.use('/admin', require('./routers/admin.js') );//后台模块
         b.  app.use('/', require('./routers/main.js') );//前台模块
         


8. 修改app.js如下

        //加载express框架
        var express = require('express');

        //创建web服务器, app就是之前的var htpp = http.createServer();的http
        var app = express();

        //设置静态文件目录，
        app.use('/public', express.static(__dirname + '/public') );

        //设置模板文件目录
        app.set('views',__dirname + '/views');

        //配置当前应用使用的模板引擎为ejs,第一个参数为模板的名称，也是模板的后缀
        //第二个参数表示用于解析处理模板内容的方法
        app.engine('html', require('ejs').__express);

        //注册使用模板引擎，第一个参数必须是view engine,第二个参数与app.engine中的第一个参数一致
        app.set('view engine', 'html');

        //根据功能进行模块划分：
        app.use('/admin', require('./routers/admin.js') );//后台模块


        app.use('/', require('./routers/main.js') );//前台模块
        app.use('/api', require('./routers/api.js') );//API模块
        
        //监听端口
        app.listen(3000);

9. 创建路由文件

     在./routers/admin.js文件中：
    
         var express = require('express');
    
         //创建一个路由对象
         var router = express.Router();
    
         //当用户访问 http://IP/admin/user 就会输出 "后台user模块"
         router.get('/user', function (req, res, next) {
    
            res.send('后台user模块');
         });
    
         //导出router对象
         module.exports = router;
     
     
     在./routers/main.js文件中：
     
         var express = require('express');
    
         //创建一个路由对象
         var router = express.Router();
    
         //当用户访问 http://IP/ 就会输出 "首页模块"
         router.get('/', function (req, res, next) {
    
            res.send('首页模块');
         });
    
         //导出router对象
         module.exports = router;
     

         
         
10. 项目所有模块

   main模块
        /   前台首页
       
        /register 用户注册
        /login   用户登录
        /comment  评论列表
        /comment/post 评论提交
   
   admin模块
        
        admin/    后台首页
        
        用户管理
            admin/user   用户列表
        
        分类管理
            admin/category  分类列表
            admin/category/add  分类添加
            admin/category/edit  分类修改
            admin/category/delete  分类删除
        
        文章内容管理
            admin/article  内容列表
            admin/aritcle/add 内容添加
            admin/article/edit 内容修改
            admin/article/delete  内容删除
            
       评论内容管理
            admin/comment  评论列表
            admin/comment/delete 评论删除

11. 功能开发顺序确定

     功能模块开发先后：
     
        a. 用户
        b. 栏目(分类)
        c. 文章内容
        d. 评论功能


12. 用户注册，登录功能

13. 接受post提交的数据
 
     //在app.js中加入以下代码：
     
     
        //引入body-parser接受post数据
        var bodyParser = require('body-parser');
        
        //bodyparser设置
        app.use( bodyParser.urlencoded({extended: true}) );//可以在app的req对象增加个一个body属性，这个属性的值到post提交过来的数据
        
        
14. 登录中使用session,记录用户状态

     //在app.js中加入以下代码：
       
       //引入express-session
       var session = require('express-session');
       
       
       app.use(session({
             secret: '12345',
              name: 'testapp',   //这里的name值得是cookie的name，默认cookie的name是：connect.sid
              cookie: {maxAge: 80000 },  //设置maxAge是80000ms，即80s后session和相应的cookie失效过期
              resave: false,
              saveUninitialized: true,
       }));





