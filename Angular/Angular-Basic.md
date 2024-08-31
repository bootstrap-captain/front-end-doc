# 搭建环境

```bash
# 1. 安装Angular CLI
sudo npm install -g @angular/cli

sudo npm install -g @angular/cli@16.2.0

# 2. 创建项目: 不要用sudo来创建项目，不然文件就只是可读
 ng new replay-ui-service

# 3. 进入项目
cd erick-angular-demo 

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

# 依赖注入

## 1. 基本使用

- service：用来执行特定功能的一个class
- component：不是UI的组件component类型的class

### 1.1 service

```bash
# 创建一个名字为api.service.ts的文件
ng generate service api
ng g service api
```

```ts
import {Injectable} from '@angular/core';

@Injectable({
  /*真个应用级别的*/
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

### 1.2 component

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

## 1. SPA路由

### 1.1 两个路由页面

- 创建两个页面的组件

```html
<p>Hi,I am home</p>
```

### 1.2 app.routes.ts

- 在该文件中定义路由

```ts
import {Routes} from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {CartComponent} from "./cart/cart.component";

/*添加路由*/
export const routes: Routes = [
  {
    path: 'home', component: HomeComponent
  },
  {
    path: 'cart', component: CartComponent
  }
];
```

### 1.3 app.config.ts

- 不用做任何变化

```ts
import {ApplicationConfig, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';

/*自动集成了router*/
export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({eventCoalescing: true}), provideRouter(routes)]
};
```

### 1.4 app页面

```html
<h1>Common Title</h1>
<!--路由定义的地方：定位到具体元素，存放未知-->
<router-outlet/>
```

### 1.5 访问

- 现在可以通过在浏览器中输入地址，来访问不同的页面

```bash
# http://localhost:4200/
- 显示title

# http://localhost:4200/home
- 显示title和home界面

# http://localhost:4200/cart
- 显示title和cart界面
```

### 1.6 使用UI元素控制导航

- 上面的方式，只能让用户在浏览器中的地址栏中手动输入路径才能改变

```html
<h1>Common Title</h1>
<!-- a标签：用来跳转路由
     routerLink: Angular的组件-->
<nav>
  <a routerLink="/home">Home</a><br/>
  <a routerLink="/cart">Cart</a>
</nav>

<!--路由定义的地方：定位到具体元素，存放未知-->
<router-outlet/>
```

### 1.7 重定向 & 统配符

```ts
import {Routes} from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {CartComponent} from "./cart/cart.component";
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";

/*添加路由*/
export const routes: Routes = [
  {
    path: 'home', component: HomeComponent
  },
  {
    path: 'cart', component: CartComponent
  },
  /*重定向：跳转前：http://localhost:4200/
  *        跳转后：http://localhost:4200/home */
  {
    path: '', redirectTo: 'home', pathMatch: 'full',
  },
  /*统配符： 1. 如果任何路径都没匹配上，则使用该叶敏啊
  *         2. 通配符一般放在数组的末尾，因为一般找到就不再向后匹配了*/
  {
    path: '**', component: PageNotFoundComponent
  }
];
```

## 2. 页面标题

- 跳转到不同的页面时候，浏览器中的标签，会跟随着变
- 使用title属性，应用中的每个页面都应该有一个唯一的标题

```ts
import {Routes} from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {CartComponent} from "./cart/cart.component";
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";

/*添加路由*/
export const routes: Routes = [
  {
    path: 'home', title:'erick-home',component: HomeComponent
  },
  {
    path: 'cart', title:'erick-cart',component: CartComponent
  },
  /*重定向：跳转前：http://localhost:4200/
  *        跳转后：http://localhost:4200/home */
  {
    path: '', redirectTo: 'home', pathMatch: 'full',
  },
  /*统配符： 1. 如果任何路径都没匹配上，则使用该叶敏啊
  *         2. 通配符一般放在数组的末尾，因为一般找到就不再向后匹配了*/
  {
    path: '**', component: PageNotFoundComponent
  }
];
```

## 3. 路由守卫

### 3.1 auth.ts

```ts
import {ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot} from "@angular/router";
import {inject} from "@angular/core";

let login = false;

export const AuthGuard: CanActivateFn = (next: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  /*导入Router，操作路由*/
  const router: Router = inject(Router);

  /*如果当前登陆成功，则返回成功，从而对应的那个路由就能加载*/
  if (login) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
}
```

### 3.2 路由

```ts
import {Routes} from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {CartComponent} from "./cart/cart.component";
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";
import {AuthGuard} from "./auth/auth";

/*添加路由*/
export const routes: Routes = [
  {
    path: 'home', title: 'erick-home', component: HomeComponent, canActivate: [AuthGuard]
  },
  {
    path: 'cart', title: 'erick-cart', component: CartComponent, canActivate: [AuthGuard]
  },
  /*重定向：跳转前：http://localhost:4200/
  *        跳转后：http://localhost:4200/home */
  {
    path: '', redirectTo: 'home', pathMatch: 'full',
  },
  /*统配符： 1. 如果任何路径都没匹配上，则使用该叶敏啊
  *         2. 通配符一般放在数组的末尾，因为一般找到就不再向后匹配了*/
  {
    path: '**', component: PageNotFoundComponent
  }
];
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
