# 安装

- 原生的前端框架，用于构建用户界面(数据渲染成HTML视图)的JavaScript库
- Facebook开发的

```bash
# 原生JS痛点
- 操作DOM繁琐，(DOM-API操作UI):     document.getElementById('app')
- 效率低, 每次操作，都需要进行DOM大量重绘重排
- 原生的JavaScript，只有js有模块化，没有组件化编码方案(js,css,html)，代码复用率低

# React特点
- 虚拟DOM+Dom Diffing算法，尽量减少与真实DOM的交互次数
- 组件化，声明式编码，提高开发效率及组件复用率
- React Native中可以使用React语法进行移动端开发
```

## 1. CDN引入

- 引入的核心库，CDN方式引入，链接直接到网站，然后CTRL+S保存文件到本地

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>

    <!--引入有顺序-->
    <!--1.React核心库-->
    <script src="https://unpkg.com/react@18/umd/react.development.js"></script>

    <!--2. React操作Dom的库-->
    <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>

    <!--3. babel
           3.1  ES6->ES5 语法
           3.2  React的jsx -> js-->
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
</head>
<body>

<!--准备好一个容器-->
<div id="erick">

</div>

<!--一定要写text/babel，表示使用react的jsx语法-->
<script type="text/babel">

    /*1. 获取容器节点*/
    const root = ReactDOM.createRoot(document.getElementById('erick'));

    /*2. 创建要渲染的jsx内容*/
    const virtualDom = (
        /*里面写对应的html标签*/
        <h1>Hello, React</h1>
    ) //不要加单引号，因为不是字符串, () 可以省略

    /*3. 渲染jsx对应的虚拟DOM到页面*/
    root.render(virtualDom);
</script>
</body>
</html>
```

- 浏览器去翻译babel，可能会比较耗时。后面在prod上，会先完成babel的作用，再发布到生产

![image-20240531111025866](https://erick-typora-image.oss-cn-shanghai.aliyuncs.com/img/image-20240531111025866.png)

## 2. 脚手架

- 在实际开发中，是基于React官方提供的脚手架，搭建好基本的环境

### 2.1 构建步骤

```bash
# 1. 全局安装 create-react-app的工具(CDK-CLI)
npm install -g create-react-app

# 2. 进入目录，创建好自己的项目
create-react-app erick-demo
```

### 2.2 项目结构

![image-20240602154808599](https://erick-typora-image.oss-cn-shanghai.aliyuncs.com/img/image-20240602154808599.png)

#### index.html

- SPA：single page application

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8"/>
    <!--%PUBLIC_URL%: 代表public文件夹的路径-->
    <link rel="icon" href="%PUBLIC_URL%/favicon.ico"/>
    <title>Erick React</title>
</head>
<body>
<!--主容器：只会放一个组件-->
<div id="root"></div>
</body>
</html>
```

#### index.js

- 入口文件，将APP组件渲染到页面

```js
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

/*获取页面节点,并转换为虚拟DOM*/
const root = ReactDOM.createRoot(document.getElementById('root'));

/*将组件渲染到目标结点的页面上*/
root.render(
    /*使用React严格语法，比如react过时的api*/
    <React.StrictMode>
        <App/>
    </React.StrictMode>
);
```

#### app.js

- 导出APP组件
- 一般不会在这里直接写组件，而是利用app.js来统一导入其他的组件

```js
import React from "react";

/*一个组件*/
export default class App extends React.Component {
    render() {
        return (
            /*组件的jsx写的带有html标签的内容*/
            <div>
                hello
            </div>)
    }
}
```

### 2.3 开发规范

```bash
# 具体的模块，建在src/component/xxx中
- jsx：React的模块组件代码
- js：js功能代码
- css：样式代码

# 导出的模块，可以在App.js中统一配置
```

![image-20240602164303445](https://erick-typora-image.oss-cn-shanghai.aliyuncs.com/img/image-20240602164303445.png)

#### Citi.jsx

- React的组件

```jsx
import {Component} from "react";
import './citi.css'

export class Citi extends Component {
    render() {
        return (
            <div className="citiTitle">
                我是Citi Bank
            </div>
        )
    }
}
```

#### citi.css

- 组件的具体样式

```css
.citiTitle {
    background-color: aqua;
}
```

#### app.js

- 导入其他的组件

```js
import React from "react";
import {Citi} from "./component/Citi/Citi";

/*/*入口的app.js,里面包含多个不同的组件*/
export default class App extends React.Component {
    render() {
        return (
            <div>
                {/*导入其他组件*/}
                <Citi/>
            </div>)
    }
}
```

# JSX

## 1. JSX/Js

- React的语法，支持两种方式来创建虚拟DOM
- JSX最终也会被翻译为JS
- 下面两个例子在React-16中写的

### 1.1 js

- 不用babel的依赖

```html
<!--type为"text/javascript"， 创建嵌套标签比较麻烦-->
<script type="text/javascript">
    const virtualDom = React.createElement('h1', {id: 'title'}, React.createElement('span', {}, 'Hello, React'))
    ReactDOM.render(virtualDom, document.getElementById('erick'));
</script>
```

### 1.2 jsx

- JavaScript XML: 原生js的语法糖，里面的html也可以进行格式化
- React定义的，一种类似于XML的js扩展语法： js + xml
- 本质是React.createElement语法的语法糖

```html
<script type="text/babel">
    const virtualDom = <h1 id="title"><span>Hello, React</span></h1>
    ReactDOM.render(virtualDom, document.getElementById('erick'));
</script>
```

## 2. 基本语法

- 都是写在组件中，属于虚拟DOM的一部分

```jsx
import {Component} from "react";
import './citi.css'
import {Nike} from "../Nike/Nike";

export default class Citi extends Component {
    render() {
        let name = 'erick';
        return (
            /*1. 定义虚拟DOM时，不要加引号*/
            /* 3. 绑定样式时，不要用class, 要使用className,避免和ES6中的class关键字引发冲突*/
            <div className="citiTitle">
                {/*2. 注释使用方法*/}

                {/* 4. 使用内联样式时，用style={{key:value}}方式*/}
                <div style={{background: "red"}}>hello</div>
                {/* 3. 使用js表达式时，使用{}来获取*/}
                我是{name}
                {/* 5. 虚拟DOM, 必须有一个根标签，且根标签内的标签必须闭合，因此用<div>包裹起来*/}

                {/*6.标签首字母
                       如果是小写开头，比如<div>，则将该标签转换为html中同名元素。若html中无该标签同名元素，则报错
                       如果是大写开头，比如<Nike/>，则就去渲染对应的组件，若组件没定义，则报错*/}
                <Nike/>
            </div>
        )
    }
}
```

### 2.1 数组/对象

- 传入的是数组，React会自动遍历
- 传入的是对象，会解析失败Objects are not valid as a React child

```jsx
import {Component} from "react";
import './citi.css'


export default class Citi extends Component {
    render() {

        /*传入的是数组，React会自动遍历*/
        let data = ['apple', 'peach', 'lemon']
        /* 传入的是对象，会解析失败Objects are not valid as a React child */
        //let people = {name: 'erick', age: 12, address: "xian"};

        return (
            <div>
                {/*js表达式*/}
                {data}
            </div>
        )
    }
}
```

### 2.2 jsx规则

- jsx中，标签中内容需要引入js表达式，则需要用{}来使用

```bash
# js表达式： 可以用一个变量来接收的js代码
- 可以产生一个值，则可以放在{}中
         1. a
         2. a+b
         3. demo()                - 调用函数
         4. arr.map()
         5. function test(){}     - 定义一个函数
         
# js代码： 不产生值的
         1. if
         2. for
         3. switch
```

```jsx
import {Component} from "react";

export default class Citi extends Component {
    render() {
        let data = ['apple', 'peach', 'lemon']
        return (
            /*li中必须指定key，从而让DOM在比较时可以使用，可以用index*/
            <div>
                {data.map((item, index) => (
                    <li key={index}>
                        {item}
                    </li>
                ))}
            </div>
        )
    }
}
```





## 3. 虚拟DOM

- 虚拟DOM，本质是Object类型的对象(一般对象)
- 虚拟DOM比较轻，真实DOM比较重。虚拟DOM是React内部使用，不需真实DOM那么多的属性
- 虚拟DOM最终会被React转换为真实DOM，呈现在页面上

```js
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

/*获取页面节点，并转换为虚拟DOM*/
const root = ReactDOM.createRoot(document.getElementById('root'));
console.log(`虚拟DOM`, root);
console.log(typeof root);

let realDom = document.getElementById('root');
console.log('真实DOM', realDom);

/*将组件渲染到目标结点的页面上*/
root.render(
    /*使用React严格语法，比如react过时的api*/
    <React.StrictMode>
        <App/>
    </React.StrictMode>
);
```

## 4. DOM Differing 算法

# 组件

- 模块化：js的模块化，对js的拆分
- 组件：对js，html，css，image，video，font等的进行拆分
- 一个大的应用，所有的js，html等代码，都会划分为多个组件，多个组件拼接起来，就是一个完整的页面

## 1. React开发工具

- 在谷歌浏览器中加入，后面可以在Component中，查看每个组件的具体的属性，组件树之间的关系

![image-20240531135737923](https://erick-typora-image.oss-cn-shanghai.aliyuncs.com/img/image-20240531135737923.png)

![image-20240531140028704](https://erick-typora-image.oss-cn-shanghai.aliyuncs.com/img/image-20240531140028704.png)

## 2. 组件类型

### 2.1 函数式组件

- React18后，新特性可以使用组件的一些特性，官方比较推荐，代码复用率高

```jsx
/*  渲染组件到页面
   * 1. React解析组件标签，找到了NikeComponent组件
   * 2. 发现是组件是使用函数定义的，调用该函数
   * 3. 将返回的该组件的虚拟DOM转换为真实DOM,随后呈现在页面*/
export function NikeComponent() {
    /*1. 必须要有返回值，返回值就是该组件的虚拟DOM
    * 2. 首字母不要用小写，否则会当作html标签渲染
    *    首字母大写，就会当作组件来渲染*/
    return (
        <div>
            Hi,我是函数式组件
        </div>
    )
}
```

- 箭头函数类型，和函数式组件是一样的，不再细说

```jsx
export const AdidasComponent = () => {
    return (
        <div>
            我是箭头函数组件
        </div>
    )
}
```

### 2.2 类式组件

- React16中，因为一些局限，用的比较多
- rcc：快捷键生成一个类式组件

```js
import {Component} from "react";

/* 渲染组件到页面
   * 1. React解析组件标签，找到了Citi组件
   * 2. 发现组件是使用类定义的，随后new出该类的实例，并通过该实例调用到原型上的render方法
   * 3. 将render返回的虚拟DOM转换为真实DOM,随后呈现在页面上*/
export default class Citi extends Component {
    /*1. render：Citi组件的的原型对象上，供实例使用*/
    render() {
        /*this: Citi的实例对象*/
        console.log("Citi实例对象", this);
        return (
            <div>
                我是类式组件
            </div>
        )
    }
}
```

## 3. 类式组件this问题

### 3.1 普通函数-this指向

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>

<script>
    function demo01() {
        console.log(this); // windows
    }

    function demo02() {
        'use strict';
        console.log(this) // undefined, 禁止this向上寻找
    }

    demo01();
    demo02();
</script>

</body>
</html>
```

### 3.2 类中普通函数-this指向

- this指向丢失问题：直接调用方法，会导致类中方法的this丢失

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>

<script>
    class People {
        constructor(name, age) {
            this.name = name;
            this.age = age;
        }

        /* speak方法放在： 类的原型对象上，供实例调用*/
        speak() {
            console.log(this);
            console.log('speak---');
        }
    }

    /*1. 调用方式一： 通过People的实例调用speak时，this就是People实例*/
    let people = new People('shuzhan', 20);
    people.speak();

    /* 2， 调用方式二：直接调用方法： 里面的this就是undefined
    *     2.1 类中所有的方法，都在局部开启了严格模式，this不会向上找，不会指向windows */

    let x = people.speak;       // 顺着people的原型链查找，找到speak方法，并用x接收了该方法
    x(); // 调用,  方法的直接调用
</script>

</body>
</html>
```

### 3.3 类式组件中this丢失

```jsx
import {Component} from "react";

export default class Citi extends Component {

    changeWhether() {
        /*this: undefined*/
        console.log(this);
    }

    render() {
        return (
            <div>
                {/*React中，对js原生的BOM事件，都进行了驼峰封装: onclick-->onClick*/}
                {/* 1. 沿着类的原型链查找，找到了changeWhether方法，
                    2. 并将其作为回调函数供onClick调用
                    3. 不算是实例调用，因此changeWhether() 就不是通过实例调用的
                    4. 类中方法默认开启了严格模式，因此this就是undefined*/}
                <button onClick={this.changeWhether}>改变天气</button>
            </div>
        )
    }
}
```

### 3.4 类式组件this找回一

- 通过bind找回

```jsx
import {Component} from "react";

export default class Citi extends Component {

    constructor(props) {
        super(props);
        /*右边：
        * 1. 根据原形链，找到changeWhether方法
        * 2. bind：2.1生成一个新的函数
        *          2.2修改该函数中的this指针：传递什么，this就是什么
        * 左边：
        *  1. 一个新函数：名字为change，是changeWhether的引用
        *  2. 且修改了原来changeWhether中的this指向*/
        this.change = this.changeWhether.bind(this);
    }

    changeWhether() {
        /*this: 实例*/
        console.log(this);
    }

    render() {
        return (
            <div>

                {/*1. 实例自身上的change()方法，实际调用的是
                   2. 如果change和changeWhether同名了，那就先找到了当前对象的changeWhether，就不会继续向上找了*/}
                <button onClick={this.change}>改变天气</button>
            </div>
        )
    }
}
```

### 3.5 类式组件this找回二

- 通过箭头函数加+赋值语句找回

```jsx
import {Component} from "react";

export default class Citi extends Component {

    /*1. 类中定义了一个方法，在实例对象上增加了一个changeWhether属性，而不是在类的原型对象上
    * 2. changeWhether属性是一个箭头函数
    * 3. 箭头函数中没有this，向上找*/

    changeWhether = () => {
        /*Citi的实例对象*/
        console.log(this);
    }

    render() {
        return (
            <div>
                <button onClick={this.changeWhether}>改变天气</button>
            </div>)
    }
}
```



## 4. state

- 当前组件的一些状态，属性，等

### 4.1 函数组件

- React-18中，在函数式组件中，可以使用state属性

#### 单个属性

```jsx
import React from "react";
import {nanoid} from "nanoid";

/* NikeComponent这个函数执行 n+1 此
*     1. 初次渲染执行一次
*     2. 后续每次changeWhether执行一次*/
export function NikeComponent() {

    /* 2. 第一次调用，就会把count结果缓存下来
    *     后续调用，就不会再去执行了*/

    /*参数：初始值
    * 返回：一个数组，第一个是属性，第二个是修改属性的方法
    * 数组的解构赋值*/
    const [count, setCount] = React.useState(0);
    const [time, setTime] = React.useState(nanoid());

    /*写法一： setCount传入一个函数*/
    function updateCount() {
        setCount((previous) => {
            return previous + 1;
        })
    }

    /*写法二： setTime传入一个更新后的新值*/
    function updateTime() {
        let newValue = nanoid();
        setTime(newValue);
    }

    return (
        <div>
            <h2>当前计数{count}</h2>
            <button onClick={updateCount}>改变计数器</button>
            <h2>当前时间{time}</h2>
            <button onClick={updateTime}>更改时间</button>
        </div>
    )
}
```

#### 对象属性

```jsx
import React from "react";
import {nanoid} from "nanoid";

export function NikeComponent() {

    /*初始值空对象*/
    const [data, setData] = React.useState({});

    function queryData() {
        /*从服务器请求数据*/
        let data = {
            name: nanoid(10),
            address: nanoid(5)
        }

        /*更新数据*/
        setData(data);
    }

    return (
        <div>
            <h2>姓名：{data.name}, 地址：{data.address}</h2>
            <button onClick={queryData}>重新查找</button>
        </div>
    )
}
```

### 4.2 类组件

- 组件实例对象上的，因为类组件继承了React.Component，React.Component中预先定义了一些属性
- React.Component中的state默认给null
- state是readOnly，组件初始化state属性后，后续修改只能调用setState()方法

#### 普通函数

- 必须要使用bind，否则存在this丢失问题

```jsx
import {Component} from "react";

export default class Citi extends Component {
    constructor(props) {
        super(props);
        this.change = this.changeWhether.bind(this);
    }

    /*1. 初始化状态，初始完毕后，state不能再重新赋值*/
    state = {
        isHot: true,
        address: '西安'
    }

    changeWhether() {
        /*1. 获取原来的状态*/
        let isHot = this.state.isHot;
        /*2. 状态只能通过setState修改：merge更新*/
        this.setState({isHot: !isHot})
    }

    render() {
        /*解构数据*/
        const {isHot, address} = this.state;
        return (
            <div>
                <h2>今天{address}天气很{isHot ? '炎热' : '凉爽'}</h2>
                <button onClick={this.change}>改变天气</button>
            </div>
        )
    }
}
```

#### 箭头函数

- 不用关注this问题了
- 推荐的一种方式

```jsx
import {Component} from "react";

export default class Citi extends Component {
    state = {
        isHot: true,
        address: '西安'
    }

    /*功能函数：箭头函数+赋值语句*/
    changeWhether = () => {
        let isHot = this.state.isHot;
        this.setState({isHot: !isHot})
    }

    render() {
        /*解构数据*/
        const {isHot, address} = this.state;
        return (
            <div>
                <h2>今天{address}天气很{isHot ? '炎热' : '凉爽'}</h2>
                <button onClick={this.changeWhether}>改变天气</button>
            </div>
        )
    }
}
```

## 5. props

- 组件之间的状态传递，父子组件传递

### 4.1 函数组件

#### 父组件

```jsx
import React from "react";
import {NikeComponent} from "./component/Nike/NikeComponent";

export default class App extends React.Component {

    /* 父子组件：别和原型链扯关系
     父组件的函数，也可以传递到子组件中*/
    state = {
        count: 1
    }

    update = () => {
        this.setState({
            count: this.state.count + 1
        })
    }

    render() {
        const person = {name: "shuzhan", age: 20, address: "beijing"};
        return (
            <div>
                <h2>count={this.state.count}</h2>
                <NikeComponent name="lucy" age={12} updateInfo={this.update}/>
                <NikeComponent name={person.name} age={person.age} address={person.address} updateInfo={this.update}/>
                <NikeComponent {...person} updateInfo={this.update}/>
            </div>)
    }
}
```

#### 子组件

```jsx
import React from "react";
import PropTypes from "prop-types";

export function NikeComponent(props) {

    const {name, address, age, updateInfo} = props;

    return (
        <div>
            <ul>
                <li>{name}</li>
                <li>{address}</li>
                <li>{age + 1}</li>
            </ul>
            <button onClick={updateInfo}>点击</button>
        </div>
    )
}

/*定义数据规范*/
NikeComponent.prototype = {
    /*数据类型，是否必传*/
    name: PropTypes.string.isRequired,
    address: PropTypes.string,
    age: PropTypes.number,
    updateInfo: PropTypes.func  /*规定必须是一个函数*/
}

/*默认值*/
NikeComponent.defaultProps = {
    address: '北京'
}
```

### 5.2 类组件

- 组件实例对象上的，因为类组件继承了React.Component
- props是Readonly

```bash
# props作用：
- 在初始化一个组件的时候，可以给该实例对象传递一些属性，这些属性会封装到props属性中，用于父子组件中信息传递
- 还可以传递将父组件的函数，传递到子组件

# props限制
- 对应的props，是子组件身上的，子组件来使用的，子组件可以声明需要的props的具体的类型
- 父组件给子组件传递数据时，就知道子组件需要的类型
- 相当于给A方法定义形参类型，这样其他方法调用A方法时，知道需要传递的数据类型
```

#### 父组件

```jsx
import React from "react";
import Citi from "./component/Citi/Citi";


/*/*入口的app.js,里面包含多个不同的组件*/
export default class App extends React.Component {

    /* 父子组件：别和原型链扯关系
     父组件的函数，也可以传递到子组件中*/

    state = {
        count: 1
    }

    update = () => {
        this.setState({
            count: this.state.count + 1
        })
    }

    render() {
        const person = {name: "shuzhan", age: 20, address: "beijing"};
        return (
            <div>
                <h2>count={this.state.count}</h2>

                {/*1. 传递方式一: 直接写*/}
                <Citi name="erick" address="xian" age={13} updateInfo={this.update}/>

                {/*2 传递方式二：解析对象*/}
                <Citi name={person.name} address={person.address} age={person.age} updateInfo={this.update}/>

                {/*3. 传递方式三：属于方式二的语法糖，在jsx中批量传递对象的，这种解构赋值，只能用来传递props*/}
                <Citi {...person} updateInfo={this.update}/>
            </div>)
    }
}
```

#### 子组件

```jsx
import {Component} from "react";
import PropTypes from "prop-types";

export default class Citi extends Component {

    /*定义数据规范*/
    static propTypes = {
        /*数据类型，是否必传*/
        name: PropTypes.string.isRequired,
        address: PropTypes.string,
        age: PropTypes.number,
        updateInfo: PropTypes.func  /*规定必须是一个函数*/
    }

    /*默认值*/
    static defaultProps = {
        address: 'NAN'
    }

    render() {
        /*组件使用*/
        const {name, address, age, updateInfo} = this.props;
        return (
            <div>
                <ul>
                    <li>{name}</li>
                    <li>{address}</li>
                    <li>{age + 1}</li>
                    <button onClick={updateInfo}>点击</button>
                </ul>
            </div>)
    }
}
```

## 6.ref

- 用来获取jsx中带值标签的值
- 也是React.Component的属性

### 6.1 函数式组件



### 6.2 类式组件

#### 字符串ref

- React已经慢慢不支持了，效率低，不推荐使用

```jsx
import {Component} from "react";

export default class Citi extends Component {

    getName = () => {
        // 1. 从refs中拿到对应的真实DOM
        const {nameInput} = this.refs;
        // 2. 解析DOM的value
        alert(nameInput.value);
    }

    getAddress = () => {
        const {addressInput} = this.refs;
        alert(addressInput.value);
    }

    render() {
        return (
            <div>
                {/*1. 获取当前的input整个获取到真实DOM的结点
                   2. 将该结点放在组件的refs属性上 */}
                <input ref="nameInput" type="text" placeholder="请输入姓名"/>
                <button onClick={this.getName}>查看姓名</button>

                <input ref="addressInput" type="text" placeholder="请输入地址" onBlur={this.getAddress}/>
            </div>)
    }
}
```

#### 回调函数ref

- 将当前结点，放在当前实例组件的属性上

##### 内联形式

```jsx
import {Component} from "react";

export default class Citi extends Component {

    getName = () => {
        /*获取真实DOM,然后获取到该值*/
        alert(this.nameInput.value);
    }

    getAddress = () => {
        alert(this.addressInput.value);
    }

    render() {
        return (<div>

            {/*将当前节点的真实DOM，传递给Citi组件的一个新的属性nameInput*/}
            <input ref={(currentNode) => {
                this.nameInput = currentNode;
            }} type="text" placeholder="请输入姓名"/>
            <button onClick={this.getName}>查看姓名</button>


            <input ref={(currentNode) => {
                this.addressInput = currentNode;
            }} type="text" placeholder="请输入地址" onBlur={this.getAddress}/>
        </div>)
    }
}
```

##### 类绑定形式

```jsx
import {Component} from "react";

export default class Citi extends Component {

    getName = () => {
        /*获取真实DOM,然后获取到该值*/
        alert(this.nameInput.value);
    }

    getAddress = () => {
        alert(this.addressInput.value);
    }

    saveName = (currentNode) => {
        this.nameInput = currentNode;
    }

    saveAddress = (currentNode) => {
        this.addressInput = currentNode;
    }

    render() {
        return (<div>
            <input ref={this.saveName} type="text" placeholder="请输入姓名"/>
            <button onClick={this.getName}>查看姓名</button>
            
            <input ref={this.saveAddress} type="text" placeholder="请输入地址" onBlur={this.getAddress}/>
        </div>)
    }
}
```

#### createRef

- React最推荐的一种

```jsx
import {Component, createRef} from "react";

export default class Citi extends Component {

    /*ref容器： 只能保存一个，后加入的会对之前的进行覆盖*/
    nameRef = createRef();

    addressRef = createRef();

    getName = () => {
        alert(this.nameRef.current.value);
    }

    getAddress = () => {
        alert(this.addressRef.current.value);
    }
    
    render() {
        return (<div>
            {/*将当前结点存在ref容器中*/}
            <input ref={this.nameRef} type="text" placeholder="请输入姓名"/>
            <button onClick={this.getName}>查看姓名</button>

            <input ref={this.addressRef} type="text" placeholder="请输入地址" onBlur={this.getAddress}/>
        </div>)
    }
}
```

### 6.3 事件

- 不要过度的使用ref，发生事件的事件源和输入框如果是一个，使用event

```jsx
import {Component} from "react";

export default class Citi extends Component {

    getAddress = (event) => {
        /*event.target: 真实结点*/
        alert(event.target.value);
    }

    render() {
        return (<div>
            <input type="text" placeholder="请输入地址" onBlur={this.getAddress}/>
        </div>)
    }
}
```

## 7. 高阶函数

### 7.1 高阶函数

```bash
# 高阶函数：    如果一个函数满足下面两条任意一个
- 如果A函数，接收的参数是一个函数，       那么A就是高阶函数
- 如果A函数，调用的返回值依然是一个函数，  那么A就是高阶函数
       #    Promise  setTimeout, arr.map

# 函数柯里化
- 通过函数调用继续返回函数的方式，实现多次接受参数，最后统一处理的函数编码方式
```

#### 非柯里化

```jsx
function sum(a, b, c) {
    return a + b + c;
}

let sum1 = sum(1, 3, 5);
console.log(sum1);
```

#### 柯里化

```jsx
/*因为调用参数时，不一定一下子都能拿到所有参数*/
function sum(a) {
    console.log(`a=${a}`);

    return (b) => {
        console.log(`b=${b}`)

        return (c) => {
            console.log(`c=${c}`)
            return a + b + c;
        }
    }
}

/*a=1
 b=3
 c=5
*/
sum(1)(3)(5);
```

### 7.2 函数回调-普通

- 回调箭头函数时候，不能带()

```jsx
import {Component} from "react";

export default class Citi extends Component {

    saveUsername = (event) => {
        console.log('hello');
        // 返回值是undefined
    }

    saveEmail = (event) => {
        console.log('email');
    }

    render() {
        return (
            <div>
                {/*1. saveUsername不能加()，否则就是，还没点呢，在render的时候，就已经调用了
                   2. 后续onChange不会再触发回调: 因为是将saveUsername的返回值作为回调
                                  2.1 saveUsername的返回值是undefined*/}
                用户名：<input onChange={this.saveUsername('username')} type="text" placeholder="用户名"/>

                {/*是把一个函数的指向作为回调*/}
                邮箱：<input onChange={this.saveEmail} type="text" placeholder="邮箱"/>
            </div>)
    }
}
```

### 7.3 函数回调-柯里化

- 如果要在回调方法中，使用参数()，可以考虑高阶函数-函数柯里化

```jsx
import {Component} from "react";

export default class Citi extends Component {

    state = {
        username: ''
    }

    /*被调用函数，返回了一个内层函数
        1. dataType： 可以传递参数名
        2. 取值时，用[]来存入到state中
    * */
    saveUsername = (dataType) => {
        console.log('hello');

        /*回调的时候，会把event传递进去*/
        return (event) => {
            this.setState({
                [dataType]: event.target.value
            })
        }
    }

    render() {
        return (
            <div>
                {/*1. 返回值是内层函数,该内层函数作为方法的回调
                       1.1 一上来就调用一次
                       1.2 后续每次点击，就会调用其内层函数
                       1.3 dataType可以自己传递，但是event是React帮忙传递的*/}
                用户名：<input onChange={this.saveUsername('username')} type="text" placeholder="用户名"/>
            </div>)
    }
}
```

### 7.4 函数回调-非柯里化

```jsx
import {Component} from "react";

export default class Citi extends Component {

    state = {
        username: ''
    }

    saveUsername = (dataType, event) => {
        this.setState({
            [dataType]: event.target.value
        })
    }

    render() {
        return (
            <div>

                {/*onChange需要一个函数作为回调，第一次不会加载
                    传入的是一个箭头函数
                 1. 点击后，React把event自动传递给这个函数
                 2. 函数内部再去调用this.saveUsername，并且把event和dataType传递进去*/}

                用户名：<input onChange={(event) => {
                this.saveUsername('username', event);
            }} type="text" placeholder="用户名"/>
            </div>)
    }
}
```



## 8. 受控/非受控

- 收集表单中的数据

### 8.1 非受控组件

- 页面内所有输入类的DOM，现用现取

```jsx
import {Component} from "react";

export default class Citi extends Component {

    savePeople = (event) => {
        event.preventDefault(); // 阻止表单跳转
        let username = this.username.value;
        let address = this.address.value;
        let email = this.email.value;
        alert(username + "=" + address + "=" + email);
    }

    render() {
        return (
            <div>
                <form action="" onSubmit={this.savePeople}>
                    用户名：<input ref={(currentNode) => {
                    this.username = currentNode
                }} type="text" placeholder="用户名"/>

                    地址：<input ref={(currentNode) => {
                    this.address = currentNode
                }} type="text" placeholder="地址"/>

                    邮箱：<input ref={(currentNode) => {
                    this.email = currentNode
                }} type="text" placeholder="邮箱"/>

                    <button>提交</button>
                </form>

            </div>)
    }
}
```

### 8.2 受控组件

- 每次改变输入框的值，就将其值放入state中

#### 基本写法

```jsx
import {Component} from "react";

export default class Citi extends Component {

    state = {
        username: '',
        address: '',
        email: '',
    }

    savePeople = () => {
        const {username, email, address} = this.state;
        alert(username + "=" + address + "=" + email);
    }

    saveUsername = (event) => {
        this.setState({username: event.target.value})
    }

    saveEmail = (event) => {
        this.setState({email: event.target.value})
    }

    saveAddress = (event) => {
        this.setState({address: event.target.value})
    }

    render() {
        return (
            <div>
                <form action="" onSubmit={this.savePeople}>
                    
                    用户名：<input onChange={this.saveUsername} type="text" placeholder="用户名"/>

                    地址：<input onChange={this.saveAddress} type="text" placeholder="地址"/>

                    邮箱：<input onChange={this.saveEmail} type="text" placeholder="邮箱"/>
                    <button>提交</button>
                </form>
            </div>)
    }
}
```

#### 柯里化

```jsx
import {Component} from "react";

export default class Citi extends Component {

    state = {
        username: '',
        address: '',
        email: '',
    }

    savePeople = () => {
        const {username, address, email} = this.state;
        alert(username + address + email);
    }

    /*柯里化*/
    saveData = (key) => {
        /*作为回调，React自动传递event*/
        return (event) => {
            this.setState({
                [key]: event.target.value
            })
        }
    }

    render() {
        return (
            <div>
                <form action="" onSubmit={this.savePeople}>

                    用户名：<input onChange={this.saveData("username")} type="text" placeholder="用户名"/>

                    地址：<input onChange={this.saveData("address")} type="text" placeholder="地址"/>

                    邮箱：<input onChange={this.saveData("email")} type="text" placeholder="邮箱"/>
                    <button>提交</button>
                </form>
            </div>)
    }
}
```

#### 非柯里化

```jsx
import {Component} from "react";

export default class Citi extends Component {

    state = {
        username: '',
        address: '',
        email: '',
    }

    savePeople = () => {
        const {username, address, email} = this.state;
        alert(username + address + email);
    }

    /*柯里化*/
    saveData = (event, key) => {
        this.setState({
            [key]: event.target.value
        })

    }

    render() {
        return (
            <div>
                <form action="" onSubmit={this.savePeople}>

                    用户名：<input onChange={(event) => {
                    this.saveData(event, 'username')
                }} type="text" placeholder="用户名"/>

                    地址：<input onChange={(event) => {
                    this.saveData(event, 'address')
                }} type="text" placeholder="地址"/>

                    邮箱：<input onChange={(event) => {
                    this.saveData(event, 'email')
                }} type="text" placeholder="邮箱"/>
                    <button>提交</button>
                </form>
            </div>)
    }
}
```

# 生命周期

- React组件，从创建到死亡会经历一些特定的阶段
- 包含一系列钩子函数(生命周期回调函数)，会在特定的时刻调用

## React-16

- React中，组件第一次渲染，和后续更新状态后的渲染，都会触发React组件默认的一些回调函数
- 所有的回调函数在React.Component中会有默认实现
- 自定义组件在继承React.Component后，可以对其回调函数进行重写

```bash
# 第一次挂载

 # 1.constructor
 - 执行构造器里面的方法
 # 2. componentWillMount
 - 挂载前的准备工作
 # 3. render
 - 将内容挂载到页面上
 # 4. componentDidMount
 - 内容挂载完毕后
```

```bash
# setState更新
  # 1. shouldComponentUpdate
    - 默认返回true，可以自定义实现
    - 调用setState更新state后，是否需要重新render
  # 2. componentWillUpdate
  - 重新render
  # 3. render
  # 4. componentDidUpdate
  - update完成后执行
```

```bash
# forceUpdate
  # 1. 可以在state不改变的情况下，强制刷新
  # 2. render
  # 3. componentDidUpdate

```

```bash
  # 卸载
  # 1. componentWillUnmount
  - 卸载组件前，执行的动作
  # 2. 卸载组件
```

![image-20240602102203012](https://erick-typora-image.oss-cn-shanghai.aliyuncs.com/img/image-20240602102203012.png)

# 网络代理

![image-20240603095750770](https://erick-typora-image.oss-cn-shanghai.aliyuncs.com/img/image-20240603095750770.png)

## 1. 配置方式一

- 在package.json中添加，React启动后，就会在3000端口启动一个Proxy，后序请求就会将数据发送到Server端的8080端口
- 3000端口只要没有的资源，都会去通过proxy找8080要
- 只能配置一个后台的端口

```bash
"proxy": "http://localhost:8080"
```

![image-20240603102230316](https://erick-typora-image.oss-cn-shanghai.aliyuncs.com/img/image-20240603102230316.png)

```jsx
import React from "react";
import axios from "axios";

export default class App extends React.Component {

    getInfo = () => {
        axios({
            method: 'GET',
            url: 'http://localhost:3000/erick/sleep'
        }).then(value => {
            console.log(value.data);
        }).catch(reason => {
            console.log(reason)
        })
    }

    render() {
        return (
            <div>
                <button onClick={this.getInfo}>点击获取数据</button>
            </div>)
    }
}
```

## 2. 配置方式二

- 在React的src目录下，建一个名字必须为setupProxy.js的文件
- 请求不同服务，不同服务的不同转发
- React在执行时，会自动使用配置的setupProxy.js配置的规则

### setupProxy.js

```js
const {createProxyMiddleware} = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        '/firstserver',/*请求如果带这个前缀*/
        createProxyMiddleware({
            target: 'http://localhost:8080', // 目标服务器地址
            changeOrigin: true,              // 是否改变源地址
            pathRewrite: {
                '^/firstserver': '',                   // 重写路径
            },
        })
    );

    app.use(
        '/secondserver',
        createProxyMiddleware({
            target: 'http://localhost:9090', // 目标服务器地址
            changeOrigin: true,              // 是否改变源地址
            pathRewrite: {
                '^/secondserver': '',                   // 重写路径
            },
        })
    );
};
```

```jsx
import React from "react";
import axios from "axios";

export default class App extends React.Component {

    getFromFirstServer = () => {
        axios({
            method: 'GET',
            url: 'http://localhost:3000/firstserver/erick/sleep'
        }).then(value => {
            console.log(value.data);
        }).catch(reason => {
            console.log(reason)
        })
    }

    getFromSecondServer = () => {
        axios({
            method: 'GET',
            /*带前缀*/
            url: 'http://localhost:3000/secondserver/erick/sleep'
        }).then(value => {
            console.log(value.data);
        }).catch(reason => {
            console.log(reason)
        })
    }

    render() {
        return (
            <div>
                <button onClick={this.getFromFirstServer}>第一个服务</button>
                <button onClick={this.getFromSecondServer}>第二个服务</button>
            </div>)
    }
}
```

