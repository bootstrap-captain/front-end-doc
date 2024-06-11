# 简介

## 1. 简介

- Redux是一个专门用于做状态管理的JS库，不是react插件库
- 可以在react，angular，vue等项目中，但基本与react配合使用
- 作用：集中式管理react应用中多个组件共享的状态

## 2. 适用场景

- 某个组件的状态，需要让其他组件可以随时拿到
- 一个组件需要改变另外一个组件的状态(通信)
- 总体原则：能不用就不用，如果不用比较吃力，才考虑使用

## 3. 原理图

![image-20240609151028634](https://erick-typora-image.oss-cn-shanghai.aliyuncs.com/img/image-20240609151028634.png)

# React原生版

- 求和案列

![image-20240609154354293](https://erick-typora-image.oss-cn-shanghai.aliyuncs.com/img/image-20240609154354293.png)

```jsx
import {Component, createRef} from "react";

export class Count extends Component {
    state = {
        count: 0
    }

    selectRef = createRef();

    increment = () => {
        let value = this.selectRef.current.value;
        this.setState({
            /*类型转换*/
            count: this.state.count + value * 1
        });
    }

    decrement = () => {
        let value = this.selectRef.current.value;
        this.setState({
            /*类型转换*/
            count: this.state.count - value * 1
        });
    }

    incrementIfOdd = () => {
        let value = this.selectRef.current.value;
        if (this.state.count % 2 !== 0) {
            this.setState({
                /*类型转换*/
                count: this.state.count + value * 1
            });
        }
    }

    asyncIncrement = () => {
        let value = this.selectRef.current.value;

        setTimeout(() => {
            this.setState({
                /*类型转换*/
                count: this.state.count + value * 1
            });
        }, 1000)
    }

    render() {
        return (
            <div>
                <h1>当前求和为{this.state.count}</h1>

                <select ref={this.selectRef}>
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                </select>&nbsp;&nbsp;&nbsp;

                <button onClick={this.increment}>+</button>
                &nbsp;&nbsp;&nbsp;
                <button onClick={this.decrement}>-</button>
                &nbsp;&nbsp;&nbsp;
                <button onClick={this.incrementIfOdd}>当前count为奇数再加</button>
                &nbsp;&nbsp;&nbsp;
                <button onClick={this.asyncIncrement}>异步加</button>
            </div>
        )
    }
}
```

#  Redux实现

## 1. 入门案例

### store.js

```js
/*专门用于暴露一个store对象，整个应用只有一个store对象 */

// 引入createStore，专门用来创建redux中最为核心的store对象
import {createStore} from "redux";
import erickCountReducer from './count_reducer'

export default createStore(erickCountReducer);
```

### constant.js

```js
export const INCREMENT = 'increment';
export const DECREMENT = 'decrement';
```

### count_action.js

```jsx
/*该文件专门为Count组件生成action对象*/

/*Increment的Action对象*/
import {DECREMENT, INCREMENT} from "./constants";

export function createIncrementAction(data) {
    return {type: INCREMENT, data: data};
}

/*Decrement的Action对象*/
export function createDecrementAction(data) {
    return {type: DECREMENT, data: data};
}
```

### count_reducer.js

```js
/*1. 专门为Count组件服务的reducer
* 2. reducer的本质就是一个函数
*    2.1 参数一：之前的状态：preState
*    2.2 参数二：动作对象：action*/

import {DECREMENT, INCREMENT} from "./constants";

export default function erickCountReducer(previousState, action) {
    /*第一次是 undefined*/
    console.log(previousState);

    /*第一次是 type： "@@redux/INIT   c.y.w.x.b(随机字符串，防止和下面的判断对上)" */
    console.log(action);

    if (previousState === undefined) {
        previousState = 50;
    }

    /* 从action对象中获取 type，data*/
    const {type, data} = action;

    switch (type) {
        case INCREMENT:
            /*返回处理后的状态： 后续可以通过 store.getState()在需要的组件里面取*/
            return previousState + data;
        case DECREMENT:
            return previousState - data;
        /*初始化的时候，previousState为undefined*/
        default:
            return previousState;
    }
}
```

### Count.jsx

```jsx
import {Component, createRef} from "react";
/*状态交给谁，就去找谁要*/
import store from "../../redux/store";
import {createDecrementAction, createIncrementAction} from "../../redux/count_action";

export class Count extends Component {

    selectRef = createRef();

    /* redux更改完毕store中的数据后，并不会不触发react的render，
        需要react自己去监听redux的数据，然后更新

    组件第一次渲染完毕后，开启对store的监听
    * 只要store保存的状态发生改变，则就重新render一次页面*/
    componentDidMount() {
        store.subscribe(() => {
            /*不做任何处理，单纯为了触发render*/
            this.setState({});
        })
    }

    increment = () => {
        let value = this.selectRef.current.value;
        /*分发事件给store*/
        /*调用action*/
        store.dispatch(createIncrementAction(value * 1))
    }

    decrement = () => {
        let value = this.selectRef.current.value;
        /*分发事件给store*/
        store.dispatch(createDecrementAction(value * 1))
    }

    incrementIfOdd = () => {
        let value = this.selectRef.current.value;
        /*从store中去取数据*/
        let previous = store.getState();

        if (previous % 2 !== 0) {
            store.dispatch(createIncrementAction(value * 1))
        }
    }

    asyncIncrement = () => {
        let value = this.selectRef.current.value;

        setTimeout(() => {
            store.dispatch(createIncrementAction(value * 1))
        }, 1000)
    }

    render() {
        return (
            <div>
                {/*从store中拿到数据
                1.  第一次默认值是在reducer里面定义的*/}
                <h1>当前求和为{store.getState()}</h1>

                <select ref={this.selectRef}>
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                </select>&nbsp;&nbsp;&nbsp;

                <button onClick={this.increment}>+</button>
                &nbsp;&nbsp;&nbsp;
                <button onClick={this.decrement}>-</button>
                &nbsp;&nbsp;&nbsp;
                <button onClick={this.incrementIfOdd}>当前count为奇数再加</button>
                &nbsp;&nbsp;&nbsp;
                <button onClick={this.asyncIncrement}>异步加</button>
            </div>
        )
    }
}
```

## 2. 异步action

- 不想把等待的时间放在组件中自身，想交给action来处理
- 不是必须要用的，但是需要学，尼玛！！！

```bash
npm i redux-thunk

#  "redux-thunk": "^3.1.0",
```

### store.js

```js
import {createStore, applyMiddleware} from "redux";
import erickCountReducer from './count_reducer'

/*支持异步任务*/
import {thunk} from "redux-thunk";

export default createStore(erickCountReducer, applyMiddleware(thunk));
```

### count_action.js

```js
import {DECREMENT, INCREMENT} from "./constants";


/*同步Action: action的值为Object类型的一般对象*/
export function createIncrementAction(data) {
    return {type: INCREMENT, data: data};
}

export function createDecrementAction(data) {
    return {type: DECREMENT, data: data};
}

/*异步Action:
*    1. action的值为函数
*    2. 异步action中，一般都会回调同步action，异步action不是必须要使用的*/

export function createAsyncIncrementAction(data, time) {
    /*返回的函数，store会自己来执行，会传递一个dispatch操作*/
    return (dispatch) => {
        setTimeout(() => {
            dispatch(createIncrementAction(data))
        }, time)
    }
}
```

### Count.jsx

```jsx
asyncIncrement = () => {
    let value = this.selectRef.current.value;
    /*分发任务*/
    store.dispatch(createAsyncIncrementAction(value * 1, 1000))
}
```

# react-redux

- react官方出的插件，能够在项目中，更加方便的使用redux
- 套壳技术

## 1. 简介

```bash
- 所有的UI组件都应该被一个容器组件包裹，父子关系
- 容器组件是真正和redux打交道的，里面可以随意的使用redux的api
- UI组件不能使用任何redux的api
- 容器组件会传给UI组件： redux中保存的状态   用于操作状态的方法
- 容器给UI传递：状态，操作状态的犯法，均通过props传递
```

![image-20240609223748043](https://erick-typora-image.oss-cn-shanghai.aliyuncs.com/img/image-20240609223748043.png)

## 2. 入门Demo

```bash
npm i react-redux
# "react-redux": "^9.1.2",
```

### 2.1 容器组件-CountContainer

- 一般放在src/containers中

```jsx
/*引入UI组件*/
import {CountUI} from "../../component/Count/CountUI";

/*引入connect用于链接UI组件和redux*/
import {connect} from "react-redux";
import {createAsyncIncrementAction, createDecrementAction, createIncrementAction} from "../../redux/count_action";

/*1. 回调函数： 用于向UI组件传递状态
*   1.1 返回一个对象
*   1.2 对象的key作为传递给UI组件的props的key， value就是作为传递给UI组件的props的value
*   1.3 参数：在App组件中已经传递了store，因此store和这个函数交互时候，传入state*/
function mapStateToProps(state) {
    return {count: state}
}

/*2. 回调函数： 用于向UI组件传递操作状态的方法
*     2.1 返回一个对象
*     2.2 对象的key作为传递给UI组件的props的key， value作为传递给UI组件的props的value
*     2.3. value是一个函数*/
function mapDispatchToPros(dispatch) {
    return {
        /*将事件分发给store*/
        increment: (data) => {
            dispatch(createIncrementAction(data))
        },

        decrement: (data) => {
            dispatch(createDecrementAction(data))
        },

        incrementIfOdd: (data) => {
            dispatch(createIncrementAction(data))
        },

        asyncIncrement: (data, time) => {
            dispatch(createAsyncIncrementAction(data, time))
        }
    }

}


/*创建容器组件，并暴露
*  参数一： store，会在app中传递
*  参数二： UI组件*/
export const CountContainer = connect(mapStateToProps, mapDispatchToPros)(CountUI);
```

### 2.2 UI组件-CountUI

- 就是之前普通的component下面的组件

```jsx
import {Component, createRef} from "react";
import store from "../../redux/store";

export class CountUI extends Component {

    selectRef = createRef();

    componentDidMount() {
        /*单纯保留，为了触发render*/
        store.subscribe(() => {
            /*不做任何处理，单纯为了触发render*/
            this.setState({});
        })
    }

    increment = () => {
        let value = this.selectRef.current.value;
        /*调用容器组件的方法*/
        this.props.increment(value * 1);
    }

    decrement = () => {
        let value = this.selectRef.current.value;
        /*调用容器组件的方法*/
        this.props.decrement(value * 1);
    }

    incrementIfOdd = () => {
        let value = this.selectRef.current.value;
        /*从容器中去取数据*/
        let previous = this.props.count;

        if (previous % 2 !== 0) {
            /*调用容器组件的方法*/
            this.props.incrementIfOdd(value * 1);
        }
    }

    asyncIncrement = () => {
        /*调用容器组件的方法*/
        let value = this.selectRef.current.value;
        this.props.asyncIncrement(value * 1, 1000);
    }

    render() {
        return (
            <div>

                <h1>当前求和为{this.props.count}</h1>

                <select ref={this.selectRef}>
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                </select>&nbsp;&nbsp;&nbsp;

                <button onClick={this.increment}>+</button>
                &nbsp;&nbsp;&nbsp;
                <button onClick={this.decrement}>-</button>
                &nbsp;&nbsp;&nbsp;
                <button onClick={this.incrementIfOdd}>当前count为奇数再加</button>
                &nbsp;&nbsp;&nbsp;
                <button onClick={this.asyncIncrement}>异步加</button>
            </div>
        )
    }
}
```

### 2.3 app.js

- 让容器组件和UI组件形成了关系

```jsx
import {Component} from "react";
import {CountContainer} from "./containers/Count/CountContainer";
import store from "./redux/store";

export default class App extends Component {
    render() {
        return (
            <div>
                {/*给容器组件传递：store*/}
                <CountContainer store={store}/>
            </div>)
    }
}
```

### 2.4 redux组件

- 代码和上面的redux原生的一模一样，不发生任何改变

## 3. 优化点

### 3.1 CountContainer.js

- 支持对象写法，简化代码，react-redux会帮忙dispatch

```jsx
import {CountUI} from "../../component/Count/CountUI";
import {connect} from "react-redux";
import {createAsyncIncrementAction, createDecrementAction, createIncrementAction} from "../../redux/count_action";

function mapStateToProps(state) {
    return {count: state}
}

/*mapDispatchToPros: 
 1.可以写对象模式
 2.react会自动进行dispatch的动作*/
const mapDispatchToPros = {
    increment: createIncrementAction,
    decrement: createDecrementAction,
    incrementIfOdd: createIncrementAction,
    asyncIncrement: createAsyncIncrementAction
}

export const CountContainer = connect(mapStateToProps, mapDispatchToPros)(CountUI);
```

### 3.2 自动检测render

- 上面的connect，帮助进行了自动检测
- 可以从CountUI组件中删除以下代码

```jsx
componentDidMount() {
    /*单纯保留，为了触发render*/
    store.subscribe(() => {
        /*不做任何处理，单纯为了触发render*/
        this.setState({});
    })
}
```

### 3.3 Provider

- 保证所有的app中的容器组件，都会有对应的store

#### index.js

```jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {Provider} from "react-redux";
import store from "./redux/store";

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <App/>
        </Provider>
    </React.StrictMode>
);
```

#### app.js

- 不用再给UI组件传递store了

```jsx
import {Component} from "react";
import {CountContainer} from "./containers/Count/CountContainer";

export default class App extends Component {
    render() {
        return (
            <div>
                <CountContainer/>
            </div>)
    }
}
```

### 3.4 UI组件和Container组件

- 可以把这两个混在一起，避免文件太多
- 将UI组件放在container组件中，这样就知道，这个UI组件，是使用到了redux的，和store有关系

![image-20240610104348377](https://erick-typora-image.oss-cn-shanghai.aliyuncs.com/img/image-20240610104348377.png)

```jsx
import {connect} from "react-redux";
import {createAsyncIncrementAction, createDecrementAction, createIncrementAction} from "../../redux/count_action";
import {Component, createRef} from "react";

/*UI的类*/
export class Count extends Component {

    selectRef = createRef();

    increment = () => {
        let value = this.selectRef.current.value;
        this.props.increment(value * 1);
    }

    decrement = () => {
        let value = this.selectRef.current.value;
        this.props.decrement(value * 1);
    }

    incrementIfOdd = () => {
        let value = this.selectRef.current.value;
        let previous = this.props.count;
        if (previous % 2 !== 0) {
            this.props.incrementIfOdd(value * 1);
        }
    }

    asyncIncrement = () => {
        let value = this.selectRef.current.value;
        this.props.asyncIncrement(value * 1, 1000);
    }

    render() {
        return (
            <div>

                <h1>当前求和为{this.props.count}</h1>

                <select ref={this.selectRef}>
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                </select>&nbsp;&nbsp;&nbsp;

                <button onClick={this.increment}>+</button>
                &nbsp;&nbsp;&nbsp;
                <button onClick={this.decrement}>-</button>
                &nbsp;&nbsp;&nbsp;
                <button onClick={this.incrementIfOdd}>当前count为奇数再加</button>
                &nbsp;&nbsp;&nbsp;
                <button onClick={this.asyncIncrement}>异步加</button>
            </div>
        )
    }
}

/*Container的类, 暴露出去的是这个*/
function mapStateToProps(state) {
    return {count: state}
}

const mapDispatchToPros = {
    increment: createIncrementAction,
    decrement: createDecrementAction,
    incrementIfOdd: createIncrementAction,
    asyncIncrement: createAsyncIncrementAction
}

export const CountContainer = connect(mapStateToProps, mapDispatchToPros)(Count);
```

# react-redux

- 多组件通信

![image-20240610135519027](https://erick-typora-image.oss-cn-shanghai.aliyuncs.com/img/image-20240610135519027.png)

## index.js

```jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {Provider} from "react-redux";
import store from "./redux/store";

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <App/>
        </Provider>
    </React.StrictMode>
);
```

## app.js

```jsx
import {Component} from "react";
import {CountContainer} from "./containers/Count/CountContainer";
import {PersonContainer} from "./containers/person/PersonContainer";

export default class App extends Component {
    render() {
        return (
            <div>
                <CountContainer/>
                <hr/>
                <PersonContainer/>
            </div>)
    }
}
```

## store.js

```jsx
import {createStore, applyMiddleware, combineReducers} from "redux";
import personReducer from "./reducers/Person";
import countReducer from './reducers/Counter'
/*支持异步任务*/
import {thunk} from "redux-thunk";

/*k-v，保证后面UI组件的取数据*/
const allProducer = combineReducers({
    person: personReducer,
    count: countReducer
})

/*需要对所有的reducer都引入*/
export default createStore(allProducer, applyMiddleware(thunk));
```
