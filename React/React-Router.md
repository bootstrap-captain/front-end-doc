# Router

## 1. SPA

- Single Page Application：单页面Web应用
- 整个页面只有一个完整的页面
- 点击页面中的链接，不会刷新页面，只会做页面的局部更新
- 数据都需要通过Ajax请求获取，并在前端异步展现
- 单页面，多组件，通过点击，路由跳转到指定组件

## 2. 路由

- 一个路由就是一个映射关系(key:value)
- key为路径，value可能是function或者component

```bash
# 原来路径  http://localhost:3000

# 点击链接，跳转到 http://localhost:3000/about
- 项目检测到url的变化，就会渲染对应的组件到当前页面
```

```bash
# 前端路由

# 浏览器路由
- value是component，用于展示页面内容

# 注册路由
- <Route path='/test' component={Test}>

# 工作过程
- 当浏览器的path变为/test时，当前路由组件就会变成Test组件
```

## 3. 基本介绍

- React-router: react的一个插件库
- 专门用来实现一个SPA应用
- 基于React的项目基本都会用到该插件

```bash
# react-router-dom
- 为web打造

# react-router-native
- 为react原生应用开发的

# react-router-any
- 全部都能用，通用型强，api能复杂点
```

# react-router-dom-5

- npm i react-router-dom@5  # "react-router-dom": "^5.3.4"

## 1. 基本路由

### 写法一

- 在app.js中包裹BrowserRouter

#### index.js

```jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <React.StrictMode>
        <App/>
    </React.StrictMode>
);
```

#### app.js

```jsx
import React from "react";
import {BrowserRouter, Link, Route} from "react-router-dom";
import {AboutComponent} from "./component/pages/About/AboutComponent";
import {HomeComponent} from "./component/pages/Home/HomeComponent";

export default class App extends React.Component {
    render() {
        return (
            <div>
                <div>公共组件</div>
                {/*整个应用，需要用一个BrowserRouter来管理*/}
                <BrowserRouter>
                    {/*1. 点击页面的About或者Home链接，触发事件*/}

                    {/*点击两个模块时，切换浏览器url：
                    http://localhost:3000/about
                    http://localhost:3000/home*/}
                   {/*NavLink和Link差不多，NavLink可以实现高亮*/}
                    <NavLink to='/about'>About</NavLink><br/>
                    <Link to='/home'>Home</Link>

                    {/*2. 注册路由
                    路由的具体跳转规则: 根据url，实现组件切换AboutComponent*/}
                    <Route path='/about' component={AboutComponent}></Route>
                    <Route path='/home' component={HomeComponent}></Route>

                </BrowserRouter>
            </div>
        )
    }
}
```

#### AboutComponent.jsx

```jsx
import {Component} from "react";

export class AboutComponent extends Component {
    render() {
        return (
            <div>
                我是About
            </div>
        )
    }
}
```

#### HomeComponent.jsx

```jsx
import {Component} from "react";

export class HomeComponent extends Component {
    render() {
        return (
            <div>
                我是Home
            </div>
        )
    }
}
```

### 写法二

- 用\<BrowserRouter>把整个APP包起来

#### index.js

```jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {BrowserRouter} from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <React.StrictMode>
        {/*用BrowserRouter把App组件包裹起来*/}
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </React.StrictMode>
);
```

#### app.js

```jsx
import React from "react";
import {Link, NavLink, Route} from "react-router-dom";
import {AboutComponent} from "./pages/About/AboutComponent";
import {HomeComponent} from "./pages/Home/HomeComponent";

export default class App extends React.Component {
    render() {
        return (
            <div>
                <div>公共组件</div>

                {/*1. 点击页面的About或者Home链接，触发事件*/}

                {/*点击两个模块时，切换浏览器url：
                    http://localhost:3000/about
                    http://localhost:3000/home*/}
                {/*NavLink和Link差不多*/}
                <NavLink to='/about'>About</NavLink><br/>
                <Link to='/home'>Home</Link>

                {/*2. 注册路由
                    路由的具体跳转规则: 根据url，实现组件切换AboutComponent*/}
                <Route path='/about' component={AboutComponent}></Route>
                <Route path='/home' component={HomeComponent}></Route>
            </div>
        )
    }
}
```

## 2. 组件分类

### 2.1 路由组件

```bash
# 路由组件
- 用来控制页面跳转的
- 一般放在 src/pages下面
- 通过下面方式引入
  <Route path="/about" component={AboutComponent}></Route>
- 路由组件中，会自动给props属性传递下面的值
```

```bash
history:
         go: f go(n)
         goBack: f goBack()
         goForward: f goForward()
         push: f push(path,state)
         replace: f replace(path,state)

location:
         pathname:"/about"
         search:""
         state:undefined

match:
        params:{}
        path:"/about"
        url:"/about"
```

### 2.2 路由组件

```bash
# 一般组件
- 一般放在src/component下面
- 通过 <NikeCompany/> 来进行引入的
```

## 3. switch

### 3.1 不中断

```jsx
import React from "react";
import {Link, NavLink, Route} from "react-router-dom";
import {AboutComponent} from "./pages/About/AboutComponent";
import {HomeComponent} from "./pages/Home/HomeComponent";
import {TestComponent} from "./pages/Test/TestComponent";

export default class App extends React.Component {
    render() {
        return (
            <div>
                <div>公共组件</div>

                <NavLink to='/about'>About</NavLink><br/>
                <Link to='/home'>Home</Link>

                {/*一个url中，会遍历所有的<Route>,路径符合的，都会渲染对应的组件
                  1. 如果<Route>多了，会有效率问题*/}
                <Route path='/about' component={AboutComponent}></Route>
                <Route path='/home' component={HomeComponent}></Route>
                <Route path='/home' component={TestComponent}></Route>
            </div>
        )
    }
}
```

### 3.2 中断

```jsx
import React from "react";
import {Link, NavLink, Route, Switch} from "react-router-dom";
import {AboutComponent} from "./pages/About/AboutComponent";
import {HomeComponent} from "./pages/Home/HomeComponent";
import {TestComponent} from "./pages/Test/TestComponent";

export default class App extends React.Component {
    render() {
        return (
            <div>
                <div>公共组件</div>

                <NavLink to='/about'>About</NavLink><br/>
                <Link to='/home'>Home</Link>

                {/*一个url中，会遍历所有的<Route>,路径符合,则渲染，并不再遍历下面的<Route>*/}
                <Switch>
                    <Route path='/about' component={AboutComponent}></Route>
                    <Route path='/home' component={HomeComponent}></Route>
                    <Route path='/home' component={TestComponent}></Route>
                </Switch>

            </div>
        )
    }
}
```

## 4. 匹配方式

### 4.1 模糊匹配

- Route默认是模糊匹配

```jsx
import React from "react";
import {Link, NavLink, Route, Switch} from "react-router-dom";
import {AboutComponent} from "./pages/About/AboutComponent";
import {HomeComponent} from "./pages/Home/HomeComponent";
import {TestComponent} from "./pages/Test/TestComponent";

export default class App extends React.Component {
    render() {
        return (
            <div>
                <div>公共组件</div>

                {/*默认是模糊匹配*/}
                {/* 1. 传递的url = /about/a/b */}
                <NavLink to='/about/a/b'>About</NavLink><br/>

                {/* 2. 传递的url = /a/home/b */}
                <Link to='/a/home/b'>Home</Link><br/>

                {/* 3. 传递的url = /test */}
                <Link to='/test'>Test</Link>


                <Switch>
                    {/*最左前缀匹配*/}
                    {/*1. 解析到 about a  b,  about是第一个，可以*/}
                    <Route path='/about' component={AboutComponent}></Route>

                    {/*2. 解析到 a home b ,  a是第一个，不可以*/}
                    <Route path='/home' component={HomeComponent}></Route>

                    {/* 3. 解析到test， 不能识别，/test/a/b 必须全部传递过来*/}
                    <Route path='/test/a/b' component={TestComponent}></Route>
                </Switch>

            </div>
        )
    }
}
```

### 4.2 严格匹配

- 不要随便开启，需要再看，有时候开启会导致无法继续匹配二级路由问题

```jsx
import React from "react";
import {Link, NavLink, Route, Switch} from "react-router-dom";
import {AboutComponent} from "./pages/About/AboutComponent";
import {HomeComponent} from "./pages/Home/HomeComponent";
import {TestComponent} from "./pages/Test/TestComponent";

export default class App extends React.Component {
    render() {
        return (
            <div>
                <div>公共组件</div>
                <NavLink to='/about/a/b'>About</NavLink><br/>

                <Link to='/a/home/b'>Home</Link><br/>

                <Link to='/test'>Test</Link>


                <Switch>
                    <Route exact path='/about/a/b' component={AboutComponent}></Route>

                    <Route exact path='/a/home/b' component={HomeComponent}></Route>

                    <Route exact={true} path='/test' component={TestComponent}></Route>
                </Switch>
            </div>
        )
    }
}
```

## 5. 重定向

```bash
# 如果是下面的url，一个路由的兜底方案
- http://localhost:3000   或者 http://localhost:3000/
```

```jsx
import React from "react";
import {Link, NavLink, Redirect, Route, Switch} from "react-router-dom";
import {AboutComponent} from "./pages/About/AboutComponent";
import {HomeComponent} from "./pages/Home/HomeComponent";
import {WelcomeComponent} from "./pages/Welcome/WelcomeComponent";

export default class App extends React.Component {
    render() {
        return (
            <div>
                <div>公共组件</div>
                <NavLink to='/about'>About</NavLink><br/>

                <Link to='/home'>Home</Link><br/>
                <Link to='/welcome'>Welcome</Link><br/>

                {/*上面的都匹配不上了，兜底方案, 自动变为http://localhost:3000/welcome
                1. http://localhost:3000/
                2. http://localhost:3000
                3. http://localhost:3000/random*/}
                <Redirect to='/welcome'/>
                <Switch>
                    <Route path='/about' component={AboutComponent}></Route>
                    <Route path='/home' component={HomeComponent}></Route>
                    <Route path='/welcome' component={WelcomeComponent}></Route>

                </Switch>
            </div>
        )
    }
}
```

## 6. 嵌套路由

