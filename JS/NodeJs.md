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

- 复用，可维护， 按需加载
- 模块化规范： 如何导入和导出

## 1. 模块化

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

# NPM

- 对三方包的管理

## 1. NPM
- Node Package Manager:  npm.inc公司的一个，关于node 的包管理工具
- [npm第三方依赖](https://www.npmjs.com/)
- 随着node的安装，会一起安装在客户机上
- npm -v可以查看对应的npm的版本: 10.5.2

##  2. 项目构建
### 2.1 初始化
- npm规定，在项目中必须有一个package.json来定义依赖的包，类似maven中的pom.xml
- 创建空目录
- npm init -y： 会在执行命令的目录下，创建一个package.json来管理，可以创建多个

#### package.json

```yaml
{
  "name": "node_learn",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "lodash": "^4.17.21"
  }
}
```
### 2.2 安装第三方包
- npm install lodash
- 会在项目根路径下，创建node_moudles模块，并将第三方包放进去
- 修改对应的package.json，更新对应依赖
- 创建pachage.lock.json文件，会详细定义具体的依赖的版本，组织等信息

![image-20240513180746201](https://erick-typora-image.oss-cn-shanghai.aliyuncs.com/img/image-20240513180746201.png)

### 2.3 项目代码
- 不需要上传node_modules模块的代码，因为体积太大
- 源代码拿到，直接 npm install 就会把配置文件中指定的第三方包下载到本地项目中
- 有时候第三方包加载出现问题，可以直接删除node_modules，然后 npm install

### 2.4 DevDepenency/ Dependency
- DevDepenency: 只会在开发时候用到，项目实际运行时候不需要
- Dependency： 开发和运行时候都需要
- npm install moment --save-dev
- 如何判断： 去npm来看就可以了


## 3. 镜像配置
- 默认npm包是从海外服务器拉的

### 3.1直接修改
```bash
# npm 默认拉取地址
https://registry.npmjs.org/

# 使用淘宝镜像
npm config set registry https://registry.npmmirror.com/

#  切回默认地址
npm config set registry https://registry.npmjs.org/

# 验证是否成功
npm config get registry
```
### 3.2 nrm

```bash
# 下载对应的工具
npm install -g nrm

# 如果权限失败
sudo npm install -g nrm

# 查看哪些镜像可用
nrm ls

# 选择哪个镜像： 会将npm的registry参数修改
nrm use taobao

# 验证是否成功
npm config get registry
```

```bash
* npm ---------- https://registry.npmjs.org/
  yarn --------- https://registry.yarnpkg.com/
  tencent ------ https://mirrors.cloud.tencent.com/npm/
  cnpm --------- https://r.cnpmjs.org/
  taobao ------- https://registry.npmmirror.com/
  npmMirror ---- https://skimdb.npmjs.com/registry/
```

## 4. 包分类

### 4.1.项目包
- 安装在项目中的node_modules模块下的包
- 分为开发依赖时包和开发运行依赖包

### 4.2 全局包
- 安装到本地的node/npm/node_modules模块
- 只有工具一类的包，才需要安装全局包
```bash
# 安装的时候提供    -g
# 卸载的指令       -g
npm install lodash -g
```
## 5. 自定义包
### 5.1 创建项目
- name: 希望后面从npm官方仓库被搜索的名字，不能和npm上其他包名重复， 也是npm install时候名字
- main: 程序的入口文件，别人需要导入时的文件
- license: npm 遵循的协议
- keywords:  npm 中搜索的时候的关键字
```bash
# 在项目文件中，生成一个package.json
npm init -y
```
**package.json**

```yaml
{
  "name": "erick_log",
  "version": "1.0.0",
  "description": "This is a demo project ",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": ["erick","nike"],
  "author": "Erick Shu",
  "license": "ISC"
}
```

### 5.2 目录结构
![在这里插入图片描述](https://img-blog.csdnimg.cn/a48ba19b71924eeaabe158d8ecf8972c.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA6aOe57-U55qE6I-c6bif5Y-U,size_20,color_FFFFFF,t_70,g_se,x_16#pic_center)

#### cat.js

```javascript
let name = 'cat';
let food = 'fish meat';

function play() {
    console.log('Cat Play with Fur Ball');
}

function eat() {
    console.log(`Cat eat ${food}`);
}

module.exports = {name, food, play, eat}
```
#### dog.js

```javascript
let name = 'dog';
let food = 'pork meat';

function play() {
    console.log('Dog Love Swiming');
}

function eat() {
    console.log(`Dog eat ${food}`);
}

module.exports = {name, food, play, eat}
```
#### index.js

- 一般情况，index.js作为程序入口，只是对外导出对应的文件
- 尽可能少的涉及具体的业务逻辑
```javascript
let info = 'This is introduction of this project';

let cat = require('./src/cat');
let dog = require('./src/dog');

module.exports = {
    info,
    cat,
    dog
}
```

#### 使用

```javascript
/*本项目内引用*/
/*let data = require('./index');*/

/* 别人调用本项目中的程序入口  方式一：*/
/*let data = require('../erick_log/index')*/

/* 别人调用本项目中的程序入口  方式二：*/
/* 只传递文件夹，就回根据package中的main属性，去找当前目录的，对应的那个文件*/
/*let data = require('../erick_log')*/

let index = require('./index');

console.log(index.info)
console.log(index.dog.name);
```
### 5.3. npm包发布
#### 注册npm
-   需要注册对应的npm账户(daydreamer111)，然后发布项目

#### 终端
- 必须切换到npm官方的包地址，不能使用镜像
```bash
# 1. 根据第一步注册的账号，进行登陆
npm login

# 2.  切换到项目所在目录, 发布项目
npm publish 

# 3. 删除已经发布的包
# 3.1 只能删除 72h内发布的包
# 3.2 删除的包，在24h内不允许再次发布
npm unpublish 包名 --force
```

## 7. 热部署
- 热部署，不用每次进行部署
- webstorm中，编辑完文件后，可以通过 ctrl+来手动触发热部署

```bash
npm install -g nodemon

# 执行对应的js
nodemon index.js
```
## 8. npm指令
```bash
# 开始： 会在执行命令的目录下，创建一个package.json来管理
npm init -y

# 安装： 指定版本，多个同时安装
npm install lodash
npm i lodash
npm i lodash@4.17.17
npm install lodash moment

#一次性加载: node_moudle和项目package.json 不匹配时，运行会更新
#当删除node_moudle目录时候，运行就会在项目中下载对应的包
#一般node_moudle会占项目的90%的大小
npm install
npm i

# 全局操作
npm install lodash -g
npm uninstall lodash -g

# 卸载
npm uninstall lodash
npm uni lodash

# 只有开发时需要的依赖, 卸载时候的语法同上
# -D 和具体包名顺序可颠倒
npm install moment --save-dev
npm install moment -D


# 2. 检查当前项目软件哪些依赖已经过时
npm outdated
```

