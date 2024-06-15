# 基本语法

## 1. 安装

- 微软开发

```bash
1. 下载node.js
2. 安装typescript:    npm i -g typescript        # ts解析器

#  ts文件后缀为 .ts文件,    .ts文件不能直接被浏览器进行执行，需要转换为js
#  使用 tsc 文件名   将ts编译为js
```

## 2. 入门案例

### 2.1 使用方式

- 一般对变量，如果声明后直接赋值，可以不指定类型，因为ts文件会默认进行类型推荐

```ts
/*1. 先声明后赋值*/
let info: string;
info = 'haha';

/*2. 声明后直接赋值*/
let flag: boolean = false;
let age: number = 12;

/*3. 类型推断: 先赋值，不声明类型，就会产生类型推断： 推荐！！！
    因为是在ts文件中，所以第一次赋值后，就会对该变量产生类型推荐，后续不能再次重新赋值其他类型的*/
let isEnabled = false;

/* 就会报错，因为是ts文件*/
isEnabled = 'erick';
```

### 2.2 函数

- 对函数作用更大，因为函数的形参和返回值肯定是先声明，后使用

```ts
/*4. 类型声明：对函数作用更大*/
function sum01(a, b) {
    return a + b;
}

console.log(sum01(1, 2));

function sum02(a: number, b: number) {
    return a + b;
}

console.log(sum02(1, 4));
```

```bash
# 编译
- 进入该文件目录，执行  tsc erick.ts 
- 会在当前文件夹，产生一个新的同名的js文件

# 执行， 不能直接执行 node erick.ts
- node erick.js
```

![image-20240610144220564](https://erick-typora-image.oss-cn-shanghai.aliyuncs.com/img/image-20240610144220564.png)

![image-20240610144349290](https://erick-typora-image.oss-cn-shanghai.aliyuncs.com/img/image-20240610144349290.png)

## 3. 变量数据类型

### number/boolean/string

```ts
let a: number = 19;
let b: boolean = false;
let c: string = 'erick';
```

### 联合类型

- 一个变量为多种类型中的一个

```ts
let mixed: string | number | boolean;

mixed = 'test';
console.log(mixed)
mixed = 10;
console.log(mixed)
mixed = false;
console.log(mixed)
```

### 字面量

- 一般用来定义枚举类型的

```ts
/*1. 定义a为常量，
  2. 常量的值为10
  3. 值不能修改*/
let a: 10;

a = 10;
console.log(a)
```

```js
/*定义一个枚举类型的字面量, 或*/
let fruit: "apple" | "peach" | boolean;

// 后续可以赋值为声明的所有的值
fruit = "apple";
console.log(fruit);

fruit = "peach";
console.log(fruit);

fruit = false;
console.log(fruit);

// fruit = "water";  就会编译报错
```

### any

- 相当于关闭了ts类型检测，不建议使用
- any的变量可以赋值给其他任何变量，哪怕转换失败也不会报错

```ts
// 显式声明
let a: any = false;
console.log(a);
a = 'nice';
console.log(a);

/*nice值赋值给了boolean，不会报错*/
let b: boolean = a;
console.log(b)
```

```ts
// 先声明变量，但不指定类型，后赋值的变量：    ts会默认给一个any属性
let a;
a = 1;
a = 'hello';
```

### unknown

- 任意类型，但是是一个类型安全的any
- unknown 只能自己变化类型，不能赋值给任何其他显示声明的类型(编译错误)
- 如果要将unknown  赋值给其他的，可以通过下面两种方式

```ts
let a: unknown;
/*1.可以自己变换类型*/
a = true;
console.log(a);
a = 'haha';
console.log(a)
```

```ts
let a: unknown;
a = 'erick';

/*赋值给其他声明了类型的*/
let b: number;

// b = a; 编译错误

/* 转化的时候进行类型检查*/
if (typeof a === "number") {
    b = a;
    console.log(b)
}
```

### void

- 函数返回值类型

```ts
function fn01(): void {
    /*三种写法都可*/
    return;
    //return null;
    //return undefined;
}
```

### never

- 不会有返回值结果，用于专门来抛出异常的方法

```ts
function say(flag: boolean): void {
    if (!flag) {
        fn03();
    } else {
        console.log('hi');
    }
}

/*异常的处理*/
function fn03(): never {
    throw new Error("failure");
}

say(false);
```

### 数组

- js中默认数组中元素可以存放不同类型数据

```ts
/*声明数组变量的两种方式*/
let arr1: string[];
let arr2: Array<number>;

arr1.push("erick");
arr2.push(2);
// arr1.push(true); 报错
```

### 元组

- 固定长度的数组，相比js，ts新加入的数据类型

```ts
let arr: [string, number, boolean];
/*元组在赋值时候，个数和类型必须严格和声明时候一样*/
arr = ['df', 12, true];
console.log(arr)
```

### 枚举

```ts
/*定义一个枚举*/
enum Gender {
    MALE,
    FEMALE
}

/*类型声明*/
let mySex: Gender;
/*类型赋值*/
mySex = Gender.FEMALE;
console.log(mySex) // 1
```

## 4. 对象类型

- 可以先声明变量为一个对象类型，并定义对象中的属性。后面为变量赋值

### 严格匹配

- 在赋值的时候，不能多，不能少，严格一致

```ts
/*  变量声明
* 1. 定义一个名字为person的变量
* 2. 该变量的类型限制为一个对象
* 3. 对象中所有属性都必须给*/
let person: {
    name: string,
    address: string,
    age: number
}

/* 变量赋值
* 少一个属性，都会报错*/
person = {
    name: 'erick',
    address: 'beijing',
    age: 10
}

console.log(person);
```

### 可选属性

```ts
/*  变量声明
* 1. 定义一个名字为person的变量
* 2. 该变量的类型限制为一个对象*/
let person: {
    name: string,
    address?: string
    age: number
}

/* 变量赋值*/
person = {
    name: 'erick',
    address: 'beijing',
    age: 10
}

console.log(person);

person = {
    name: 'nancy',
    age: 12
}
console.log(person);
```

### 多余属性

```ts
/*  变量声明
* 1. 定义一个名字为person的变量
* 2. 该变量的类型限制为一个对象
* 3. 允许传递多余的属性，属性名为string，属性value为any*/
let person: {
    name: string,
    [fieldName: string]: any;
}

/* 变量赋值*/
person = {
    name: 'erick',
    address: 'beijing',
    age: 10
}
```

### 解构赋值

- 可以正常使用解构赋值

```ts
let person: {
    userName: string,
    address: string,
    age: number
}

person = {
    userName: 'erick',
    address: 'beijing',
    age: 10
}

let {userName, address, age} = person;
console.log(userName);
console.log(address);
console.log(age)
```

## 5. 函数类型

```ts
/*定义一个函数的结构，定义函数参数类型，返回值类型*/
let say: (address: string, age: number) => string;

/*实际声明函数的实现*/
say = function (address: string, age: number) {
    return address + age;
}
```

# 编译模式

## 1. 单个文件
- tsc demo01.ts -w        热更新编译
- tsc        单次编译
```typescript
/* 1. tsc demo01.ts -w    :  监视文件，发生变化后重新编译
*       1.1 命令行进行监视：只能监视一个文件，多个文件要开多个窗口
*       1.2 关闭窗口后，监视就会中止*/
console.log("haha");
console.log("nihao");
```

## 2. 批量编译

- 在项目根目录下，创建tsconfig.json文件
- 进入项目目录，执行tsc，就会编译所有的ts文件为js文件
- 会有默认的一些编译参数
- tsc -w，也会自动进行热编译

![image-20240611112021830](https://erick-typora-image.oss-cn-shanghai.aliyuncs.com/img/image-20240611112021830.png)

## 3. 参数配置

```json
{
  /*编译的详细参数*/
  "compilerOptions": {
    /*模块化规范: commonJs， ES6*/
    "module": "ES6",
    /*编译后的js的版本， 默认是ES3*/
    "target": "ES6",
    /*"lib": []   ts中引入的js的内置的库，如DOM，在写ts代码时，会有提示
                  一般不写，会有默认值
                  一旦写上，就会替换 */

    /*编译后的 js 文件的存放位置, 会自动在当前文件夹创建dist文件夹*/
    "outDir": "./dist",
    /*是否编译js文件: 默认false, 设计到文件的移动 文件从 src 移动到 dist中*/
    "allowJs": false,
    /*是否用ts的规范去检测js文件: 默认false*/
    "checkJs": false,
    /*是否在js文件中包含注释， 默认false*/
    "removeComments": false,
    /*当ts有语法错误时，不会生成js*/
    "noEmitOnError": true,
    /*是否开启js的严格模式： 严格模式性能更好， 会在生成的js文件中，带上 "use strict" 的头*/
    "alwaysStrict": true,
    /*不允许隐式的 any类型，也就是隐式的不定义类型*/
    "noImplicitAny": true,
    /*严格检查空值*/
    "strictNullChecks": true,
    /*所有严格检查的总开关*/
    "strict": true
  },
  /*哪些文件不需要编译
   默认值：["node_modules", "bower_components","jspm_packages"]*/
  "exclude": [
  ],
  /*哪些文件需要实时编译
        两个*： 任意目录
        一个*： 任意文件
   */
  "include": [
    "./src/**/*"
  ]
}
```

# 面向对象

## 1. 定义对象

### 1.1 别名定义

```ts
type User = {
  id: number;
  name: string;
  isActive: boolean;
};
 
// 使用类型别名定义对象
const user: User = {
  id: 1,
  name: 'Alice',
  isActive: true
};
```

### 1.2 interface定义

```ts
interface User {
  id: number;
  name: string;
  isActive: boolean;
}
 
// 使用接口定义对象
const user: User = {
  id: 1,
  name: 'Alice',
  isActive: true
};
```



### 1. 变量和方法
- 成员变量
- 成员静态变量
- 成员方法
- 成员静态方法

```typescript
/*成员变量和成员方法*/
class Person {
    name: string = "erick";
    static readonly age: number = 10;

    say(info: string) {
        console.log(info);
    }

    static work(hour: number) {
        console.log("people work time:" + hour);
    }
}

const person = new Person();
console.log(person.name);
console.log(Person.age);
person.say('hello');
Person.work(4);
```
### 2. this 和 constructor

```typescript
/**/
class Student {
    name: string;
    age: number;

    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }

    say() {
        alert(this.name);
    }

    work() {
        console.log(this);
    }
}

const student = new Student('erick', 10);
student.say();
student.work();
```
### 3. 继承
- 继承
- super
- 重写
- 重载

### 4. 抽象
- 抽象类： abstract
- 接口：interface

### 5. 封装
```typescript
// 属性方法，和java稍微不一样
get name(){ return this.name};
set name(name: string){ this.name = name);
```
### 6.  泛型

```typescript
function say<T extends Inter>(a: T): T {};
```