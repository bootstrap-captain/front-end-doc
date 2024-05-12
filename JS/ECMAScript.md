# 基本介绍

## 1. 基本概念

- 浏览器分为两部分： 渲染引擎和 JS引擎
- 渲染引擎：用来解析html和css，俗称内核，比如chrome的blink
- JS引擎：JS解释器，用来读取网页的js代码，对其进行处理后运行，如chrome的v8， 将js转换为二进制语言
- 脚本语言：逐行执行，如果某行报错，下面不再执行
- JS 属于脚本语言

## 2. 组成

```bash
# ECMAScript
- 规定了JS的编程语法和基础核心，是所有浏览器厂商共同遵循的一套JS语法工业标准

# DOM
- 文档对象模型, Document Object Model
- 通过DOM提供的接口可以对页面上的各种元素进行操作

# BOM
- 浏览器对象模型，Browser Object Model
- 与浏览器窗口进行互动的对象结构，如弹出框，跳转等
```

## 3. 三种书写

- js的位置尽量写到文档末尾，因为html是从上到下加载一个html的

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>

    <!--这两种，打开网页就会执行-->
    <!--2. 内嵌js: 标签中间不要写代码，会被忽略-->
    <script>alert('内嵌')</script>

    <!--3. 外部引入-->
    <script src="erick.js"></script>
</head>
<body>

<!--1. 行内js-->
<input type="button" value="name" onclick="alert('行内')"/>

</body>
</html>
```

```js
alert('外部引入')
```

## 4. 输入输出

- 结束符号：可以加也可以不加，建议别加

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>

    <script>
       <!--显示一个对话框，用来提示用户输入文字-->
        prompt('输入东西到屏幕')

        alert('弹出东西到页面')

        console.log('erick')
    </script>
</head>
<body>

</body>
</html>
```

# 变量

## 1. 变量/常量

- 一般使用let或者const，尽量不要使用var(过时)

### 1.1 变量

```js
// 先声明再赋值，也可一步到位
// 获取到用户输入的信息
let name = prompt('please input name');
alert(name);
```

```js
/*声明多个变量*/
let name = 'erick';
age = 10;
address = 'shanxi';
console.log(name + age + address);
```

```js
/*只声明，不赋值： undefined*/
let sex;
console.log(sex)

/*无此变量： Uncaught ReferenceError: region is not defined
* 后面的内部不再渲染*/
/* console.log(region)*/

/*不声明直接赋值，也是可以使用*/
name = 'nike';
console.log(name)
```

### 1.2 常量

- 常量的值不能改变，声明的时候必须赋值

```js
const age = 19
```

## 2. 作用域

### 2.1 局部作用域

#### 函数作用域

- 在函数内部声明的变量，只能在函数内部使用，不能在外部使用

```js
function work() {
    let name = 'erick';
    console.log(name)
}

work()

console.log(name) // undefined
```

#### 块级作用域

- 被大括号包裹的代码，也是独立的
- let和const声明的变量，就会有块级作用域
- var的没有，一般不要使用var

```js
{
    let name = 'erick'

    function work() {
        console.log(name) // 可以使用
    }

    work()
}

console.log(name) // 不能使用
```

### 2.2 全局作用域

- 写在当前js文件最外层的变量，就是当前js的全局作用域

### 2.3 作用域链

- 底层的变量查找机制
- 在函数被执行时，优先查找当前函数作用域中查找变量
- 如果当前查找不到，则依次逐级查找父级作用域直到全局作用域
- 子可访问父，父不可访问子

## 3. 闭包

- 内层函数加外层函数的变量，一起构成了闭包
- 并返回内层函数

```js
function outer() {
    /*外层函数的变量*/
    /*提升作用域，不会被垃圾回收*/
    let a = 10;

    /*内层函数*/
  
    /*数据私有，外部无法直接修改a*/
    function inner() {
        a++;
        console.log(a)
    }

    /*返回内层函数*/
    return inner;
}

/*返回值=内层函数*/
const fn = outer();

/*内层函数调用*/
fn();
```



# 语法

## 1. 数据类型

- 弱类型语言：只有在程序运行时，根据具体的赋值结果，才会进行类型划分
- 动态类型：变量的数据类型是可以变化的
- 分为基本数据类型和引用数据类型

```js
let info = 'erick'
console.log(typeof info)    // 得到具体的类型数据
```

### number

```js
let age = 19;
console.log(typeof age)
```

#### NAN

```js
let age = 19
let name ='erick'

// isNaN: 将一个变量转换为数字，如果不能转换，则得到NAN
// NAN和任何其他数字处理的结果，都是NAN
console.log(isNaN(age))
console.log(isNaN(name))
```

### string

- length： 字符串长度
- 拼接： + 
- 推荐使用单引号

```js
let info = 'erick'
console.log(info.length)
console.log(info + 'hello')
```

#### 模版字符串

```java
let age = 19
let name = 'erick'

console.log(`我是${name}, 今年${age}岁了`)
```

### boolean

- 可参与加法运算， true为1，false为0

### undefined

- 声明了变量，但是没有赋值，默认值就是undefined

```js
let name
console.log(typeof name)
```

### null

- 声明了变量，赋值了，但是赋值为null

```js
let name = null
console.log(name)          // null
console.log(typeof name)   // object，本身就是一个js的内置对象
```

### object

- 数组就是引用数据类型object

```js
let arr = [1,4,6,8]
console.log(typeof arr) // object
```

## 2. 类型转换

### 2.1 转换为string

```js
let age = 10

let age1 = age + ''
let age2 = String(age)
let age3 = age.toString()

console.log(typeof age1 + typeof age2 + typeof age3)
```

### 2.2 转换为number

```js
let age1 = parseInt('18')         // 整数
let age2 = parseFloat('19.12')    // 浮点型
let age3 = parseInt('18px')
let age4 = Number(20)

console.log(age1)
console.log(age2)
console.log(age3)
console.log(age4)
```

### 2.3 转换为boolean

```js
let flag = Boolean('1')
console.log(flag)
console.log(typeof flag)
```

## 3. 运算符

- ==单纯比较值是否相等
- ===是比较值和类型是否相等

```js
let age = 19
let age1 = '19'

console.log(age == age1)   // true
console.log(age === age1)  // false
```

## 4. Object

```js
let people = {
    username: 'erick',
    age: 20,
}

let keys = Object.keys(people);  // 数组
let values = Object.values(people); // 数组
console.log(keys)      // [ 'username', 'age' ]
console.log(values)     // [ 'erick', 20 ]

let p = {};
Object.assign(p, people);  // 对象拷贝
console.log(p)
```



# 数组

## 1. API

### 1.1 创建

```js
/*1. 创建数组*/
let arr01 = ['a','b','c']
let arr02 = new Array();
let arr03 = new Array(3);
console.log(arr01[0])
console.log(arr01.length)
```

### 1.2 增删改查

```js
let arr01 = ['a', 'b', 'c']

arr01[1] = 'y';
arr01.push('d');                   // 尾插
arr01.unshift('z')           // 头插
let pop = arr01.pop();      // 尾删，返回删除的元素
let shift = arr01.shift();   // 头删， 返回删除的元素
```

### 1.3 遍历

```js
let arr = ['red', 'green', 'pink'];

/*for循环*/
for (let i = 0; i < arr.length; i++) {
    console.log(i);
    console.log(arr[i]);
}
```

```js
let arr = ['red', 'green', 'pink'];

/*foreach*/
arr.forEach(function (item, index) {
    console.log(item);
    console.log(index)
});
```

### 1.4 其他

```js
/*1. 反转数组*/
arr01.reverse();
console.log(arr01)
/*2. 判断是否为数组*/
console.log(arr01 instanceof Array)
console.log(Array.isArray(arr01))

/*3. 转换为字符串*/
let str = arr01.toString();
console.log(str)

let res = arr01.join('-');
console.log(res)
console.log(arr01)
```

## 2. 解构

- 将数组的元素快速批量赋值给一些列变量的简洁语法

### 2.1 基本使用

```js
let arr = [1, 4, 5, 7];
let [a, b, c, d] = arr; // 快速解构

console.log(`${a}, ${b}, ${c}, ${d}`);
```

### 2.2 变量少

```js
/*变量少，数组元素多： 则从前向后解析*/
let arr = [1, 4, 5, 7,9];
let [a, b, c, d] = arr;

console.log(`${a}, ${b}, ${c}, ${d}`)
```

```js
/*利用剩余参数来解决： 真数组*/
let arr = [1, 4, 5, 7, 8];
let [a, b, ...other] = arr;

console.log(`${a}, ${b}, ${other}`)
```

### 2.3 变量多

```js
/*变量多，数组元素少： 则后面的为undefined*/
let arr = [1, 4];
let [a, b, c, d] = arr;

console.log(`${a}, ${b}, ${c}, ${d}`)
```

```js
/*利用默认值，防止undefined*/
let arr = [1, 4];
let [a = -1, b = -1, c = -1, d = -1] = arr;

console.log(`${a}, ${b}, ${c},${d}`)
```

### 2.4 占位

- 5不会被解析

```js
let arr = [1, 4, 5, 7];
let [a, b, , d] = arr; // 快速解构

console.log(`${a}, ${b}, ${d}`);
```

# 函数

## 1. 具名函数

- 具名函数的调用，可以在函数声明前或者声明后，都可以调用

```js
/*无参无返回值*/
function work() {
    console.log('work')
}

/*有参无返回值*/
function eat(food) {
    console.log(`吃${food}`)
}

/*无参有返回值*/
function getAge() {
    console.log('get age from db')
    return 20
}

/*有参有返回值*/
function getName(id) {
    return 'erick' + id;
}


/*函数的具体调用*/
work()
eat('apple')
console.log(getAge())
console.log(getName(2))
```

## 2. 匿名函数

### 2.1 函数表达式

- 将匿名函数赋值给一个变量，然后通过变量名来进行调用
- 只能先声明函数，再调用，不能反

```js
/*无参无返回值*/
let work = function () {
    console.log('hello')
}

work()

/*有参无返回值*/
let eat = function (food) {
    console.log(`eat ${food}`)
}

eat('apple')

/*无参有返回值*/
let age = function () {
    return 20
}

let manAge = age();
console.log(manAge)

/*有参有返回值*/
let getSum = function (a, b) {
    return a + b
}

let sum = getSum(10, 20);
console.log(sum)
```

### 2.2 立即执行函数

-  如果函数有返回值，则用立即执行函数，不能获取返回值

```js
/*无参无返回值*/
(function () {
    console.log('hello')
})
();     // 必须用; 分开，第二个()其实就是调用


/*有参无返回值*/
(function (food) {
    console.log(`eat ${food}`)
})
('apple');
```

## 3. 箭头函数

- 是对函数表达式进行的更简短的函数写法
- 并且不绑定this

### 3.1 基本语法

```js
/*1.无参无返回值*/
/*函数表达式*/
let first = function () {
    console.log('erick');
}
/*箭头函数*/
let firstHook = () => {
    console.log('erick hook')
}

first();
firstHook();

/*2. 无参有返回值*/
/*函数表达式*/
let second = function () {
    return 20;
}
/*箭头函数*/
let secondHook = () => {
    return 20;
}

console.log(second())
console.log(secondHook())


/*3. 有参无返回值*/
/*函数表达式*/
let third = function (a, b) {
    console.log(a + b);
}
/*箭头函数*/
let thirdHook = (a, b) => {
    console.log(a + b)
}

third(10, 20);
thirdHook(20, 10);

/*4. 有参有返回值*/
/*函数表达式*/
let four = function (a, b) {
    return a + b;
}
/*箭头函数*/
let fourHook = (a, b) => {
    return a + b;
}

console.log(four(10, 20));
console.log(fourHook(10, 20));
```

### 3.2 省略语法

- 只有一个形参，可以省略小括号

```js
let firstHook = a => {
    a++;
    console.log(a)
}

firstHook(20);
```

- 函数体只有一行代码，可以省大括号

```js
// 代码为单纯的逻辑运算
let firstHook = (a, b) => console.log(a + b);

firstHook(20, 20);

// 代码为返回值
let secondHook = (a, b) => a + b;

console.log(secondHook(20, 20));
```

### 3.3 返回对象

```js
let getInfo = (username, password) => {
    return {
        username: username, password: password
    }
}

console.log(getInfo('admin', '123456'));
```

- 简化版

```js
let getInfo = (username, password) => ({
    username: username, password: password
})

console.log(getInfo('admin', '123456'));
```



## 4. 函数参数

### 4.1 默认值

- 如果调用方没有将需要的参数都传递过来，形参默认是undefined，这样后面运算时就是undefined，类似Java的空指针
- 可以给形参默认值

```js
/*形参的默认值：undefined*/
function getSum(a, b) {
    return a + b;
}

/*结果： NaN*/
console.log(getSum(2))
```

```js
/*形参的默认值：0*/
function getSum(a = 0, b = 0) {
    return a + b;
}

/*结果： NaN*/
console.log(getSum(2))
```

### 4.2 动态参数

- 伪数组
- js内置函数 arguments，只存在于普通函数之中，在箭头函数中没有

```js
function sum() {
    /* [Arguments] { '0': 2, '1': 'erick', '2': 6 } */
    console.log(arguments)
}

sum(2, 'erick', 6);
```

```js
function sum() {
    for (let i = 0; i < arguments.length; i++) {
        // 2 erick 6
        console.log(arguments[i])
    }
}

sum(2, 'erick', 6);
```

### 4.3 剩余参数

- 可变参数是真数组，在普通函数，箭头函数中都有
- 优先使用剩余参数，而不是动态参数

```js
function sum(a, b, ...other) {
    
}

sum(2, 'erick', 6);
```

### a 展开运算符

- 。。。

```js
function sum() {
    const arr = [1, 2, 3, 6, 7];
    console.log(...arr);  // 展开数组 1 2 3 6 7
    console.log(Math.max(...arr))
}

sum();
```

## 5. this指向

- 对于函数中的this，谁调用该函数，谁就是this

### 5.1 普通函数

```html
<script>
    console.log(this);     // window 调用该js

    function say() {
        console.log(this);  // windows 调用该函数
    }

    say();

    let people = {
        name: 'erick',

        work: function () {
            console.log(this) // people
        }
    }

    people.work();
</script>
```

### 5.2 箭头函数

- 箭头函数u不会创建自己的this，它只会从自己的作用域链的上一层沿用this

```js
let say = () => {
    console.log(this); // window,   作用域链上一层，就是window
}
say()

let people = {
    name: 'erick',

    say: () => {
        // 函数内部没this，向上一层找对象的this
        console.log(this) // window
    }
}

people.say();

let nancy = {
    name: 'erick',

    say: function () {
        let a = 10;
        /*嵌套一个箭头函数*/
        let work = () => {
            console.log(this) // obj
        }
        work()
    }
}

nancy.say();
```



# 对象

## 1. 基础

### 1.1 创建

```js
let people = {
    username: 'erick',
    age: 19,
}
```

```js
let people = new Object({username: 'erick', age: 20});
```

### 1.2 属性操作

#### 获取属性

```js
let people = {
    name: 'erick',
}

/*属性有，则是改*/
people.name = 'lucy';
/*属性没有，则是增*/
people.age = 10;
/*删除*/
people.address = 'xian';
delete people.address;

console.log(people) // { name: 'lucy', age: 10 }
```

-  如果属性名因为某些原因，不是驼峰

```js
let people = {
    'user-name': 'erick',
    address: 'xian',
}

console.log(people.address)
console.log(people['address'])
console.log(people["user-name"]) // 如果是非驼峰的字符串，则必须用这种
console.log(people)
```

#### 遍历对象

```js
let people = {
    'user-name': 'erick', address: 'xian', age: 19,
}

for (let key in people) {
    console.log(`${key} = ${people[key]}`)
}
```

### 1.3 对象解构

#### 基本使用

```js
let people = {
    'user-name': 'erick',
    address: 'xian',
    age: 10,
    gender: 'boy',
}

/*对象解构*/
/*1. 属性名和变量名必须一样，否然就是undefined
* 2. 可以对解构的变量名重新命名*/
let {'user-name': userName, address, age, gender: genderEric} = people;

console.log(userName)
console.log(address)
console.log(age);
console.log(genderEric);
```

#### 多级对象

```js
let people = {
    address: 'xian',
    age: 10,
    other: {
        sex: 'boy',
        id: 19,
    }
}

let {address, age, other: {sex, id}} = people;
console.log(sex);
```

#### 部分解构

- 可以在解构的时候，只解构需要的数据

```js
let people = {
    address: 'xian',
    age: 10,
    other: {
        sex: 'boy',
        id: 19,
    }
}

let {address} = people;
console.log(address);
```

## 2. 构造函数

- 也是一种创建对象的方式

### 2.1 实例属性/方法

- 公共的属性和方法，可以封装在构造函数中
- 封装的方法，存在浪费内存问题，不同的对象new出来后，所指向的方法，都是一个单独的内存，不能复用

```js
function People(username, address) {
    this.username = username;
    this.address = address;
    /*匿名函数， 具名函数， 箭头函数 都可以放*/
    this.sayHello = function () {
        console.log('hello')
    }
}

let people = new People('erick', 'xian'); // 使用new关键字调用函数

people.sayHello();
```

### 2.2 静态属性/方法

- 只能通过类名调用，不能通过实例调用

```js
function People(username, address) {
    this.username = username;
    this.address = address;
    this.workHard = function work() {
        console.log('work hard');
    }
}

/*定义静态方法*/
People.staticMethod = function () {
    console.log('静态方法')
}

/*定义静态成员*/
People.info = '静态属性'

let people = new People('erick', 'xian'); // 使用new关键字调用函数

console.log(people.info); // undefined， 不能通过实例调用
console.log(People.info);
People.staticMethod()
```
