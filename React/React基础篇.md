



# 基础

## 1. 安装

```bash
# 安装全局
npm install -g create-react-app

# 查看安装的版本：5.0.1
create-react-app -V

# 创建名字为 erick的项目： Installing react, react-dom, and react-scripts with cra-template...
create-react-app erick
```

```json
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
```

## 2. 基本使用

- 删除掉src下面的所有文件，添加名字为 index.js的文件

![image-20230626170851248](https://erick-typora-image.oss-cn-shanghai.aliyuncs.com/img/image-20230626170851248.png)

## 3. 组件

- 集合了html，css，js的一个组件

### 3.1 class组件

#### 基本类

```js
class TeslaM3 {
    constructor() {
        this.a = 1;
    }

    run() {
        console.log("run")
    }
}

let m3 = new TeslaM3();
m3.run();
```

```
import React from "react"
import ReactDOM from 'react-dom' // 将一个组件渲染到dom中
import TeslaCar from './car/TeslaCar'
```

#### Component组件

```js
import React from "react";

class HuaweiPhone extends React.Component {
    render() {
        return <div>Huawei Phone</div>
    }
}

export default HuaweiPhone;
```

```js
import React from "react"
import ReactDOM from 'react-dom' // 将一个组件渲染到dom中
import TeslaCar from './car/TeslaCar'
import HuaweiPhone from "./car/MobilePhone";

// 解析时候，会先判断该标签是不是用户自定义的
ReactDOM.render(<HuaweiPhone></HuaweiPhone>, document.getElementById("root"))
```

### 3.2 函数组件

```js
function Erick() {
    return <div>hello erick</div>
}

export default Erick
```

```js
import React from "react"
import ReactDOM from 'react-dom'
import HelloFunc from "./car/HelloFunction";

ReactDOM.render(<HelloFunc/>, document.getElementById("root"))
```

### 3.3 组件嵌套

```js
import React from "react";

function Navbar() {
    return <div>Hello Navbar</div>;
}

function Menu() {
    return <div>Hello Menu</div>;
}

function Address() {
    return <div>Hello Address</div>;
}

class App extends React.Component {
    render() {
        return (
            <div>
                <Navbar></Navbar>
                <Menu></Menu>
                <Address></Address>
            </div>
        )
    }
}

export default App
```

```js
import React from "react"
import ReactDOM from 'react-dom'
import App from "./car/Complex";

ReactDOM.render(<App/>, document.getElementById("root"))
```

### 3.4 组件样式

- 推荐行内样式，这样就是把css，html，js完整的包含在同一个组件中

#### 内部

```js
import React from "react";

class App extends React.Component {
    render() {
        let name = "erick";
        let nameStyle = {background: "red", fontSize: "100px"} // 驼峰样式
        return (
            <div>
                <div style={{background: "yellow"}}>
                    {10 + 20}
                </div>

                <div style={nameStyle}>
                    {name}
                </div>

                <div>
                    {10 > 20 ? "aaa" : "bbb"}
                </div>
            </div>
        )
    }
}

export default App
```

#### 外部css

```css
.erick {
    background: blue;
    font-size: 100px;
}
```

```js
import React from "react";
import '../css/Car.css'

class HuaweiPhone extends React.Component {
    render() {
       // 按照css样式来处理
        return <div className="erick">Huawei Phone</div>
    }
}

export default HuaweiPhone;
```

## 4. 事件

- React并不会真正的绑定事件到每一个具体的元素上，而是采用事件代理的模式

 ### 4.1 基本事件

```js
import React from "react";

class ErickEvent extends React.Component {

    render() {
        return (
            <div>
                <input/>
                <button onClick={this.sayHello}>确认</button>

                <br/>

                <button onMouseOver={() => {
                    console.log("重置")
                }}>重置
                </button>
            </div>
        )
    }

    sayHello() {
        console.log("hello")
    };
}

export default ErickEvent
```

### 4.2 ref

- 获取到输入框的值

```js
import React from "react";

class ErickEvent extends React.Component {

    erickRef = React.createRef();

    render() {
        return (
            <div>
                <input ref={this.erickRef}/>
                <button onClick={() => {
                    console.log("hello")
                    console.log(this.erickRef.current) // 拿到对应的DOM节点
                    console.log(this.erickRef.current.value)//拿到对应的DOM的value
                }}>确认
                </button>

                <br/>
            </div>
        )
    }
}

export default ErickEvent
```

## 5. 状态

### 5.1 基本使用

```js
import React from "react";

class ErickEvent extends React.Component {

    // 名字必须为state
    state = {
        collect: "收藏",
        unCollect: "取消收藏",
        flag: true
    }

    render() {
        return (
            <div>
                <h1>欢迎你</h1>
                <button onClick={() => {
                    this.setState({
                        flag: !this.state.flag
                    })
                }}>{this.state.flag ? this.state.collect : this.state.unCollect}
                </button>

                <br/>
            </div>
        )
    }
}

export default ErickEvent
```

### 5.2 列表展示

```js
import React, {Component} from 'react';

class SecondEvent extends Component {

    state = {
        /*理想的key值应该和属性的id保持一直*/
        list: [
            {
                id: "001", data: "111"
            },
            {
                id: "002", data: "222"
            },
            {
                id: "003", data: "333"
            }
        ]
    }

    render() {

        /*建议每个元素都有自己唯一的key,方便虚拟DOM来进行判断比较：diff算法*/
        let newList = this.state.list.map(item => <li key={item.id}>{item.data}</li>)

        return (<div>
            <ul>
                {newList}
            </ul>
        </div>);
    }
}

export default SecondEvent;
```

### 5.3 Todo-List
