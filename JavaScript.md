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

## 5. 变量

```js
 <script>
    // 先声明再赋值，也可一步到位
    // 获取到用户输入的信息
      let name = prompt('please input name');
      alert(name);
  </script>
```

```js
<script>
    /*声明多个变量*/
    let name = 'erick';
    age = 10;
    address = 'shanxi';

    console.log(name + age + address);
</script>
```

```js
<script>
    /*只声明，不赋值： undefined*/
    let sex;
    console.log(sex)

    /*无此变量： Uncaught ReferenceError: region is not defined
    * 后面的内部不再渲染*/
    /* console.log(region)*/

    /*不声明直接赋值，也是可以使用*/
    name = 'nike';
    console.log(name)
</script>
```

## 6. 常量

- 常量的值不能改变，声明的时候必须赋值

```js
const age = 19
```

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