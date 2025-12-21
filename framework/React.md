# Quick Start

## 创建项目

### Vite-Cli

```bash
# create-vite的版本
npm create vite@latest
npm create vite@v8.2.0             # 需要手动输入对应的目录

npm create vite@v8.2.0 ./          # 可以在当前目录下创建(在git上创建好目录，然后拉到本地，直接在该目录下创建工程)
```

![image-20251220034119610](https://skillset.oss-cn-shanghai.aliyuncs.com/image-20251220034119610.png)

```json
{
  "name": "erick-ui",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "lint": "eslint .",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^19.2.0",
    "react-dom": "^19.2.0"
  },
  "devDependencies": {
    "@eslint/js": "^9.39.1",
    "@types/node": "^24.10.1",
    "@types/react": "^19.2.5",
    "@types/react-dom": "^19.2.3",
    "@vitejs/plugin-react-swc": "^4.2.2",
    "eslint": "^9.39.1",
    "eslint-plugin-react-hooks": "^7.0.1",
    "eslint-plugin-react-refresh": "^0.4.24",
    "globals": "^16.5.0",
    "typescript": "~5.9.3",
    "typescript-eslint": "^8.46.4",
    "vite": "^7.2.4"
  }
}
```

## 文件目录

### index.html

```html
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8"/>
    <!--要有，不然console会报错-->
    <link rel="icon" type="image/svg+xml" href="/vite.svg"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>erick-ui</title>
</head>
<body>
<!--主容器：只会放一个组件-->
<div id="root"></div>
<!--引入main.tsx-->
<script type="module" src="/src/main.tsx"></script>
</body>
</html>
```

### main.tsx

- 入口文件，将APP组件渲染到页面

```tsx
import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import App from './App.tsx'

/*获取页面节点,并转换为虚拟DOM*/
createRoot(document.getElementById('root')!).render(
    /*将组件渲染到目标结点的页面上: 使用React严格语法，比如react过时的api*/
    <StrictMode>
        <App/>
    </StrictMode>,
)
```

### App.tsx

- 导出组件
- 不会在这里直接写组件，而是利用App.tsx来统一导入其他的组件

```tsx
export default function App() {
    return (
        <>
            <h2>Hello World</h2>
        </>
    )
}
```

![image-20251220041043982](https://skillset.oss-cn-shanghai.aliyuncs.com/image-20251220041043982.png)

## 开发规范

```bash
# IDEA
rsc:    React Arrow function component
rscp:   React Arrow function component with protypes
rsf:    React function component
rsdf:   React function component with protypes
```

![image-20251220042211073](https://skillset.oss-cn-shanghai.aliyuncs.com/image-20251220042211073.png)

### Header.tsx

```tsx
import {sayHello} from "./Header.ts";
import './header.css'
function Header() {
    return (
        <>
            <div className='welcome'>你好</div>
            <button onClick={sayHello}>登陆</button>
        </>
    );
}

export default Header;
```

### header.ts

```ts
export function sayHello() {
    console.log("food");
}
```

### header.css

```css
.welcome {
    height: 200px;
    width: 500px;
    background-color: gold;
}
```

### App.tsx

- 挂载对应的组件

```tsx
import Header from "./components/layout/Header.tsx";

export default function App() {
    return (
        <>
            <Header/>
        </>
    )
}
```

## TSX语法

- TSX文件，编译为js

### 基本规则

```tsx
import './header.css'
import ErickIcon from "./ErickIcon.tsx";

function Header() {
    /*1. 虚拟DOM, 必须有一个根标签
    * 2. 样式使用className,避免和ES6中的class关键字冲突
    * 3. 内联样式：style={{key:value}}方式
    * 4. 使用js表达式时，使用{}来获取
    * 5. 标签首字母
             如果是小写开头，比如<div>，则将该标签转换为html中同名元素。若html中无该标签同名元素，则报错
             如果是大写开头，比如<ErickIcon/>，则就去渲染对应的组件，若组件没定义，则报错*/

    const address: string = 'beijing';

    return (
        <>
            <div className='header'>我是食物</div>
            <div style={{background: "blue"}}>我是第二个</div>
            {address}
            <ErickIcon/>
        </>
    );
}

export default Header;
```

### 数组

```tsx
function ErickIcon() {
    /*数组，React会自动遍历*/
    const cat: string[] = ['狸花', '美短', '大橘'];
    /*对象：报错： Objects are not valid as a React child */
    const people = {name: 'erick', age: 12};
    return (
        <>
            <div>{cat}</div>
            {/*<div>{people}</div>*/}
        </>

    );
}

export default ErickIcon;
```

### js表达式

- tsx中，标签中内容需要引入js表达式，则需要使用{}

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

```tsx
function Cat() {
    const cat: string[] = ['狸花', '美短', '大橘'];
    return (
        /*li中必须指定key，从而让DOM在比较时可以使用，可以用index*/
        <div>
            {cat.map((item, index) => (
                <li key={index}>
                    {item}
                </li>
            ))}
        </div>

    );
}

export default Cat;
```

### Fragment

- tsx中，组件返回值必须用一个闭合标签来包裹，因此多了很多不需要的div

#### 闭合标签

```tsx
function ErickIcon() {
    return (
        <div>
            <div>哈哈</div>
            <div>嘿嘿</div>
        </div>
    );
}

export default ErickIcon;
```

#### 空标签

- 空标签不能指定任何属性，会不再加对应的标签

```tsx
export default function ErickIcon() {
    return (
        <>
            <div>哈哈</div>
            <div>嘿嘿</div>
        </>
    );
}
```

#### Fragment

- 不想嵌套多余div，React提供的Fragment
- React在解析时，会自动把Fragment去掉
- 相比空标签，Fragment可以指定key，只能指定key，可以参与唯一标识的遍历

```tsx
import {Fragment} from "react/jsx-runtime";

export default function ErickIcon() {
    return (
        <Fragment key={0}>
            <div>哈哈</div>
            <div>嘿嘿</div>
        </Fragment>
    );
}
```

## 虚拟DOM

- 本质是Object类型的对象(一般对象)
- 虚拟DOM比真实DOM重，虚拟DOM是React内部使用，不需真实DOM那么多的属性
- 虚拟DOM最终会被React转换为真实DOM，呈现在页面上

```tsx
import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import App from './App.tsx'

const root = createRoot(document.getElementById('root')!);

root.render(
    <StrictMode>
        <App/>
    </StrictMode>,
);

console.log("Virtual DOM", root);
console.log("Virtual DOM Type", typeof root); // object

const realDom = document.getElementById('root');
console.log('Real Dom', realDom);
```

## 开发工具

- 在谷歌浏览器中加入，后面可以在Component中，查看每个组件的具体的属性，组件树之间的关系

![image-20250410215846410](https://skillset.oss-cn-shanghai.aliyuncs.com/image-20250410215846410.png)

![image-20250410215904086](https://skillset.oss-cn-shanghai.aliyuncs.com/image-20250410215904086.png)

# 
