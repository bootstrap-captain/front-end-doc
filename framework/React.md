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

# 函数组件

## 分类

### 普通函数

```tsx
/*  渲染组件到页面
   * 1. React解析函数组件标签，找到了Father组件，调用该函数
   * 2. 将返回的该组件的虚拟DOM转换为真实DOM,随后呈现在页面
   * 
   * a：必须要有返回值，值就是该组件的虚拟dom
   * b：首字母必须大写，否则就会当作html标签来渲染*/
export default function Father() {
    return (
        <div>Father</div>
    );
}
```

### 箭头函数

```tsx
export const Father = () => {
    return (
        <div>Father</div>
    );
};
```

## useState

- 当前组件的部分状态，属性
- 当属性改变时，就会触发该函数的重新调用，导致组件re-render
- 浅比较： 基本数据类型(比较值)， 引用数据类型(比较引用值)

### 基本类型

```tsx
import {useState} from "react";

export const Father = () => {
    console.log("Father Render");
    
    /*解构赋值：参数一：state的名字，参数二：对应的set方法*/
    const [address, setAddress] = useState<string>('default-value');

    /*state-update-1：依赖原来数据*/
    const changeAddressFirst = () => {
        setAddress((prevName: string) => {
            return prevName + '~'
        });
    }

    /*state-update-2：传入新值*/
    const changeAddressSecond = () => {
        setAddress("beijing");
    }

    return (
        <>
            <h2>{address}</h2>
            <button onClick={changeAddressFirst}>first</button>
            <button onClick={changeAddressSecond}>second</button>
        </>

    );
};
```

### 引用类型

```tsx
import {type BaseSyntheticEvent, useState} from "react";

export const Father = () => {
    console.log("Father Render");
    /*空对象*/
    const [student, setStudent] = useState({} as Student);

    const studentChange = (type: string) => {
        return (event: BaseSyntheticEvent) => {
            setStudent({
                /*原对象解构赋值*/
                ...student,
                /*新属性覆盖*/
                [type]: event.target.value
            })
        }
    }

    return (
        <div>
            {/*每次键盘事件后，页面都会重新渲染*/}
            <div>{student.name}=={student.email}=={student.phone}</div>
            姓名：<input onChange={studentChange('name')}/>
            邮箱：<input onChange={studentChange('email')}/>
            电话：<input onChange={studentChange('phone')}/>
        </div>
    );
}

export type Student = {
    name: string;
    email: string;
    phone: string;
}
```

### 更新方式

- 方法调用是同步的，更新操作是异步的

```bash
1. state更新操作按钮
2. state发生改变
3. 页面重新render
```

```tsx
import {useState} from "react";

export const Father = () => {
    console.log("Father Render");

    const [count, setCount] = useState<number>(0);

    const incr = () => {
        setCount((preCount: number) => {
            return preCount + 1;
        });
        /*异步更新：原来是0，这里依然是0*/
        console.log(count);
    }

    return (
        <div>
            {/*进行到return时，已经异步更新完毕*/}
            <div>{count}</div>
            <button onClick={incr}>加一</button>
        </div>
    );
}
```

## props

- 父子组件之间通信，父组件向子组件传递属性，方法
- 属性状态和对应的方法：保存在父组件中，传递给子组件，允许子组件调用，从而修改属性
- 父组件每次re-render，会带着子组件一起re-render

### 属性/方法

```tsx
import type {BaseSyntheticEvent, FC} from "react";

interface SonProps {
    age: number,
    username?: string,
    say: () => void,
    work: (city: string, year: number) => string;
    hardWork: (city: string, year: number) => (event: BaseSyntheticEvent) => void;
}

export const Son: FC<SonProps> = (props) => {
    console.log("son render")
    const {age, username, say, work, hardWork} = props;

    return (
        <>
            <h2>{age}==={username}</h2>
            <button onClick={say}>无参数</button>
            <button onClick={() => {
                return work('北京', 2025);
            }}>有参数普通写法
            </button>

            <button onClick={
                hardWork("南京", 2024)
            }>柯里化写法
            </button>
        </>
    );
};

```

```tsx
import {type BaseSyntheticEvent, useState} from "react";
import {Son} from "./Son.tsx";


export const Father = () => {
    console.log("Father Render");
    const [age, setAge] = useState<number>(0);
    const [username, setUsername] = useState<string>("lucy");

    const firstMethod = () => {
        setAge(age + 1);
        setUsername((prevState) => {
            return prevState + '~';
        })
        console.log("first method");
    }

    /*普通写法*/
    const secondMethod = (city: string, year: number): string => {
        console.log("second method", city, year);
        return `${city}, ${year}`;
    }

    /*函数柯里化写法*/
    const thirdMethod = (city: string, year: number) => {
        return (event: BaseSyntheticEvent) => {
            console.log(event)
            console.log("third method", city, year);
        }
    }

    return (
        <div>
            <div>
                <Son age={age} username={username} say={firstMethod} work={secondMethod} hardWork={thirdMethod}/>
            </div>
        </div>
    );
}
```

### children

- 组件标签内，嵌套的内容，默认不会渲染，这个数据会被封装到props中
- 可以嵌套html或者其他组件

```tsx
import {Son} from "./Son.tsx";
import {Cat} from "./Cat.tsx";

export const Father = () => {
    console.log("Father Render");

    return (
        <div>
            <div>
                {/*嵌套html*/}
                <Son><h2>你好</h2></Son>
                {/*嵌套组件*/}
                <Son><Cat/></Son>
            </div>
        </div>
    );
}
```

```tsx
import type {FC, ReactNode} from "react";

interface SonProps {
    /*组件插槽中的数据，html或者其他组件*/
    children: ReactNode,
}

export const Son: FC<SonProps> = (props) => {
    console.log("son render")
    const {children} = props;

    return (
        <>
            <div>子组件</div>
            {/*渲染位置*/}
            {children}
        </>
    );
};
```

### renderProps

- 子组件不仅用到父组件，也要用到爷爷组件的方法和属性

```tsx
import type {FC} from "react";

interface SonProps {
    fatherName: string,
    grandfatherAddress: string
}

export const Son: FC<SonProps> = (props) => {
    const {fatherName, grandfatherAddress} = props;
    return (
        <>
            <h2>子组件</h2>
            <h2>父亲姓名：{fatherName}</h2>
            <h2>爷爷姓名：{grandfatherAddress}</h2>
        </>
    );
};
```

```tsx
import {type FC, type ReactNode, useState} from "react";

interface FatherProps {
    /*父组件的属性*/
    fatherRender: (fatherName: string) => ReactNode;
}

export const Father: FC<FatherProps> = (props) => {

    const [fatherName] = useState<string>("传奇");

    const {fatherRender} = props;
    return (
        <>
            <div>父亲组件开始</div>
            {fatherRender(fatherName)}
            <div>父亲组件结束</div>
        </>
    );
}
```

```tsx
import {useState} from "react";
import {Father} from "./Father.tsx";
import {Son} from "./Son.tsx";

export const GrandFather = () => {
    /*顶层组件的属性*/
    const [grandFatherAddress] = useState<string>("甘肃");

    return (
        <div>
            <Father fatherRender={(fatherName) => {
                return <Son grandfatherAddress={grandFatherAddress} fatherName={fatherName}/>
            }}/>
        </div>
    );
};
```

## useRef

- 维护组件的属性，状态。ref的变化不会导致页面的re-render，ref也有缓存，不会因为函数的重复调用而失效
- 如果这种属性不被页面渲染所需要，可以使用ref，比如查询条件

```tsx
import {useRef, useState} from "react";

export const Home = () => {
    const queryName = useRef<string>("erick");
    const [displayAge, setDisplayAge] = useState<number>(20);

    console.log("render", queryName.current, displayAge)
    return (
        <>
            <h2>{displayAge}</h2>
            <button onClick={() => {
                queryName.current += "~";
            }}>改变ref
            </button>
            <button onClick={() => {
                setDisplayAge((prevState) => {
                    return prevState + 1
                })
            }}>改变state
            </button>
        </>
    );
};
```

# 性能优化

## 父子组件

### 默认-re-render

- 父组件渲染时，遇到子组件就会渲染子组件，不管子组件是否用到父组件的状态
- 父组件一旦re-render，所有子组件就会re-rener

```tsx
export const Son = () => {
    console.log("son render")
    return (
        <>
            <h2>子组件</h2>
        </>
    );
};
```

```tsx
import {Father} from "./components/layout/Father.tsx";

export default function App() {
    return (
        <>
            <Father/>
        </>
    )
}
```

### memo-函数组件

- 对函数组件的整体缓存
- 封装子组件：只有组件存在props并且props发生变化时，父组件的re-render才会trigger子组件的re-render（浅比较）

```tsx
import {type FC, memo} from "react";

interface SonProps {
    name: string,
}

export const Son: FC<SonProps> = memo(() => {
    console.log("son render")
    return (
        <>
            <h2>子组件</h2>
        </>
    );
});
```

```tsx
import {Son} from "./Son.tsx";
import {useState} from "react";

export const Father = () => {
    console.log('father render')
    const [age, setAge] = useState<number>(1);


    return (
        <>
            <div>父组件{age}</div>
            <button onClick={() => {
                setAge((pre) => {
                    return pre + 1
                })
            }}>+
            </button>
            <Son name={"test"}/>
        </>
    );
}
```

## useMemo-函数调用

- 缓存函数计算结果callApi(非组件)
- 只要name和count发生变化，页面就会re-render，则就会每次调用callApi
- callApi只和count有关，希望只在count发生变化时，才会去重新调用该函数

```bash
# 缺点：不要大量使用，
- 缓存值会占用内存，过度使用可能导致性能下降

# 场景
- 适用于计算成本高（如复杂运算、大数组处理）
- 需要稳定对象引用的场景，比如在上面memo函数中，比较props中的引用数据类型时候
```

```tsx
import {useMemo, useState} from "react";

export const Home = () => {

    const [name, setName] = useState<string>('erick');
    const [count, setCount] = useState<number>(10);

    /*参数一：回调函数       参数二：监控项目
    * 1. 组件挂载完毕后，第一次执行
    * 2. count变化时，才去调用该函数
    * 3. age变化时候，对该函数结果执行了缓存，不会再次调用 */
    const countResult = useMemo(() => {
        return callApi(count);
    }, [count]);

    return (
        <>
            <div>
                <button onClick={() => setCount(count + 1)}>count加1</button>
                <button onClick={() => setName(name + '~')}>name加1</button>
                <div>{countResult}</div>
            </div>
        </>
    );
};

const callApi = (count: number) => {
    console.log("call api execute")
    return count * 3;
}
```

## useEffect

- 在组件的生命周期内，进行一些操作，整个过程，没有发生任何的用户操作事件

```bash
# 场景
- 发送ajax请求
- 手动更改真实DOM
- 设置订阅，启动定时器
```

### 空监听state

- 依赖项数据为空数组：不监测任何属性，只会在组件整个渲染完毕后，执行一次

```tsx
import {useEffect, useState} from "react";

export default function App() {
    console.log('render');

    const [data, setData] = useState<string>('');

    /*1. 检测空数组
    * 2. 在hook中不修改state属性*/
    useEffect(() => {
        console.log("副作用hook");
    }, [])
    return (
        <>
            <div>{data}</div>
            <button onClick={() => {
                setData(previous => previous + '~')
            }}>修改数据
            </button>
        </>
    )
}
```

### 指定监听state

- 页面初始化渲染完毕后调用一次钩子，state改变时继续调用钩子

```tsx
import {useEffect, useState} from "react";

export default function App() {

    const [data, setData] = useState<number>(1);

    console.log('render', data);

    /*1. 检测state属性-data
    * 2. 在hook中修改state属性*/
    useEffect(() => {
        console.log("副作用hook");
    }, [data]);
    return (
        <>
            <div>{data}</div>
            <button onClick={() => {
                setData(previous => previous + 1)
            }}>修改数据
            </button>
        </>
    )
}
```

### 监听所有state

- 如果不指定监听的state，则默认会监听当前组件的所有state

```tsx
import {useEffect, useState} from "react";

export default function App() {

    const [data, setData] = useState<number>(1);

    console.log('render', data);

    /*1. 不指定监听的state*/
    useEffect(() => {
        console.log("副作用hook");
    });
    return (
        <>
            <div>{data}</div>
            <button onClick={() => {
                setData(previous => previous + 1)
            }}>修改数据
            </button>
        </>
    )
}
```

### 死循环

- 不要在副作用中，监听A-state，同时改变A-state，否则就会触发页面的无限渲染

```tsx
import {useEffect, useState} from "react";

export default function App() {

    const [data, setData] = useState<number>(1);

    console.log('render', data);

    /*1. 不指定监听的state*/
    useEffect(() => {
        setData((prev) => prev + 1);
    }, [data]);
    return (
        <>
            <div>{data}</div>
        </>
    )
}
```

