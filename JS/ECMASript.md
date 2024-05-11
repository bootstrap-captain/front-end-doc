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

## 3. 垃圾回收机制

# 语法

## 1. 数组

```javascript
/*1. 创建数组*/
let arr01 = ['a','b','c']
let arr02 = new Array();
let arr03 = new Array(3);
console.log(arr01[0])
console.log(arr01.length)

/*2. 反转数组*/
arr01.reverse();
console.log(arr01)

/*3. 增删改插入*/
arr01.push('d')                    // 尾插
arr01.unshift('z')           // 头插
let pop = arr01.pop();      // 尾删，返回删除的元素
console.log(pop)
let shift = arr01.shift();   // 头删， 返回删除的元素


/*4. 判断是否为数组*/
console.log(arr01 instanceof Array)
console.log(Array.isArray(arr01))

/*5. 转换为字符串*/
let str = arr01.toString();
console.log(str)

let res = arr01.join('-');
console.log(res)
console.log(arr01)
```

## 2. 数据类型

- 弱类型语言：只有在程序运行时，根据具体的赋值结果，才会进行类型划分
- 动态类型：变量的数据类型是可以变化的
- 分为基本数据类型和引用数据类型

```js
let info = 'erick'
console.log(typeof info)    // 得到具体的类型数据
```

### 2.1 number

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

### 2.2 string

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

### 2.3 boolean

- 可参与加法运算， true为1，false为0

### 2.4 undefined

- 声明了变量，但是没有赋值，默认值就是undefined

```js
let name
console.log(typeof name)
```

### 2.5 null

- 声明了变量，赋值了，但是赋值为null

```js
let name = null
console.log(name)          // null
console.log(typeof name)   // object，本身就是一个js的内置对象
```

### 2.6 object

- 数组就是引用数据类型object

```js
let arr = [1,4,6,8]
console.log(typeof arr) // object
```

## 3. 类型转换

### 3.1 转换为string

```js
let age = 10

let age1 = age + ''
let age2 = String(age)
let age3 = age.toString()

console.log(typeof age1 + typeof age2 + typeof age3)
```

### 3.2 转换为number

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

### 3.3 转换为boolean

```js
let flag = Boolean('1')
console.log(flag)
console.log(typeof flag)
```

## 4. 运算符

- ==单纯比较值是否相等
- ===是比较值和类型是否相等

```js
let age = 19
let age1 = '19'

console.log(age == age1)   // true
console.log(age === age1)  // false
```

# 函数

## 1. 具名函数

- 具名函数的调用，可以在函数声明前或者声明后，都可以调用

### 1.1 基本使用

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

### 1.2 默认值

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

# 类

- Object

## 1. 创建

### 1.1 直接创建

```js
let people = {
    name: 'erick',
    age: 19,
    hobby: ['basketball', 'swim'],

    // 匿名方法
    /*无参无返回值*/
    work: function () {
        console.log('learning js')
    },

    /*无参有返回值*/
    getAge: function () {
        return 20;
    },

    /*有参无返回值*/
    getInfo: function (height) {
        console.log(height)
    },

    /*有参有返回值*/
    getSum: function (a, b) {
        return a + b;
    }
}

console.log(people.age)
people.work()
console.log(people.getAge())
people.getInfo('hehe')
console.log(people.getSum(10, 20))
console.log(typeof people) // object
```

### 1.2 new Object

```js
let people = new Object();
people.name = 'erick';
people.age = 19;
people.hobby = ['basketball', 'swim'];

/*无参无返回值*/
people.work = function () {
    console.log('learning js')
}
/*无参有返回值*/
people.getAge = function () {
    return 20;
}

/*有参无返回值*/
people.getInfo = function (height) {
    console.log(height)
}

/*有参有返回值*/
people.getSum = function (a, b) {
    return a + b;
}

console.log(people.age)
people.work()
console.log(people.getAge())
people.getInfo('hehe')
console.log(people.getSum(10, 20))
console.log(typeof people) // object
```

## 2. 属性操作

### 2.1 获取属性

```js
let people = {
    name: 'erick',
}

/*属性有，则是该*/
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

### 2.2 遍历对象

```js
let people = {
    'user-name': 'erick', address: 'xian', age: 19,
}

for (let key in people) {
    console.log(`${key} = ${people[key]}`)
}
```

