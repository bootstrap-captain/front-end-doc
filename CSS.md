# 简介

- CSS: Cascading Style Sheets
- 组成：选择器和对应的属性声明
- 格式规范：分行写，属性和值用小写

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>css入门</title>
    <!--css要写在head中的style中去-->
    <style>
        p {
            color: red;
            font-size: 30px; /*px代表像素*/
        }
    </style>
</head>
<body>
<p>Hello Word</p>
</body>
</html>
```

# 选择器

- 根据不同需求，把不同的标签选择出来

## 1. 基础选择器

- 由单个选择器组成

### 1.1 标签选择器

- 以HTML的标签作为选择器
- 将页面某一类的标签全部选择出来，比如所有的p和div标签
- 优点：快速为页面中同类型的标签设置统一样式
- 缺点：页面同类型标签，如果想区分，则做不到

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <style>
        div {
            color: blue;
            font-size: 20px;
        }

        p {
            color: green;
            font-size: 50px;
        }
    </style>
</head>
<body>

<div>男人</div>
<div>女人</div>
<div>人妖</div>

<p>apple</p>
<p>peach</p>
<p>melon</p>

</body>
</html>
```

### 1.2 类选择器

#### 单class

- 单独选择一个或者某几个标签
- 开发最常用

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>

    <style>
        /*类选择器，对应class*/
        .fruit {
            color: green;
            font-size: 20px;
        }

        /*命名规范*/
        .old-phone {
            color: blue;
            font-size: 50px;
        }
    </style>
</head>
<body>

<ul class="fruit">
    <li>西瓜</li>
    <li>蜜桃</li>
    <li>葡萄</li>
</ul>

<ul>
    <li class="old-phone">华为</li>
    <li>小米</li>
    <li>诺基亚</li>
</ul>


</body>
</html>
```

#### 多class

- 可以为某个标签指定多个类名，从而达到更多的选择目的
- 多个不同的组件： 公共的样式和个性化的样式，可以通过多class来定义

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>

    <style>
        .first {
            color: red;
        }

        .second {
            font-size: 50px;
        }
    </style>
</head>
<body>

<p class="first second">Hello Word</p>

</body>
</html>
```

### 1.3 id选择器

- 和类选择器比较类似
- 缺陷：id只能是页面唯一一个节点，因此一个id选择器对应的css样式，只能被使用一次

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <style>
        #nav {
            color: red;
        }
    </style>
</head>
<body>

<p id="nav">Hello Word</p>
</body>
</html>
```

### 1.4 通配符选择器

- 选取页面中所有的标签
- 当前页面的所有标签的通用属性

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <style>
        /*通配符*/
        * {
            color: red;
        }
    </style>
</head>
<body>
你好

<p>Hello</p>
<h1>Word</h1>
</body>
</html>
```

## 2. 复合选择器



# CSS样式

## 1. 字体属性

- 字体系列，大小，粗细，文字样式(斜体)

| 标签        | Desc     | Value                                                        |
| ----------- | -------- | ------------------------------------------------------------ |
| font-family | 字体样式 |                                                              |
| font-size   | 字体大小 | px                                                           |
| font-weight | 字体粗细 | normal:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;正常，相当于400<br/>bold: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;加粗，相当于700<br/>bolder: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 特粗<br/>lighter:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;细体<br/>number: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;100-900，整百， **Recmmended** |
| font-style  | 字体样式 | normal:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;正常<br/>italic: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;倾斜 |

```css
    <style>
        /*分开写法*/
        p {
            /*字体如果是多个字母，则加引号
             1. 判断标准：按声明顺序，判断电脑是否安装，安装了就会选用*/
            font-family: "Times New Roman", Times;

            /*字体大小： px是常用单位
            谷歌浏览器默认是16px
            不同浏览器默认的字号大小不同，因此尽量给显式的值，不要给默认值*/
            font-size: 50px;

            /*字体粗细：更加提倡使用数字*/
            font-weight: 700;

            /*字体样式：很少给文字加清晰，反而要给斜体标签 em和i，改为不倾斜*/
            font-style: normal;
        }

        /* 复合写法：
           1. 必须严格按照书写顺序
           2. 不需要的属性可以省略，但必须保留font-size和font-family，否则不起作用*/
        /*font:{font-style font-weight font-size/line-height font-family}*/
        h1 {
            font: normal 400 100px/200px "Times New Roman";
        }
        
    </style>
```

## 2. 文本样式

- 文本颜色

| 标签            | Desc                            | Value                                                        |
| --------------- | ------------------------------- | ------------------------------------------------------------ |
| color           | 文本颜色                        | 英文：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; red，blue等<br/>十六进制：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;#0e1b6d    **Recommended**           IDEA可根据取色器来识别<br/>rgb: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;rgb(200,0,0)                  IDEA可根据取色器来识别<br/><img src="https://erick-typora-image.oss-cn-shanghai.aliyuncs.com/img/image-20230702233825002.png" style="zoom:33%;" /> |
| text-align      | 对齐文本<br>**<u>针对盒子</u>** | center: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br/>left: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;default value<br/>right |
| text-decoration | 文本装饰                        | none: &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Recommended**， 用来删除本来带删除线的文本<br/>underline:  &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;下划线<br/>overline： &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;上划线<br/>line-through:  &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 删除线 |
|                 |                                 |                                                              |

