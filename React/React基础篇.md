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

