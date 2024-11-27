# 搭建环境

[Angular Cli依赖](https://www.npmjs.com/package/@angular/cli?activeTab=versions)

- Angular Cli的版本，决定了通过该脚手架搭建的Angular的project的版本

```bash
# 1. 安装Angular CLI
sudo npm install -g @angular/cli@19.0.0

# 2. 创建项目: 不要用sudo来创建项目，不然文件就只是可读
# 创建好之后，本地依赖安装完成，删除.vscode文件
 ng new replay-ui-service

# 3. 进入项目
cd replay-ui-service

# 4. 安装开发者工具
npm install @angular-devkit/build-angular --save-dev 

# 5. 开启热更新启动项目
ng serve --open
ng serve 
```

# 组件

- 组件就是ts形式的class类，对应的html，css和测试的ts

## 1. 创建组件

### Angular Cli

- 比较推荐的方式

```bash
# 进入对应的文件目录
# ng generate component home
# ng g component home

- 一个以该组件命名的文件夹
- 一个组件文件 <component-name>.component.ts
- 一个模板文件 <component-name>.component.html
- 一个 CSS 文件，<component-name>.component.css
```

#### home.component.ts

```ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-home', /*在html中，可以用该名称来实例化该组件*/
  standalone: true,
  imports: [],
  templateUrl: './home.component.html', /*对应的html，两种方式: templateUrl或者template*/
  styleUrl: './home.component.css'   /*对应的css，两种方式：styleUrl或者style，默认组件的样式仅影响该组件模版定义的元素*/
})
export class HomeComponent {

}
```

## 2. 使用组件

- 会为每个遇到的组件创建组件一个实例对象

### 2.1 独立组件

- 一个独立组件，是在组件元数据中设置 standalone: true, 官方推荐，新开发的项目都使用独立组件

#### app.component.ts

```ts
import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {HomeComponent} from "../home/home.component"; /*在该组件导入到对应的html后，就会添加该依赖*/

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HomeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

}
```

#### app.component.html

```html
<h2>hello</h2>

<!--使用独立组件-->
<app-home></app-home>
```

## 3. 输入属性

- 将特定属性标记为可绑定，该带有输入属性的组件，可以从起父元素的html中进行获取到对应的值

### home.component.ts

```ts
import {Component, Input} from '@angular/core';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  /*1.输入的值*/
  @Input() value = 0;

  /*2. 自定义输入类型*/
  @Input() person: Person = {
    name: '',
    age: 0,
  }

  /*3. 属性必选: 上面的可以不给值，不会报错*/
  @Input({required: true}) address = '';

  /*4. 输入转换：transform函数来处理,必须是纯函数*/
  @Input({transform: toUpperCase}) label = '';

  /*5. 输入别名*/
  @Input({alias: 'erickName'}) myName = '';
}

/*外部的纯函数*/
function toUpperCase(value: string) {
  return value.toUpperCase();
}

export type Person = {
  name: string,
  age: number,
}
```

```html
<p>{{ value }}</p>
<p>{{ person.name }}==={{ person.age }}</p>
<p>{{ address }}</p>
<p>{{ label }}</p>
<p>{{ myName }}</p>
```

### app.component.html

```html
<h2>hello</h2>

<!--使用组件: 传递值，[]注意用法
 address：直接传递一个static的值
 [value]: 可以传递一个该父组件的值-->
<app-home [value]="60"
          [person]="{name:'erick',age:18}"
          address="beijing"
          label="sfsdf"
          erickName="shuzhan"
></app-home>
```

## 4. 输出属性-子传数据给父 & 子调父方法

- 通过将属性赋值为新的 EventEmitter 并添加@Output装饰器来定义自定义事件

```bash
# 场景一：子传数据给父
emit的时候可以传递具体的数据

# 场景二：子调用父的方法
```

### 子

```ts
import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  /*1. 指定要发射出去的数据类型*/
  @Output() nameEvent: EventEmitter<string> = new EventEmitter();

  /*2. 发射自定义的数据类型*/
  @Output() phoneEvent: EventEmitter<Phone> = new EventEmitter();

  /*3. 子调用父的方法*/
  @Output() childSayEvent: EventEmitter<void> = new EventEmitter();

  childNameChange = (name: string) => {
    this.nameEvent.emit(name);
  }

  childPhoneChange = (brand: string, price: number) => {
    this.phoneEvent.emit({brand: brand, price: price})
  }

  childSay = () => {
    this.childSayEvent.emit();
  }
}

export type Phone = {
  brand: string,
  price: number,
}
```

```html
<!--发射普通对象-->
<button (click)="childNameChange('hello')">发射普通数据</button><br/>

<!--发射自定义对象-->
<button (click)="childPhoneChange('iphone',5999)">发射自定义数据</button><br/>

<!--子调用父的方法-->
<button (click)="childSay()">子调用父的方法</button>
```

### 父

```html
<h2>hello</h2>
<app-cart (nameEvent)="fatherName($event)"
          (phoneEvent)="fatherPhone($event)"
          (childSayEvent)="fatherSay()"
></app-cart>
```

```ts
import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {CartComponent, Phone} from "../cart/cart.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CartComponent,],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  /*event: 发射出去的数据类型*/
  fatherName = (event: string) => {
    console.log('string类型的', event);
  }

  fatherPhone = (event: Phone) => {
    console.log('phone类型的', event)
  }

  fatherSay = () => {
    console.log('parent say hello');
  }
}
```

## 5. 生命周期





## 2. 父传子

- 父组件将自己的属性，传递给子组件用于展示

### 2.1 输入绑定

- 父组件传入到子组件的数据，父组件的数据发生变化后，子组件会重新渲染

#### 父

```ts
import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {ChildComponent} from "../child/child.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ChildComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  /*父组件的属性*/
  parentTimes: number = 1;

  addParentTimes = () => {
    this.parentTimes++;
  }
}
```

```html
<div>我是父组件{{ parentTimes }}</div>

<button (click)="addParentTimes()">父组件数据变化</button>
<!--子组件事件的响应方式-->
<app-child [parentTimes]="parentTimes"></app-child>
```

#### 子

```ts
import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-child',
  standalone: true,
  imports: [],
  templateUrl: './child.component.html',
  styleUrl: './child.component.css'
})
export class ChildComponent {
  /*从父组件接收收据*/
  @Input() parentTimes: number = -1;
}
```

```html
<div>我是子组件{{ parentTimes }}</div>
```

### 2.2 getter/setter

#### 子

```ts
import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-child',
  standalone: true,
  imports: [],
  templateUrl: './child.component.html',
  styleUrl: './child.component.css'
})
export class ChildComponent {
  /*接收父组件的传递值*/
  @Input()
  get slaveName(): string {
    return this._slaveName;
  }

  set slaveName(slaveName: string) {
    this._slaveName = slaveName.toUpperCase();
  }

  private _slaveName = '';
  @Input() masterName = '';
}
```

```html
<h3>
  <!--是slaveName，而不是 _salveName¬-->
  {{ slaveName }} says: I, {{ slaveName }}, at your service, {{ masterName }}
</h3>
```

### 2.3 ngOnChanges()监听

- Angular的生命周期钩子

####  父

```ts
import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {ChildComponent} from "./child/child.component";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ChildComponent, NgForOf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  /*父组件的属性*/
  major = 1;
  minor = 23;

  addMinor = () => {
    this.minor++;
  }

  addMajor = () => {
    this.major++;
  }
}
```

```html
<h2>Parent Source Version</h2>
<button type="button" (click)="addMajor()">Major加</button><br/>
<button type="button" (click)="addMinor()">Minor加</button><br/>

<app-child [major]="major" [minor]="minor"></app-child>
<router-outlet/>
```

#### 子

```ts
import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-child',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './child.component.html',
  styleUrl: './child.component.css'
})
export class ChildComponent implements OnChanges {
  /*接收父组件的传递值*/
  @Input() major = 0;
  @Input() minor = 0;

  /*子组件自己的值*/
  changeLogs: string[] = [];

  /*监听父组件传递过来的值
  * 1. 组件首次加载时，调用一次
  * 2. 后续父组件每次改变任意属性，也会调用一次
  * 3. 改变了几个属性，SimpleChanges就会有几个对象*/
  ngOnChanges(changes: SimpleChanges): void {
    const logs: string[] = [];
    for (const propName in changes) {
      console.log(propName) // 属性名
      const propEntity = changes[propName];
      console.log(propEntity); //属性具体的值： SimpleChange {previousValue: undefined, currentValue: 1, firstChange: true}

      if (propEntity.isFirstChange()) {/*第一次加载时候的*/
        logs.push(`Initial value of ${propName} set to ${propEntity.currentValue}`);
      } else {
        logs.push(`${propName} changed from ${propEntity.previousValue} to ${propEntity.currentValue}`);
      }
    }

    this.changeLogs.push(...logs);
  }
}
```

```html
<h3> Version:{{ major }}.{{ minor }}</h3>
<h4>Change Logs:</h4>
<ul>
  <li *ngFor="let log of changeLogs">{{ log }}</li>
</ul>
```

## 3. 子传父

- 子组件作为事件源，父组件绑定到该事件属性，做出回应
- 父组件可以定义一个数据，子组件通过事件属性，来修改父组件的值
- 子组件数据变化了，父组件会跟着渲染

### 子

```ts
import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-child',
  standalone: true,
  imports: [],
  templateUrl: './child.component.html',
  styleUrl: './child.component.css'
})
export class ChildComponent {

  /*暴露出去的某个对象数据*/
  @Output() childAgeEvent: EventEmitter<ChildAge> = new EventEmitter();

  public firstChildAge = 6;
  public secondChildAge = 16;
  public thirdChildAge = 26;

  updateAge = () => {
    this.firstChildAge++;
    this.secondChildAge++;
    this.thirdChildAge++;

    const childAge = {
      firstChildAge: this.firstChildAge,
      secondChildAge: this.secondChildAge,
      thirdChildAge: this.thirdChildAge
    }
     // 发送事件
    this.childAgeEvent.emit(childAge);
  }
}

export interface ChildAge {
  firstChildAge: number,
  secondChildAge: number,
  thirdChildAge: number
}
```

```html
<div>子组件的第一个孩子{{ firstChildAge }}</div>
<div>子组件的第一个孩子{{ secondChildAge }}</div>
<div>子组件的第一个孩子{{ thirdChildAge }}</div>

<button (click)="updateAge()">一年过去了</button>
```

### 父

```html
<div>我第一个孙子{{ first }}</div>
<div>我第二个孙子{{ second }}</div>
<div>我第三个孙子{{ third }}</div>
<!--子组件事件的响应方式-->
<app-child (childAgeEvent)="parentReceiveEvent($event)"></app-child>
```

```ts
import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {ChildAge, ChildComponent} from "../child/child.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ChildComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  /*父组件的属性*/
  public first: number = -1;
  public second: number = -1;
  public third: number = -1;

  /*接收数据的具体类型*/
  parentReceiveEvent = (childAge: ChildAge) => {
    this.first = childAge.firstChildAge;
    this.second = childAge.secondChildAge;
    this.third = childAge.thirdChildAge;
  }
}
```

## 4. 父调用子的方法和属性

- 父组件不能使用数据绑定来读取子组件的属性或调用子组件的方法
- 但在子组件中模版中，新建一个本地变量来代表子组件，然后利用这个变量来读取子组件的属性和方法调用
- 本地变量简单明了，但是父子组件的链接，必须全部在父组件的模版中进行
- 父组件的ts代码中，没有办法去访问子组件

### 子

```ts
import {Component} from '@angular/core';
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-child',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './child.component.html',
  styleUrl: './child.component.css'
})
export class ChildComponent {
  name = 'erick';
  address = '';

  sayName = () => {
    console.log('son name:', this.name);
  }

  changeAddress = (address: string) => {
    this.address = address;
  }
}
```

```html
<h2>子组件name：{{ name }}</h2>
<h2>子组件地址：{{ address }}</h2>
```

### 父

```ts
import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {ChildComponent} from "./child/child.component";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ChildComponent, NgForOf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
}
```

```html
<button type="button" (click)="child.sayName()">说出名字</button>
<button type="button" (click)="child.changeAddress('北京')">改变地址</button>

<h2>父组件{{ child.name }}</h2>
<h2>父组件{{ child.address }}</h2>

<!--将子组件用一个child的变量接收-->
<app-child #child></app-child>

<router-outlet/>
```

## 5. 父组件调用@ViewChild

### 子

```ts
import {Component} from '@angular/core';
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-child',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './child.component.html',
  styleUrl: './child.component.css'
})
export class ChildComponent {
  name = 'erick';
  address = '';

  sayName = () => {
    console.log('son name:', this.name);
  }

  changeAddress = (address: string) => {
    this.address = address;
  }
}
```

```html
<h2>子组件name：{{ name }}</h2>
<h2>子组件地址：{{ address }}</h2>
```

### 父

```ts
import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {ChildComponent} from "./child/child.component";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ChildComponent, NgForOf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements AfterViewInit {

  /*注入子组件*/
  @ViewChild(ChildComponent)
  /*  !:   非空断言*/
  private childComponent!: ChildComponent;

  name() {
    return ''
  };

  parentAddress = "北京";

  /*调用子类的方法*/
  parentSay() {
    this.childComponent.sayName();
  }

  parentChangeAddress(address: string) {
    this.childComponent.changeAddress(address);
  }

  /*父组件渲染完毕后才能访问*/
  ngAfterViewInit(): void {
    this.name = () => this.childComponent.name
  }
}
```

```html
<button type="button" (click)="parentSay()">说出名字</button>
<button type="button" (click)="parentChangeAddress(parentAddress)">改变地址</button>

<h2>父组件{{ name() }}</h2>

<!--将子组件用一个child的变量接收-->
<app-child></app-child>

<router-outlet/>
```

# 模版

## 1. 文本插值

```ts
import {Component} from '@angular/core';

@Component({
  selector: 'app-apple',
  standalone: true,
  imports: [],
  templateUrl: './apple.component.html',
  styleUrl: './apple.component.css'
})
export class AppleComponent {
  public name: string = 'erick';
  address: string = 'beijing';
}
```

```html
<!--文本插值-->
<p>{{ name }}</p>
<p>{{ address }}</p>
```

## 2. 模版语句

```html
<!--1 直接传值-->
<button (click)="delete('12')">箭头函数-带参-直接给</button><br/>
<!--2 传递ts中的变量-->
<button (click)="delete(id)">箭头函数-带参-变量</button><br/>

<button (click)="say('shuzhan')">普通函数-带参-直接给</button><br/>
<button (click)="say(name)">普通函数-带参-变量</button><br/>

<button (click)="work()">无参</button><br/>
```

```ts
import {Component} from '@angular/core';

@Component({
  selector: 'app-apple',
  standalone: true,
  imports: [],
  templateUrl: './apple.component.html',
  styleUrl: './apple.component.css'
})
export class AppleComponent {
  id: string = '123';
  name: string = 'erick';

  /*1. 箭头函数*/
  delete = (id: string) => {
    console.log(id)
  }

  /*2. 普通函数和箭头函数没区别*/
  say(name: string) {
    console.log(name);
  }

  work() {
    console.log('working');
  }
}
```

## 3. Property绑定

```html
<!--加[], 后面的属性就当作变量来解析，在对应的ts文件中，去找对应的变量-->
<img alt="item" [title]="erickTitle">

<!--不加[], 后面的属性就当作字符串来解析-->
<img alt="item" title="erickTitle">

<!--组件传递中可以使用,作用同理-->
<app-child [name]="erickName"></app-child>
```

## 4. 双向绑定

- 共享数据的方式，使用双向绑定，来监听事件，并在父组件和子组件中同步更新值
- 子组件更改了数据，父组件能及时的获取到更新后的最新值
- 父组件提供初始化值，并在父组件中使用。子组件来更新该值，并在子组件中可以使用，更新后会同步到父组件中

### 子

```ts
import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-brand',
  standalone: true,
  imports: [],
  templateUrl: './brand.component.html',
  styleUrl: './brand.component.css'
})
export class BrandComponent {

  /*初始数据从父获取到*/
  @Input() number = 0;

  /*子改变了数据后，可以同步到父组件*/
  @Output() numberChange: EventEmitter<number> = new EventEmitter();

  incr() {
    this.number++;
    this.numberChange.emit(this.number);
  }

  desc() {
    this.number--;
    this.numberChange.emit(this.number);
  }
}
```

```html
<button (click)="incr()">+</button><br/>
<button (click)="desc()">-</button><br/>
<p>儿子{{ number }}</p>
```

### 父

```ts
import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {BrandComponent} from "../brand/brand.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, BrandComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  /*提供初始值*/
  fatherNumber = 20;
}
```

```html
<p>父亲{{ fatherNumber }}</p>
<!--双向绑定缩写-->
<app-brand [(number)]="fatherNumber"></app-brand>
```

```html
<p>父亲{{ fatherNumber }}</p>
<!--双向绑定的展开写法-->
<app-brand [number]="fatherNumber" (numberChange)="fatherNumber=$event"></app-brand>
```

## 5. 模版引用变量

- 作用范围：声明他们的模版中

### 3.1 标准HTML上

- 如果作用在标准的HTML元素上，该变量就会引用该HTML元素

```html
<!--#Phone：代表该Input结点-->
<input type="text" #phone>
<button (click)="collectionInfo(phone.value)">收集信息</button>

<router-outlet/>
```

```ts
import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {ChildComponent} from "./child/child.component";
import {NgForOf, NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ChildComponent, NgForOf, NgOptimizedImage],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  phone: string = '';

  collectionInfo(name: string) {
    this.phone = name;
    console.log(this.phone);
  }
}
```

### 3.2 组件上

- 如果在组件上声明变量，该变量就会引用该组件元素
- 可以在该模版内，调用被声明的组件的方法和属性

```html
<app-child #child></app-child>
```

### 3.3 



# 指令

## 1. 内置指令

### 1.1 ngIf

- 用来向宿主元素田间或删除元素
- 为true时候，会加载该组件。为false时，将该组件及其所有子组件从DOM中移除，从而释放内存和资源

#### 组件

```html
<button (click)="changeFlag()">切换显示子组件</button>

<app-child *ngIf="isChildValid"></app-child>
<router-outlet/>
```

```ts
import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {NgIf} from "@angular/common";
import {ChildComponent} from "./child/child.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgIf, ChildComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  isChildValid = true;

  changeFlag() {
    this.isChildValid = !this.isChildValid;
  }
}
```

#### HTML元素

```html
<button (click)="changeFlag()">切换显示子组件</button>

<div *ngIf="isValid">你好</div>
<router-outlet/>
```

```ts
import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {NgIf} from "@angular/common";
import {ChildComponent} from "./child/child.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgIf, ChildComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  isValid = true;

  changeFlag() {
    this.isValid = !this.isValid;
  }
}
```

### 1.2 ngFor

- 动态生成html的数据

#### 组件

- 可以用来多次渲染某个子组件

```html
<!--将fruit传递给子组件-->
<app-child *ngFor="let fruit of fruits" [fruit]="fruit"></app-child>
<router-outlet/>
```

```ts
import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {NgForOf, NgIf} from "@angular/common";
import {ChildComponent} from "./child/child.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgIf, ChildComponent, NgForOf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  fruits: string[] = ["apple", "peach", "lemon"];
}
```

```ts
import {Component, Input} from '@angular/core';
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-child',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './child.component.html',
  styleUrl: './child.component.css'
})
export class ChildComponent {
  @Input() fruit: string = '';
}
```

#### HTML元素

```html
<!--获取到对应的元素和索引-->
<div *ngFor="let fruit of fruits; let i = index">{{ i }}==={{ fruit }}</div>
<router-outlet/>
```

```ts
import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {NgForOf, NgIf} from "@angular/common";
import {ChildComponent} from "./child/child.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgIf, ChildComponent, NgForOf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  fruits: string[] = ["apple", "peach", "lemon"];
}
```

# DI

## 1. 基本使用

- service：用来执行特定功能的一个class，用@Injectable()来标注
- component：UI对应的组件对应的数据，专注为对应的html服务。可以将具体的任务下放到serivce中，实现代码分离

### service

- 提供特定功能的，需要被注入的类
- service中可以继续去依赖其他的service
- service最好放在单独的包中

```bash
# 创建一个名字为api.service.ts的文件，一般是以service结尾
ng generate service api
ng g service api

# 在/src/app目录下，在对应的cart包中，创建一个service
ng g service cart/phone

# 默认root级别，可以调整
```

```ts
import {Injectable} from '@angular/core';

@Injectable({
  /*整个应用级别的*/
  providedIn: 'root'
})
export class ApiService {

  /*也可以注入其他类型的Service*/
  constructor() {
  }

  /*提供特定功能*/
  say() {
    console.log('hello');
  }
}
```

### component

- 使用定义好的依赖，一般是以component结尾
- component可以注入多个不同的service

```ts
import {Component} from '@angular/core';
import {ApiService} from "../api.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [],
  templateUrl: './app.component.html',
  styleUrl:
    './app.component.css'
})

export class AppComponent {

  /*注入*/
  constructor(private apiService: ApiService) {
  }

  /*使用*/
  use() {
    this.apiService.say();
  }
}
```

### registry

- 连接service的提供方和消费方的桥梁，类似spring中的容器

## 2. 作用域

### Root Level

- service在整个应用中可以直接使用
- 只有一个实例对象，可以用来存储整个project级别的信息

#### 方式1-- tree-shaking

- 在service上标记，在component中直接注入
- 如果项目中没有用到，则不会注入到项目中

```ts
import {Injectable} from '@angular/core';

@Injectable({
  /*整个应用级别的*/
  providedIn: 'root',
})
export class ApiService {

  say() {
    console.log('hello');
  }
}
```

#### 写法2--app.config.ts

- 不在service上标记，在app.config.ts中通过provide识别
- 这种方式注入的，对应的Service不管用不用到，都会在registry中存在

```ts
import {Injectable} from '@angular/core';

@Injectable()
export class ApiService {

  say() {
    console.log('hello');
  }
}
```

```ts
import {ApplicationConfig, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {ApiService} from './api.service';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({eventCoalescing: true}), provideRouter(routes), provideAnimationsAsync(),
    /*在appconfig中提供*/
    {provide: ApiService}]
};
```

### Component Level

- 使用时候，每次都是新的实例，相当于spring的多例模式
- 不能保存跨component的信息，因为是多个实例
- 这种方式注入的，对应的Service不管用不用到，都会在registry中存在

```ts
import {Injectable} from '@angular/core';

@Injectable()
export class ApiService {

  /*不能保存跨component的信息*/
  name: string = ''

  constructor() {
  }

  sayHello() {
    console.log("hello")
  }
}
```

```ts
import {Component} from '@angular/core';
import {ApiService} from '../api.service';

@Component({
  selector: 'app-cart',
  imports: [],
  templateUrl: './cart.component.html',
  standalone: true,
  styleUrl: './cart.component.css',
  /*在当前component中注入：必须通过这种方式提供，不提供就会报错
   NullInjectorError： No provider for _ApiService!*/
  providers: [ApiService]
})
export class CartComponent {

  /*public还是private，取决于是否在对应的html中调用service的方法*/
  constructor(public apiService: ApiService) {
  }
}
```

### TIPS

- 不推荐在root级别的service中，注入另外一个component级别的service

## 3. 注入方式

### construcotr

- 最常用

```ts
import {Component} from '@angular/core';
import {ApiService} from '../api.service';

@Component({
  selector: 'app-cart',
  imports: [],
  templateUrl: './cart.component.html',
  standalone: true,
  styleUrl: './cart.component.css',
})
export class CartComponent {
  constructor(public apiService: ApiService) {
  }
}
```

### inject

```ts
import {Component, inject} from '@angular/core';
import {ApiService} from '../api.service';

@Component({
  selector: 'app-cart',
  imports: [],
  templateUrl: './cart.component.html',
  standalone: true,
  styleUrl: './cart.component.css',
})
export class CartComponent {

  /*通过inject注入*/
  public apiService = inject(ApiService);

  constructor() {
  }
}
```

## 4. provide

- 进行DI的时候，注入的方式

### useClass

-  指定注入的Service的类，根据类名，创建一个新的类
- 可以用在UT中

#### 同名实现

```ts
import {Injectable} from '@angular/core';
import {AbstractSearchService} from './abstract.search.service';

@Injectable()
export class HomeSearchService extends AbstractSearchService {

  constructor() {
    super();
  }

  /*对某些方法进行重写*/
  override sayHello() {
    console.log("Home Search Service")
  }
}
```

```ts
import {Component, inject} from '@angular/core';
import {HomeSearchService} from '../home-search.service';

@Component({
  selector: 'app-cart',
  imports: [],
  templateUrl: './cart.component.html',
  standalone: true,
  styleUrl: './cart.component.css',
  /*
  * provide:  需要注入的类的类名
  * useClass: 具体用的类*/
  providers: [
    {
      provide: HomeSearchService,
      useClass: HomeSearchService // 可以省略，默认写法
    }],
})
export class CartComponent {

  /*provide对应的类*/
  public searchService = inject(HomeSearchService);

  constructor() {
  }

  check = () => {
    this.searchService.sayHello();
    this.searchService.work();
  }
}
```

#### 抽象类-接口

```ts
export abstract class AbstractSearchService {
  name: string = '';

  /*抽象方法*/
  abstract sayHello(): void

  /*具体方法*/
  work = () => {
    console.log("Base Work");
  }
}
```

```ts
import {Injectable} from '@angular/core';
import {AbstractSearchService} from './abstract.search.service';

@Injectable()
export class HomeSearchService extends AbstractSearchService {

  constructor() {
    super();
  }

  /*对某些方法进行重写*/
  override sayHello() {
    console.log("Home Search Service")
  }
}
```

```ts
import {Component, inject} from '@angular/core';
import {HomeSearchService} from '../home-search.service';
import {AbstractSearchService} from '../abstract.search.service';

@Component({
  selector: 'app-cart',
  imports: [],
  templateUrl: './cart.component.html',
  standalone: true,
  styleUrl: './cart.component.css',
  /*
  * provide:  注入的类的基类，可以为抽象类，无需@Injectable()修饰
  * useClass: 具体实现类，必须 @Injectable()修饰
  * 一个component中，只能使用一次继承同一个类的实现类*/
  providers: [
    {
      provide: AbstractSearchService,
      useClass: HomeSearchService
    }
  ],
})
export class CartComponent {

  /*provide对应的类：基类*/
  public searchService = inject(AbstractSearchService);

  constructor() {
  }

  check = () => {
    this.searchService.sayHello();
    this.searchService.work();
  }
}
```

### useExisting



### useValue

#### non-class依赖

- 可以注入interface，等，利用@InjectionToken

```ts
import {InjectionToken} from '@angular/core';

/*要依赖的non-class的类型:  定义一个类*/
export interface UI_CONFIG {
  host: string;
  port: string;
  address: string;
}

/*具体的token定义的值
* 1.不通过DEV_UI_CONFIG.xxx直接引入，而是通过token的方式
* 2.方便测试，不然后续测试不方便*/
export const DEV_UI_CONFIG: UI_CONFIG = {
  host: '192.168.134',
  port: '9090',
  address: 'NEW YORK',
}

export const UAT_UI_CONFIG: UI_CONFIG = {
  host: '9999999',
  port: '8080',
  address: 'BEIJING',
}

/* 变量名：token名
 * 参数一：token的类型
* 参数二：token的描述*/
export const UI_CONFIG_TOKEN = new InjectionToken<UI_CONFIG>('erick_config desc token');
```

```ts
import {Component, Inject} from '@angular/core';
import {UAT_UI_CONFIG, UI_CONFIG, UI_CONFIG_TOKEN} from '../UI_CONFIG';

@Component({
  selector: 'app-cart',
  imports: [],
  templateUrl: './cart.component.html',
  standalone: true,
  styleUrl: './cart.component.css',

  providers: [
    { 
       // 必须是wrapper类型的
      provide: UI_CONFIG_TOKEN,
      useValue: UAT_UI_CONFIG
    }
  ],
})
export class CartComponent {
  host: string = '';
  port: string = '';
  address: string = '';

  /*这种方式的数据不能通过this获取到，需要先在constructor中做转化*/
  constructor(@Inject(UI_CONFIG_TOKEN) config: UI_CONFIG) {
    this.host = config.host;
    this.port = config.port;
    this.address = config.address;
  }

  check = () => {
    console.log(this.host);
    console.log(this.port);
    console.log(this.address);
  }
}
```

#### UT中

- 被测试的类，依赖于其他service的类的时候，可以使用jasmi创造的mock的类去替换

## 5. Inject Context

### 构造器+字段

- 可以在@Component或@Injectable修饰的class的，
- 构造器中或者方法中直接注入

```ts
import {Component, inject} from '@angular/core';
import {HomeSearchService} from '../home-search.service';
import {NG_VALUE_ACCESSOR} from '@angular/forms';
import {ApiService} from '../api.service';

@Component({
  selector: 'app-cart',
  imports: [],
  templateUrl: './cart.component.html',
  standalone: true,
  styleUrl: './cart.component.css',

  providers: [
    {
      provide: ApiService,
    },
    {
      provide: HomeSearchService,
      useClass: HomeSearchService
    }
  ],
})
export class CartComponent {

  /*1.在类初始化的时候*/
  private apiService: ApiService = inject(ApiService);

  /*2. 在constructor中注入*/
  constructor(private homeSearchService: HomeSearchService) {
  }

  check = () => {
    this.homeSearchService.work();
    this.apiService.sayHello();
  }
}
```

### Stack-Frame

- 在Angular中，有一些特殊的函数，可以进行DI，比如AuthGurard

```ts
import {CanActivateFn} from '@angular/router';
import {inject} from '@angular/core';
import {UpdateService} from './update.service';

export const basicGuard: CanActivateFn = (route, state) => {
  // 注入，必须是root级别的
  let updateService = inject(UpdateService);
  updateService.update();
  return true;
};
```



# 独立组件

- 通过standalone标志和imports
- 独立组件可以直接导入另一个独立组件

```ts
import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {NgForOf, NgIf} from "@angular/common";
import {ChildComponent} from "./child/child.component";

@Component({
  selector: 'app-root',
  standalone: true,/* 独立组件*/
  imports: [RouterOutlet, NgIf, ChildComponent, NgForOf],/*导入的其他的独立组件*/
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  /*DI注入*/
  constructor(private childComponent: ChildComponent) {
  }

  fruits: string[] = ["apple", "peach", "lemon"];

  say() {
    this.childComponent.say();
  }
}
```

# 路由

## 基本路由

### 1. 两个路由页面

- 创建两个页面的 component的组件

```html
<p>Hi,I am home</p>
```

### 2. app.routes.ts

- 在该文件中定义路由

```ts
import {Routes} from '@angular/router';
import {FirstComponent} from './first/first.component';
import {SecondComponent} from './second/second.component';

/*定义好两个路由*/
export const routes: Routes = [
  {
    path: 'erick-first', component: FirstComponent
  },
  {
    path: 'erick-second', component: SecondComponent
  }
];
```

### 3. app.config.ts

- 不用做任何变化

```ts
import {ApplicationConfig, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';

/*自动集成了router*/
export const appConfig: ApplicationConfig = {
  /*providerRouter(routes)：导入后续的路由*/
  providers: [provideZoneChangeDetection({eventCoalescing: true}), provideRouter(routes)]
};
```

### 4. app页面

```html
<h1>Common Title</h1>

<!--路由定义的地方：定位到具体元素，存放位置-->
<router-outlet/>
```

### 访问

#### URl访问

- 现在可以通过在浏览器中输入地址，来访问不同的页面

```bash
# http://localhost:4200/
- 显示title

# http://localhost:4200/erick-first
- 显示title和first界面

# http://localhost:4200/erick-second
- 显示title和second界面
```

#### UI元素访问

- 上面的方式，只能让用户在浏览器中的地址栏中手动输入路径才能改变
- 通过在页面创建link，button类似的东西，从而点击后跳转到指定路由

```html
<h1>Common Title</h1>

<!-- a标签：用来跳转路由
     routerLink: Angular的组件,需要自动导入到app.component.ts中-->
<nav>
  <a routerLink="/erick-first">first</a><br/>
  <a routerLink="/erick-second">second</a>
</nav>
<!--路由定义的地方：定位到具体元素，存放位置-->
<router-outlet/>
```

### 5. 匹配顺序 &  重定向 & 统配符 & Title

- 第一个匹配上后，后面就不再匹配了
- 跳转到不同的页面时候，浏览器中的标签，会跟随着变
- 使用title属性，应用中的每个页面都应该有一个唯一的标题

```ts
import {Routes} from '@angular/router';
import {FirstComponent} from './first/first.component';
import {SecondComponent} from './second/second.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';

/*定义好两个路由*/
export const routes: Routes = [

  /*指定的路由*/
  {
    path: 'erick-first', component: FirstComponent, title: 'first-page'
  },
  {
    path: 'erick-second', component: SecondComponent, title: 'second-page'
  },

  /* redirect
  * 1. 跳转前： http://localhost:4200/first
  * 2. 跳转后： http://localhost:4200/erick-first */
  {
    path: 'first', redirectTo: 'erick-second', pathMatch: 'full',
  },

  /*默认跳转： http://localhost:4200/*/
  {
    path: '', component: FirstComponent
  },

  /*统配符： 1. 如果任何路径都没匹配上，则使用该叶敏啊
   *        2. 通配符一般放在数组的末尾，因为一般找到就不再向后匹配了
   *        3. 可以展示一个自定义的404页面，或者redirect到其他页面/
  {
    path: '**', component: PageNotFoundComponent, title: 'not-found-page'
  }
];
```

![image-20241121160151171](https://erick-typora-image.oss-cn-shanghai.aliyuncs.com/img/image-20241121160151171.png)

## Nesting Routes

### 1. app.routes.ts

```ts
import {Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {CartComponent} from './cart/cart.component';
import {ErickComponent} from './home/erick/erick.component';
import {LucyComponent} from './home/lucy/lucy.component';
import {TomComponent} from './home/tom/tom.component';

/*定义好两个路由*/
export const routes: Routes = [
  {
    path: 'home', component: HomeComponent, children: [
      {
        path: 'erick', component: ErickComponent
      },
      {
        path: 'lucy', component: LucyComponent
      },
      {
        path: 'tom', component: TomComponent
      }
    ]
  },
  {
    path: 'cart', component: CartComponent
  }
];
```

### 2. app页面

```html
<h1>Common Title</h1>

<router-outlet/>
```

### 3. 一级路由页面

```html
<!--在子路由中的位置-->
<router-outlet></router-outlet>

<p>home works!</p>
```

### 访问

#### URL访问

```bash
# http://localhost:4200/home

# http://localhost:4200/home/lucy

# http://localhost:4200/home/tom
```

#### UI元素访问

- 定义在对应的父级路由中：home.component.html

```html
<!--在子路由中的位置-->
<router-outlet></router-outlet>

<nav>
  <a routerLink="erick">erick</a><br/>
  <a routerLink="lucy">lucy</a><br/>
  <a routerLink="tom">tom</a><br/>

</nav>

<p>home works!</p>
```

## AuthGuard

```bash
ng g guard basic
```

### basicGuard

```ts
import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';

let login = true;
export const basicGuard: CanActivateFn = (next, state) => {
  /*导入Router，操作路由*/
  const router = inject(Router);

  if (login) {
    /*返回true，则到对应页面*/
    return true
  } else {
    /*返回false，则需要异常处理，或者对应的跳转*/
    router.navigate(['/home/erick']);
    return false;
  }
};
```

### app.routes.ts

```ts
import {Routes} from '@angular/router';
import {CartComponent} from './cart/cart.component';
import {basicGuard} from './basic.guard';

/*定义好两个路由*/
export const routes: Routes = [
  {
    /*可添加多个guard*/
    path: 'cart', component: CartComponent, canActivate: [basicGuard]
  }
];
```

## 路径传参

### 1. Path Parameters

- 路由参数，会在URL中进行显示
- 刷新页面，参数不会丢失

```bash
# 跳转后的路由
http://localhost:4200/hyperlink/erick/Beijing
```

#### app.route.ts

```ts
import {Routes} from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard.component';
import {HyberlinkComponent} from './hyberlink/hyberlink.component';

/*定义好两个路由*/
export const routes: Routes = [
  /*src路由*/
  {
    path: 'dashboard', component: DashboardComponent
  },

  /*dest路由*/
  {
    path: 'hyperlink/:name/:address', component: HyberlinkComponent
  }
];
```

#### SRC

```ts
import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.component.html',
  standalone: true,
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  constructor(private router: Router) {
  }

  /*带着参数，跳转到指定路由*/
  gotoDashboard() {
    this.router.navigate(['hyperlink', 'erick', 'Beijing'],);
  }
}
```

```html
<button (click)="gotoDashboard()">hyperlink click</button>
```

#### DEST

```ts
import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-hyberlink',
  imports: [],
  templateUrl: './hyberlink.component.html',
  standalone: true,
  styleUrl: './hyberlink.component.css'
})
export class HyberlinkComponent {
  /*注入当前活动的路由*/
  constructor(private router: ActivatedRoute) {
  }

  checkParams = () => {
    /*能够拿到对应的路由参数*/
    this.router.params.subscribe(params => {
      console.log(params['name']);
      console.log(params['address']);
    })
  }
}
```

```html
<button (click)="checkParams()">check</button>
```

### 2. Query Parameters

- 路由参数，会在URL中进行显示
- 刷新页面，参数不会丢失

```bash
http://localhost:4200/hyperlink?name=lucy&address=NewYork
```

#### app.route.ts

```ts
import {Routes} from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard.component';
import {HyberlinkComponent} from './hyberlink/hyberlink.component';

/*定义好两个路由*/
export const routes: Routes = [
  /*src路由*/
  {
    path: 'dashboard', component: DashboardComponent
  },

  /*dest路由*/
  {
    path: 'hyperlink', component: HyberlinkComponent
  }
];
```

#### SRC

```ts
import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.component.html',
  standalone: true,
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  constructor(private router: Router) {
  }

  /*带着参数，跳转到指定路由*/
  gotoDashboard() {
    this.router.navigate(['hyperlink'], {
      /*参数必须是：queryParams*/
      queryParams: {
        name: 'lucy',
        address: 'NewYork'
      }
    });
  }
}
```

#### DEST

```ts
import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-hyberlink',
  imports: [],
  templateUrl: './hyberlink.component.html',
  standalone: true,
  styleUrl: './hyberlink.component.css'
})
export class HyberlinkComponent {
  /*注入当前活动的路由*/
  constructor(private router: ActivatedRoute) {
  }

  checkParams = () => {
    /*能够拿到对应的路由参数*/
    this.router.queryParams.subscribe(params => {
      console.log(params['name']);
      console.log(params['address']);
    })
  }
}
```

### 3. Fragement

- 路由参数，会在URL中进行显示
- 刷新页面，参数不会丢失

```bash
http://localhost:4200/hyperlink#hello
```

#### app.route.ts

```ts
import {Routes} from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard.component';
import {HyberlinkComponent} from './hyberlink/hyberlink.component';

/*定义好两个路由*/
export const routes: Routes = [
  /*src路由*/
  {
    path: 'dashboard', component: DashboardComponent
  },

  /*dest路由*/
  {
    path: 'hyperlink', component: HyberlinkComponent
  }
];
```

####  SRC

```ts
import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.component.html',
  standalone: true,
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  constructor(private router: Router) {
  }

  /*带着参数，跳转到指定路由*/
  gotoDashboard() {
    this.router.navigate(['hyperlink'], {fragment: 'hello'});
  }
}
```

#### DEST

```ts
import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-hyberlink',
  imports: [],
  templateUrl: './hyberlink.component.html',
  standalone: true,
  styleUrl: './hyberlink.component.css'
})
export class HyberlinkComponent {
  /*注入当前活动的路由*/
  constructor(private router: ActivatedRoute) {
  }

  checkParams = () => {
    /*能够拿到对应的路由参数*/
    this.router.fragment.subscribe(params => {
      console.log(params);
    })
  }
}
```

### 4. State



#### app.route.ts

```ts
import {Routes} from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard.component';
import {HyberlinkComponent} from './hyberlink/hyberlink.component';

/*定义好两个路由*/
export const routes: Routes = [
  /*src路由*/
  {
    path: 'dashboard', component: DashboardComponent
  },

  /*dest路由*/
  {
    path: 'hyperlink', component: HyberlinkComponent
  }
];
```

#### SRC

```ts
import {Component} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.component.html',
  standalone: true,
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  constructor(private router: Router) {
  }

  /*带着参数，跳转到指定路由*/
  gotoDashboard() {
    this.router.navigate(['hyperlink'], {
      state: {
        name: 'erick',
        address: 'beijing',
      }
    });
  }
}
```

#### DEST

```ts
import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-hyberlink',
  imports: [],
  templateUrl: './hyberlink.component.html',
  standalone: true,
  styleUrl: './hyberlink.component.css'
})
export class HyberlinkComponent implements OnInit {

  constructor(private router: Router) {
    /*这里的Router中获取的上次的Router，可以拿到数据*/
    console.log(`ngInit url=${this.router.url}  state=${this.router.getCurrentNavigation()?.extras.state}`)
  }

  /*不行*/
  ngOnInit(): void {
    console.log(`ngInit url=${this.router.url}  state=${this.router.getCurrentNavigation()?.extras.state}`)
  }

  /*不行*/
  checkParams = () => {
    console.log(`ngInit url=${this.router.url}  state=${this.router.getCurrentNavigation()?.extras.state}`)
  }
}
```



# 表单

## 1. 响应式表单

### 1.1 表单组

```ts
import {Component} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {

  /*表单数据*/
  userInfo = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
    address: new FormControl(''),
  })

}
```

```html
<!--表单数据收集-->
<form [formGroup]="userInfo">
  <input type="text" formControlName="username"><br/>
  <input type="text" formControlName="password"><br/>
  <input type="text" formControlName="address"><br/>
</form>

<div>
  {{ userInfo.value.address }}
</div>

<div>
  {{ userInfo.value.username }}
</div>


<div>
  {{ userInfo.value.password }}
</div>
```



##  2. 模版驱动表单



# 开发工具

## 1. 开发者工具

![image-20240717170208866](https://erick-typora-image.oss-cn-shanghai.aliyuncs.com/img/image-20240717170208866.png)

# 测试

## Service

### 1. 打桩-本类

- 执行当前类的方法调用时候，跳过某个方法的执行

```ts
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErickService {

  constructor() {
  }

  /*single method*/
  getName = (name: string): string => {
    return name.toUpperCase();
  }

  work = (name: string): string => {
    let res = this.getName(name);
    return res + '123';
  }
}
```

```ts
import {ErickService} from "../app/service/erick.service";
import {TestBed} from "@angular/core/testing";

describe('erick service', () => {
  // 被测试类
  let service: ErickService;

  beforeEach(() => {
    TestBed.configureTestingModule({});

    // 实例化被测试类
    service = TestBed.inject(ErickService);
  })

  /*测试1*/
  it('getName', () => {
    // 方法调用
    let result = service.getName('erick');
    // 验证
    expect(result).toEqual('ERICK');
  })

  /*测试2:需要跳过getName的方法*/
  it('work',()=>{
    /*打桩：方法调用时，执行getName的方法时，跳过*/
    spyOn(service, 'getName').and.returnValue('MOCK');

    let res = service.work('erick');
    expect(res).toEqual('MOCK123');
  })
})
```

### 2. 打桩-依赖类

- 可以mock对应的方法和属性

#### 依赖类

```ts
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AwsService {

  /*属性*/
  region: string = 'beijing';
  price: string = '899';

  constructor() {
  }

  /*方法*/
  getSns = (region: string): string => {
    return region.toUpperCase();
  }
}
```

#### 测试类

```ts
import {Injectable} from '@angular/core';
import {AwsService} from "./aws.service";

@Injectable({
  providedIn: 'root'
})
export class ErickService {

  constructor(public awsService: AwsService) {
  }

  /*测试，想跳过被依赖的服务*/
  getTargetInfra = (infra: string) => {
    let name = 'erick';
    return name + this.awsService.getSns(infra);
  }

  /*想跳过被依赖的服务的属性*/
  getInfo = () => {
    return this.awsService.price + this.awsService.region;
  }
}
```

#### UT

```ts
import {ErickService} from "../app/service/erick.service";
import {TestBed} from "@angular/core/testing";
import {AwsService} from "../app/service/aws.service";

describe('erick service', () => {
  // 被测试类
  let service: ErickService;

  // 依赖类的监控引用： 在后续方法中可以进行打桩
  let awsServiceSpy: jasmine.SpyObj<AwsService>;

  beforeEach(() => {
    /*创建一个被依赖的类的Mock:
    参数1: 类名
    参数2: 方法名
    参数3: 属性名: 可以mock具体的值*/
    const spyAwsService = jasmine.createSpyObj<AwsService>('AwsService', ['getSns'], {
      price: '123',
      region: 'usd',
    });

    TestBed.configureTestingModule({
      providers: [
        /*注入被mock的类的时候，useValue用上面创建的spyAwsService*/
        [{provide: AwsService, useValue: spyAwsService}]
      ]
    });

    // 向测试引擎注入  被测试类
    service = TestBed.inject(ErickService);
    // 向测试引擎注入  依赖类
    awsServiceSpy = TestBed.inject(AwsService) as jasmine.SpyObj<AwsService>;
  })
  
  /*测试:需要跳过getSns的方法*/
  it('getTargetInfra', () => {
    // 监控指定方法的方式
    awsServiceSpy.getSns.and.returnValue('1')

    let res = service.getTargetInfra('SNS');
    expect(res).toEqual('erick1');
  })


  /*测试:需要跳过g属性*/
  it('getInfo', () => {
    let info = service.getInfo();
    expect(info).toEqual('123usd');
  })
})
```

### 3. 非Root的Service

- 上面的Service，都是root级别的，如果是非Root的
- 被测试类就用useClass，依赖类就用useValue

```ts
  beforeEach(() => {

    const spyAwsService:AwsService = jasmine.createSpyObj('AwsService',['getSns']);

    TestBed.configureTestingModule({
      providers:[
        /*注入被测试类: useClass, 就用实际的类, 默认值就是useClass*/
        {provide: ErickService,useClass: ErickService},
        /*注入被mock的类的时候，useValue用上面创建的spyAwsService*/
        {provide: AwsService, useValue: spyAwsService}
      ]
    });

    service = TestBed.inject(ErickService);
    awsServiceSpy = TestBed.inject(AwsService) as jasmine.SpyObj<AwsService>;
  })
```

