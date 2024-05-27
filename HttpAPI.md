# Ajax

- Asynchronous JavaScript And XML
- 在网页不刷新的情况下，向服务端发送请求

```bash
# 优点
- 可以无需刷新页面，与服务端进行通信
- 允许根据用户事件，更新部分页面内容

# 缺点
- 没有浏览历史，不能回退
- 存在跨域问题（同源）
- SEO不友好(响应体不包含ajax的返回数据)
```

## 1. GET

### 服务端接口

```java
package com.citi.erick.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/erick")
@CrossOrigin()
@Slf4j
public class StudentController {

    @GetMapping("/sleep")
    public String sleep() {
        log.info("sleep coming");
        return "hello erick";
    }

    @GetMapping("/eat")
    public String eat(@RequestParam(name = "name") String name,
                      @RequestParam(name = "age") String myName) {
        log.info("name={},age={}", name, myName);
        return name + myName;
    }

    /*响应Json*/
    @GetMapping("/getAll")
    public People getAll(@RequestParam(name = "prefix") String prefix) {
        People people = new People();
        people.setAddress(prefix + "xian");
        people.setAge(prefix + "45");
        people.setName(prefix + "shuzhan");
        return people;
    }
}
```

### html

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>

    <script src="GetRequest.js"></script>
</head>
<body>

<button onclick=getWithoutArgs()>GET不带参数</button>
<br>
<button onclick=getWithArgs()>GET带参数</button>
<br>
<button onclick=getWithJsonResponseFirst()>GET返回json01</button>
<br>
<button onclick=getWithJsonResponseSecond()>GET返回json02</button>
</body>
</html>
```

### js

```js
/*1. get请求，不带参数*/
function getWithoutArgs() {
    // 1. Ajax 对象
    let xhr = new XMLHttpRequest();
    // 2. 请求方法和路径
    xhr.open('GET', 'http://localhost:8080/erick/sleep');
    // 请求头: 可以自定义
    xhr.setRequestHeader('k1', 'v1');
    xhr.setRequestHeader('k2', 'v2');
    // 3. 发送
    xhr.send();
    // 4. 返回数据
    /* 4.1 readstate: 是xhr对象中的属性，一共会触发四次，表示xhr的状态变化
    *   0: 初始化
    *   1: open方法调用完毕
    *   2： send方法调用完毕
    *   3： 服务端返回了部分结果
    *   4.  服务端返回了所有结果
    *  */
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) { // 服务端返回了所有结果
            if (xhr.status >= 200 && xhr.status < 300) { // 判断响应码
                // 200
                console.log('状态码=', xhr.status);
                // 
                console.log('状态字符串=', xhr.statusText);
                // content-length: 11 content-type: text/plain;charset=UTF-8
                console.log('header =', xhr.getAllResponseHeaders());
                // 响应体= hello erick
                console.log('响应体=', xhr.response);
            }
        }
    }
}

/**
 * 2. get请求带参数
 */
function getWithArgs() {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://localhost:8080/erick/eat?name=shuzhan&age=20'); // 带参数的
    xhr.send();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status >= 200 && xhr.status < 300) {
                console.log('result', xhr.response); // shuzhan20
            }
        }
    }
}


/**
 *  3. Get返回json: 手动转换
 */
function getWithJsonResponseFirst() {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://localhost:8080/erick/getAll?prefix=test');
    xhr.send();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status >= 200 && xhr.status < 300) {
                // {"name":"testshuzhan","age":"test45","address":"testxian"}
                console.log(xhr.response);
                // 1. 手动转换为json
                let data = JSON.parse(xhr.response);
                console.log(data);
            }
        }
    }
}

/**
 *  4. Get返回json：自动转换json
 */
function getWithJsonResponseSecond() {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://localhost:8080/erick/getAll?prefix=test');
    xhr.responseType = 'json';
    xhr.send();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status >= 200 && xhr.status < 300) {
                // 直接就是jspn
                console.log(xhr.response);
            }
        }
    }
}
```

## 2.POST

```bash
# 发送post请求时，需要设置该header
# 一般情况，一个请求应该只包含一种数据类型

# params
"content-Type", "application/x-www-form-urlencoded"

# body： json
"content-Type", "application/json"
```

### 服务端接口

```java
package com.citi.erick.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/erick")
@Slf4j
@CrossOrigin
public class PostController {

    @PostMapping("/noargs")
    public String noargs() {
        log.info("post1 coming");
        return "erick";
    }

    @PostMapping("/withargs")
    public People savePeople(@RequestParam(name = "address") String myAddress,
                             @RequestParam(name = "name") String myName,
                             @RequestParam(name = "age") String myAge) {
        People people = new People();
        people.setAddress("param_" + myAddress);
        people.setName("param_" + myName);
        people.setAge("param_" + myAge);
        return people;
    }

    @PostMapping("/withRequestBody")
    public People savePeopleBody(@RequestBody People people) {
        people.setAddress("body_" + people.getAddress());
        people.setAge("body_" + people.getAge());
        people.setName("body_" + people.getName());
        return people;
    }
}
```

### html

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>

    <script src="../post/PostRequest.js"></script>
</head>
<body>

<button onclick=postWithArgs()>POST不带参数</button>
<br>

<button onclick=postWithParamArgs()>POST带参数</button>
<br>

<button onclick=postWithRequestBodyArgs()>POST带Body</button>
<br>

</body>
</html>
```

### js

```js
function postWithArgs() {
    let xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://localhost:8080/erick/noargs');
    xhr.send();

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) { // 服务端返回了所有结果
            if (xhr.status >= 200 && xhr.status < 300) { // 判断响应码
                console.log('响应体=', xhr.response);
            }
        }
    }
}

function postWithParamArgs() {
    let xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://localhost:8080/erick/withargs'); // 带参数的
    let param = "name=shuzhan&age=12&address=xian";
    //  POST传递参数的必须的header：application/x-www-form-urlencoded
    xhr.setRequestHeader("content-Type", "application/x-www-form-urlencoded");
    xhr.send(param);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status >= 200 && xhr.status < 300) {
                console.log('result', xhr.response);
            }
        }
    }
}

function postWithRequestBodyArgs() {
    let xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://localhost:8080/erick/withRequestBody');

    // POST传递Body的必须的header：application/json
    xhr.setRequestHeader("content-Type", "application/json");
    let data = JSON.stringify({
        name: 'erick',
        age: '30',
        address: 'pk'
    });

    xhr.send(data);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status >= 200 && xhr.status < 300) {
                console.log(xhr.response);
            }
        }
    }
}
```



## 3. 超时/异常

### 服务端接口

```java
package com.citi.erick.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.concurrent.TimeUnit;

@RestController
@RequestMapping("/erick")
@CrossOrigin()
@Slf4j
public class TimeoutController {

    @GetMapping("/timeout")
    public String sleep() throws InterruptedException {
        TimeUnit.SECONDS.sleep(4);
        log.info("timeout coming");
        return "hello erick";
    }
}
```

### html

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <script src="timeout.js"></script>
</head>
<body>
<button onclick=testTimeOut()>超时</button><br>
<button onclick=testNetWorkError()>网络异常</button><br>

</body>
</html>
```

### js

```js
function testTimeOut() {
    let xhr = new XMLHttpRequest();
    // 设置超时
    xhr.timeout = 2000;
    // timeout 超时回调
    xhr.ontimeout = function () {
        alert('超时')
    }

    xhr.open('GET', 'http://localhost:8080/erick/timeout');
    xhr.send();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status >= 200 && xhr.status < 300) {
                console.log('响应体=', xhr.response);
            }
        }
    }
}

function testNetWorkError() {
    let xhr = new XMLHttpRequest();
    // 网络异常回调
    xhr.onerror = function () {
        alert('网络异常')
    }
    xhr.open('GET', 'http://localhost:8080/erick/random');
    xhr.send();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status >= 200 && xhr.status < 300) {
                console.log('响应体=', xhr.response);
            }
        }
    }
}
```

## 4. 取消请求

- 当一个请求，处于pending状态时候，可以取消请求

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <script src="cancel.js"></script>
</head>
<body>
<button onclick=sendRequest()>发送请求</button><br>
<button onclick=cancelRequest()>取消请求</button><br>

</body>
</html>
```

```js
let xhr = new XMLHttpRequest();

/**
 * 发送请求
 */
function sendRequest() {
    xhr.open('GET', 'http://localhost:8080/erick/timeout');
    xhr.send();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status >= 200 && xhr.status < 300) {
                console.log('响应体=', xhr.response);
            }
        }
    }
}

/* 取消请求*/
function cancelRequest() {
    xhr.abort();
}
```

## 5. 重复请求

- 用户多次点击同一个按钮，则取消当前请求，避免多次请求

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <script src="cancel.js"></script>
</head>
<body>
<button onclick=sendRequest()>发送请求</button><br>

</body>
</html>
```

```js
let isSending = false;

function sendRequest() {
    if (isSending) {
        // 取消当前请求
       return;
    }

    let xhr = new XMLHttpRequest();
    isSending = true; // 创建好xhr之后，就代表已经开始发送请求了

    xhr.open('GET', 'http://localhost:8080/erick/timeout');
    xhr.send();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            // 这个时候请求已经处理完毕了
            isSending = false;

            if (xhr.status >= 200 && xhr.status < 300) {
                console.log('响应体=', xhr.response);
            }
        }
    }
}
```

```java
package com.citi.erick.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.concurrent.TimeUnit;

@RestController
@RequestMapping("/erick")
@CrossOrigin()
@Slf4j
public class TimeoutController {

    @GetMapping("/timeout")
    public String sleep() throws InterruptedException {
        log.info("timeout coming");
        TimeUnit.SECONDS.sleep(4);
        log.info("timeout ending");
        return "hello erick";
    }
}
```

## 6. 同源策略

- 浏览器的一种安全策略
- 浏览器发送的请求，和后台的服务，协议，域名，端口号必须完全相同，否则报错
- 违反同源策略的就是跨域
- Ajax发送请求时，默认要遵循同源策略

### 6.1 CORS

- 官方的跨域解决方案：Cross-Origin Resource Sharing
- 在浏览器客户端不做任何特殊操作，完全在服务端中进行处理
- 在服务端设置一个响应头，告知浏览器，该请求允许跨域。浏览器收到响应头后就会响应

```java
package com.citi.erick.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.concurrent.TimeUnit;

@RestController
@RequestMapping("/erick")
@CrossOrigin() // 就会添加一个响应头： Access-Control-Allow-Origin: *
@Slf4j
public class TimeoutController {

    @GetMapping("/timeout")
    public String sleep() throws InterruptedException {
        log.info("timeout coming");
        TimeUnit.SECONDS.sleep(4);
        log.info("timeout ending");
        return "hello erick";
    }
}
```

# Promise

- ES6引入的，js中的异步编程的解决方案
- Promise是一个构造函数

## 1. 入门案例

- 将异步代码放在Promise函数中

### 1.1 定时器

```js
/*promise方式*/
let flag = true;

function saveDBWithPromise() {
    /*1. resolve：成功时候调用，函数类型的数据
    * 2. reject： 失败时候调用，函数类型的数据
    * 可以包裹一个异步任务*/
    let promise = new Promise((resolve, reject) => {
        /*异步任务*/
        setTimeout(function () {
            console.log(`flag=${flag}`);
            if (flag) {
                resolve(flag + '-erick-success'); // 成功,将promise对象的状态设置为成功，可以传递结果
            } else {
                reject(flag + '-erick-failure');  // 失败，将promise对象的状态设置为失败
            }
            flag = !flag;
        }, 2000);
    });

    /*resolve和reject的解析*/
    promise.then((value) => {
        alert(value);    // 成功
    }, (reason) => {
        alert(reason)   // 失败
    })
}
```

### 1.2 文件读取

- 直接以node.js来运行

```js
let fs = require('fs');

let promise = new Promise((resolve, reject) => {
    /*异步任务*/
    fs.readFile('erick.txt', (err, data) => {
        if (err) {
            reject(err);
        } else {
            resolve(data);
        }
    });
})

promise.then((value) => {
    console.log(`file content=${value}`)
}, (reason) => {
    console.log(`error reason=${reason}`)
})
```

### 1.3 Ajax请求

```js
function sendRequest() {
    let promise = new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', 'http://localhost:8080/erick/timeout');
        xhr.send();
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status >= 200 && xhr.status < 300) {
                    resolve(xhr.response);
                } else {
                    reject(xhr.status);
                }
            }
        }
    });

    promise.then((value) => {
        console.log(value); // 成功回调
    }, (reason) => {
        console.log(reason); // 失败回调
    })
}
```

## 2. 封装Ajax请求Promise

- 将一个异步请求，进一步封装成，返回一个Promise对象的方法
- 调用这个方法时，只需要自定义resolve和reject处理方式

```js
/*封装好Promise函数*/
function sendRequest(method, url) {
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.open(method, url);
        xhr.send();
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status >= 200 && xhr.status < 300) {
                    resolve(xhr.response);
                } else {
                    reject(xhr);
                }
            }
        }
    });
}

/*外面调用的就是这个方法*/
function createUser() {
    sendRequest('GET', 'http://localhost:8080/erick/timeout').then((value) => {
        console.log(value);
    }, (reason) => {
        console.log(reason);
    })
}
```

## 3. Promise流程

![image-20240526205322880](https://erick-typora-image.oss-cn-shanghai.aliyuncs.com/img/image-20240526205322880.png)

### 3.1 PromiseStatus

- promise的状态：promise实例对象中的一个属性

#### 状态转换

- 一个promise对象的状态只能转变一次

```bash
# 三种状态: pending, resolved(fulfilled), rejected, 并且只有两种转换方式
- pending ---> resolved             成功结果一般称为value
- pending ---> rejected             成功结果一般称为reason
```

#### 转换方式

```js
/*1. pending--->resolved/fulfilled*/
let p1 = new Promise((resolve, reject)=>{
    resolve('erick');
})
console.log(p1);


/*2. pending--->rejected
* 必须要进一步处理*/

/*2.1 : reject*/
let p2 = new Promise((resolve, reject)=>{
    reject('dam');
})

p2.catch(reason => {
    console.log(reason); // dam
})

/*2.2: 抛出异常*/
let p3 = new Promise((resolve, reject)=>{
   throw 'oh shit';
})

p3.catch(reason => {
    console.log(reason); // on shit
})
```

#### 转换回调

- 一旦状态发生转换，则该转换所对应的回调都会发生

```js
let p = new Promise((resolve, reject) => {
    resolve('erick');
});

/*两个回调都会发生*/
p.then(value => {
    console.log('first');
});

p.then(value => {
    console.log('second');
});
```

### 3.2 PromiseResult

- promise的结果：promise实例对象中的一个属性
- 存储异步任务，成功或失败的结果

## 4. API

```js
/**
 * executor: 执行器： 会在Promise内部立刻同步调用，异步操作在执行器中执行
 * 1. resolve函数： 内部定义成功时，回调的函数
 * 2. reject函数：  内部定义失败时，回调的函数
 */
let fs = require('fs');
let promise = new Promise((resolve, reject) => {
    /*2. 异步任务： 异步调用*/
    fs.readFile('erick.txt1', (err, data) => {
        if (err) {
            reject(err);
        } else {
            resolve(data);
        }
    });

    console.log('同步方法');  // 1: 同步执行：执行方法
})

promise.then((value) => {
    console.log(`value=${value}`)
}).catch(reason => { // 3. catch: 相当于把then中的第二个拆出来，单独做个语法糖
    console.log(`catch_reason=${reason}`)
})
```

## 5.静态方法

- 属于Promise构造函数的静态方法

### 5.1 resolve()

```js
// 1. 参数：非Promise类型对象，返回结果：PromiseState: fulfilled      PromiseResult:erick
let promise1 = Promise.resolve("erick");
console.log(promise1);

// 2.参数： Promise类型对象，则参数的结果决定了resolve的结果
//   2.1 PromiseState: resolved      PromiseResult:success
let promise2 = Promise.resolve(new Promise((resolve, reject) => {
    resolve('success');
}))
console.log(promise2);

//  2.2 PromiseState: rejected      PromiseResult:failure
let promise3 = Promise.resolve(new Promise((resolve, reject) => {
    reject('failure');
}));

// 如果是失败的结果，则需要处理
promise3.catch(reason => {
    console.log(reason);
})
```

### 5.2 reject()

- 返回一个失败的promise对象，不管传入的是什么类型的数据

```js
// 返回失败的
let promise = Promise.reject("erick");
console.log(promise);

// 必须处理
promise.catch(reason => {
    console.log(reason);
});
```

### 5.3 all()

- 包含n个promise的数据，只有所有的promise成功，返回的promise才成功
- 如果全部成功，则PromiseResult中是一个成功结果的数组['p1-success',521,'hello']

#### 全部成功

- PromiseResult中是一个成功结果的数组['p1-success',521,'hello']
- PromiseState: fulfilled
- 在node项目中不可以

```js
// 全部成功
let p1 = Promise.resolve('p1-success');
let p2 = Promise.resolve(521);
let p3 = new Promise((resolve, reject) => {
    resolve('hello');
})

const promise = Promise.all([p1, p2, p3]);

console.log(promise)
```

#### 部分成功

- 部分成功，则返回的是一个失败的promise对象，要做异常处理

```js
// 全部成功
let p1 = Promise.resolve('p1-success');
let p2 = Promise.reject(521);
let p3 = new Promise((resolve, reject) => {
    resolve('hello');
})

const promise = Promise.all([p1, p2, p3]);

promise.catch(reason => {
    console.log(reason);
})
```

### 5.4 race()

- 包含n个promise的数组，返回一个新的promise
- 第一个完成的promise的结果状态就是最终的状态

## 6. then()

- 返回一个新的Promise对象
- 返回结果：then指定的回调函数执行的结果决定

### 6.1 抛出异常

```js
let p = new Promise((resolve, reject) => {
    resolve('success');
})

let p2 = p.then(value => {
    //  p2就是rejected
    throw 'fuck';
}, reason => {

});

console.log(p2)
```

### 6.2 非Promise对象

- 成功的promise，状态是fulfilled，且PromiseResult是返回的值521

```js
let p = new Promise((resolve, reject) => {
    resolve('success');
})

let p2 = p.then(value => {
    return 521;
}, reason => {

});

console.log(p2)
```

### 6.3 Promise对象

- 返回包含的Promise的对象结果

```js
let p = new Promise((resolve, reject) => {
    resolve('success');
})

let p2 = p.then(value => {
   //  根据这个来决定失败和成功
    return new Promise((resolve, reject)=>{
        resolve('hahah');
    });
}, reason => {

});

console.log(p2)
```

## 7. 任务串联

### 7.1 链式调用

```js
/*异步任务一*/
let p = new Promise((resolve, reject) => {
    resolve('firstJob');
})

p.then(value => {
    /*异步任务二*/
    return new Promise((resolve, reject) => {
        resolve(value + '-secondJob')
    });
}, reason => {
}).then(value => {
    console.log(value);     // firstJob-secondJob
}).then(value => {
    console.log(value);      // undefined,如果需要值，则要在上面的then中将结果返回
})
```

### 7.2. 异常穿透

```js
/*异步任务一*/
let p = new Promise((resolve, reject) => {
    resolve('firstJob');
})

p.then(value => {
    /*异步任务二*/
    return new Promise((resolve, reject) => {
        reject(value + '-secondJob')
    });
}, reason => {
}).then(value => {
    /*异步任务三*/
    return new Promise((resolve, reject) => {
        resolve(value + '-thirdJob')
    });
}).catch(reason => {
    console.log(reason); // firstJob-secondJob
})
```

### 7.3 任务中断

- 链式调用如何中断

```js
/*异步任务一*/
let p = new Promise((resolve, reject) => {
    resolve('firstJob');
    console.log('first coming'); // 先执行
})

p.then(value => {
    /*异步任务二*/

    /*中断任务的唯一方式*/
    if (value === 'firstJob') {
        return new Promise(() => {
        })
    }
    
    return new Promise((resolve, reject) => {
        resolve(value + '-secondJob')
        console.log('second coming'); // 先执行
    });
}, reason => {
}).then(value => {
    /*异步任务三*/
    return new Promise((resolve, reject) => {
        resolve(value + '-thirdJob')
        console.log('third coming'); // 先执行
    });
}).catch(reason => {
    console.log(reason); // firstJob-secondJob
})
```

## 8. async/await

### 8.1 async

- 用来标记一个函数
- 返回结果是一个Promise对象，promise对象的结果由async函数执行的返回值决定

```js
/*返回一个普通数据*/
async function createUser() {
    return 'shuzhan';
}

/*是一个成功的promise对象： fulfilled*/
let promise = createUser();
console.log(promise)
```

```js
/*返回一个Promise对象*/
async function createUser() {
    return new Promise((resolve, reject) => {
        resolve('success');
    })
}

/*是一个成功的promise对象： fulfilled*/
let promise = createUser();
console.log(promise)
```

### 8.2 await

```bash
# await右侧表达式
- promise对象： await返回的是promise成功的值
- 其他值：      可以将此值直接作为await的返回值

# 注意
- await必须写在asynch函数中，但 async函数中可以没有await
- 如果await的promise失败了，就会抛出异常，需要try。。catch来处理
```

```js
async function createUser() {
    let promise = new Promise((resolve, reject) => {
        // 成功
        resolve('shuzhan');
    });

    /* 右侧为promise*/
    let val = await promise;

    console.log(val);
}

createUser();
```

```js
async function createUser() {
    let promise = new Promise((resolve, reject) => {
        // 失败
        reject('shuzhan');
    });

    /* 右侧为promise*/
    let val;
    try {
        val = await promise;
    } catch (e) {
        console.log('failure')
    }
}

createUser();
```

```js
async function createUser() {
    /* 右侧为普通数据*/
   let result = await 10;
    console.log(result);
}

createUser();
```

### 8.3. Ajax综合案例

```js
function sendRequest(method, url) {
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.open(method, url);
        xhr.send();
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status >= 200 && xhr.status < 300) {
                    resolve(xhr.response);
                } else {
                    reject(xhr);
                }
            }
        }
    });
}

async function callApi() {
    const METHOD = 'GET';
    const URL = 'http://localhost:8080/erick/timeout'
    try {
        let result = await sendRequest(METHOD, URL);
        console.log(result)
    } catch (e) {
        console.log(e)
    }
}
```

# Axios



# JS模块化



