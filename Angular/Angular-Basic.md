# 搭建环境

```bash
# 1. 安装Angular CLI
sudo npm install -g @angular/cli

sudo npm install -g @angular/cli@16.2.0

# 2. 创建项目: 不要用sudo来创建项目，不然文件就只是可读
ng new erick-angular-demo

# 3. 进入项目
cd erick-angular-demo 

# 4. 安装开发者工具
npm install @angular-devkit/build-angular --save-dev 

# 5. 开启热更新启动项目
ng serve --open
ng serve 
```

# 组件

## 1. 创建组件

### 1.1 Angular Cli

- 比较推荐的方式

```bash
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
  selector: 'app-home',/*在html中，可以用该名称来实例化该组件*/
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',/*对应的html，两种方式*/
  styleUrl: './home.component.css'/*对应的css，两种方式*/
})
export class HomeComponent {

}
```

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

### 子

```ts
import {Component, EventEmitter, Output} from '@angular/core';
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

  /*输出源*/
  @Output() childName = new EventEmitter<string>();

  /*对父暴露*/
  childChangeName = (name: string) => {
    this.childName.emit(name);
  }
}
```

```html
<!--#name:存储了输入的input的输入框，可以通过value获取到其值-->
<input type="text" #name>

<!--点击事件-->
<button type="button" (click)="childChangeName(name.value)">输入姓名</button>
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
  names = ['lucy', 'tom'];

  fatherAddName = (name: string) => {
    this.names.push(name);
  }
}
```

```html
<!--将子属性的event，和父关联起来-->
<app-child (childName)="fatherAddName($event)"></app-child>

<ul>
  <li *ngFor="let name of names">{{ name }}</li>
</ul>
<router-outlet/>
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

## 6. 子组件调用父组件的方法

### 父

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

  /*父组件的方法*/
  parentSay = () => {
    console.log('Hi, I am parent')
  }
}
```

```html
<div>我是父组件</div>
<!--子组件事件的响应方式-->
<app-child (childEvent)="parentSay()"></app-child>
```

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
  /*定义一个事件*/
  @Output() childEvent = new EventEmitter<void>();

  childSay = () => {
    this.childEvent.emit();
  }
}
```

```html
<div>我是子组件</div>
<button (click)="childSay()">点击查看</button>
```



# 模版

## 1. 插值和模版语句

```html
<!--1. 插值：必须先在对应的ts中定义-->
<h2>{{ address }}</h2>

<!--2. 模版语句-->

<!--2.1 直接传值-->
<button (click)="delete('12')">箭头函数-带参-直接给</button><br/>
<!--2.2 传递ts中的变量-->
<button (click)="delete(id)">箭头函数-带参-变量</button><br/>

<button (click)="say('shuzhan')">普通函数-带参-直接给</button><br/>
<button (click)="say(name)">普通函数-带参-变量</button><br/>

<button (click)="work()">无参</button><br/>

<router-outlet/>
```

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

  /*1. 插值语法：必须先在对应的ts中定义*/
  address = '北京';

  id = '14';
  name = 'erick';

  /*2. 箭头函数*/
  delete = (id: string) => {
    console.log(id)
  }

  /*3. 普通函数和箭头函数没区别*/
  say(name: string) {
    console.log(name);
  }

  work() {
    console.log('working');
  }
}
```

## 2. 绑定

### 2.1 Property绑定

```html
<!--加[], 后面的属性就当作变量来解析，在对应的ts文件中，去找对应的变量-->
<img alt="item" [title]="erickTitle">

<!--不加[], 后面的属性就当作字符串来解析-->
<img alt="item" title="erickTitle">

<!--组件传递中可以使用,作用同理-->
<app-child [name]="erickName"></app-child>
<router-outlet/>
```

## 3. 模版引用变量

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

## 1. 子组件

```ts
import {Component, Injectable} from '@angular/core';
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
/*可以被注入的*/
@Injectable({
  providedIn: 'root'
})
export class ChildComponent {

  name: string = 'erick';

  say() {
    console.log('子组件说话')
  }
}
```

## 2. 父组件

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
