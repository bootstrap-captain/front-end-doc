# 简介

## 1. 基本介绍

- node.js 是 一个javascript的一个运行时环境，可以用来做后端开发
- 基于chrome v8的，一个javascript的环境

![image-20240513162027211](https://erick-typora-image.oss-cn-shanghai.aliyuncs.com/img/image-20240513162027211.png)

## 2. MAC-安装

- [官网下载](https://nodejs.org/en): 下载最新版本，傻瓜式安装即可
- 版本：v20.13.1
- 安装后， node -v查看版本号
- 在终端，进入文件指定目录，node erick.js ，即可执行对应的js代码

```bash
	•	Node.js v20.13.1 to /usr/local/bin/node
	•	npm v10.5.2 to /usr/local/bin/npm
```



# 内置模块

- 内置模块在使用前，需要先导入

## fs

- 文件处理

### 读

```js
// 导入fs模块
let fs = require('fs');

fs.readFile('./book/1.txt', 'utf-8', function (err, success) {
    if (err) {
        console.log(err)
        return;
    }

    if (success) {
        console.log(success)  //读取的文本
        return;
    }
})
```

### 写

#### 覆盖写

```js
let fs = require('fs');

fs.writeFile('./book/1.txt', 'Hello word',
    'utf-8', function (error) {
        if (error) {
            console.log("写入文件失败： ", error.message);
            return;
        }

        console.log("写入成功");
    })
```

### 路径问题

- 读取文件时用的是相对路径 ./.   或者 ../ 等，可能出现问题
- node执行命令时，会将当前文件所在目录，拼接上js中的相对路径
- 如果用 node ./book 1.js，就可能存在问题(路径动态拼接错误问题)
- 可以直接用绝对路径来解决，但是不好移植

```bash
_ _ dirname: 当前js文件所处的目录： 通过这种方式动态拼接，
不管那个目录运行js文件，保证不会出错

- 但是只能拼接当前目录，无法拼接上一级目录
```

```js
let fs = require('fs');

/*__dirname: 当前js文件所处的目录*/
fs.writeFile(__dirname + 'read.txt', 'Hello Node',
    'utf-8', function (error) {

        if (error) {
            console.log(error.path)
            console.log("写入文件失败： ", error.message);
            return;
        }
        console.log("写入成功");
    })
```

## path

- 处理路径常用的一些方法

```js
const path = require("path");

/*将多个路径拼接，一种更加正规的方式: /a/b*/
let filePath = path.join('/a', '/b');
console.log(filePath);

/* ../ 会抵消一级路径，最终结果为 /a/c */
let secondPath = path.join('/a/b', '../', '/c');
console.log(secondPath);

/*  输出结果：index.html */
let fullName = path.basename('/a/b/c/index.html');
console.log(fullName);

/*  输出结果： index*/
let nameWithoutExtension = path.basename('/a/b/c/index.html', '.html');
console.log(nameWithoutExtension);

console.log(path.extname('/a/b/c/index.html')); /*文件扩展名： .html*/
console.log(path.dirname('/a/b/c/index.html'))  /*/a/b/c*/
```

# http服务器
## 1. 基本使用
- node官方提供的，用来将node变为一个服务器

```js
let http = require('http');

/* 新建一个server*/
let erickService = http.createServer();


/* 监听请求: request 事件,  只要有人通过 http://localhost:8080/ 访问网站，就会触发on函数对应的*/
erickService.on('request', function (request, response) {
    /*请求体*/
    if (request) {
        //console.log('erickService---request,', request)
        /*url: /, 地址为完整url删除 host和port后的地址*/
        console.log(`Your Method is ${request.method}, Your url is ${request.url}`);
    }

    /*响应体*/
    if (response) {
        // console.log('erickService---response, ', response);
        /*解决中文乱码问题*/
        response.setHeader('Content-Type', 'text/html;charset=utf-8');
        /* end : 结束本次请求，返回给页面的数据*/
        response.end('我是舒展');
    }

})

/*启动服务器: 启动端口，ip地址， 启动后的日志*/
erickService.listen(8080, 'localhost', function () {
    console.log('Node Server Start Successfully');
})

/*运行该js文件，则就启动服务器了*/
```
## 2. 根据url得到不同页面

```javascript
let http = require('http');
let server = http.createServer();

server.on('request', function (request, response) {
    let content;
    let url = request.url;
    if (url === '/' || url==='/index.html'){
        content = '<h1>欢迎来到首页</h1>';
    }else if(url === '/about.html'){
        content = '<h1>这是About页面</h1>';
    } else{
        content = '<h1>404 Not Find</h1>';
    }

    response.setHeader('Content-Type','text/html;charset=utf-8');
    response.end(content);
})

server.listen(8080, 'localhost', function (){
    console.log('Server Started');
})
```

# 模块化

- 复用，可维护
- 模块化规范： 如何导入和导出

```bash
# 模块划分：
内置模块，自定义模块，第三方模块(需要先下载)

# 加载
内置模块： 直接加载
自定义模块：需要引入相关路径  # let http = require('http');
第三方模块：和内置模块一样
```




## 2. 加载顺序

- require时，被加载的文件会被先执行

### demo.02.js

```javascript
/*从上向下，遇到demo01.js了，则去加载demo01.js*/
console.log('demo02 start');

require('./demo01')      // ./demo02:  可以省略后缀名，node在加载时会自动补全

console.log('demo02 end');
```
### demo01.js

```bash
console.log('demo-01')
```

## 3. 块作用域
### 3.1 js文件之间
- node中，默认情况， js 文件间变量和函数是只能当前文件访问

#### demo02.js

```javascript
let secondName = 'erick';

function secondWork(){
    console.log('job  second blocker');
}
```

#### demo01.js

```javascript
let var = require('./demo02');

/*获取的是空对象*/
console.log('I am Firs', var);
```
### 3.2 多js和html页面交互
- 多个js定义相同名字的变量，在html中引用时候，会出现重名冲突问题

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <script src="demo01.js"></script>
    <script src="demo02.js"></script>
    <script>console.log(name)</script>
</head>
<body>
</body>
</html>
```
## 4. CommonJs

- 快级作用域的导出导入

### 4.1. moudle对象
- 每个js对象都会有一个moudle内置对象

```javascript
console.log(module);
```

```yaml
/usr/local/bin/node /Users/shuzhan/Documents/workspace-js/node-demo/demo/js/erick.js
{
  id: '.',
  path: '/Users/shuzhan/Documents/workspace-js/node-demo/demo/js',
  exports: {},
  filename: '/Users/shuzhan/Documents/workspace-js/node-demo/demo/js/erick.js',
  loaded: false,
  children: [],
  paths: [
    '/Users/shuzhan/Documents/workspace-js/node-demo/demo/js/node_modules',
    '/Users/shuzhan/Documents/workspace-js/node-demo/demo/node_modules',
    '/Users/shuzhan/Documents/workspace-js/node-demo/node_modules',
    '/Users/shuzhan/Documents/workspace-js/node_modules',
    '/Users/shuzhan/Documents/node_modules',
    '/Users/shuzhan/node_modules',
    '/Users/node_modules',
    '/node_modules'
  ]
}

Process finished with exit code 0
```
### 4.2  导出和引用
- 使用require时，得到的永远都是moudle.exports指向的对象
```javascript
let name = 'erick';
let address = 'xian';

function work() {
    console.log('Working...');
}

function sleep(hours) {
    console.log(`Sleeping ${hours} hours`);
}

/* 导出变量和方法*/
module.exports = {name, address, work,sleep};
```

```javascript
let demo2 = require('./demo02');

/* 可以直接使用对应的导出的变量来接受*/
console.log(demo2.name);
console.log(demo2.address);
demo2.work();
demo2.sleep(8);
```

