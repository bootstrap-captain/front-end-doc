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

## 1. 引入方式

| 样式表     | 作用域   | 优点             | 缺点         | 场景            |
| ---------- | -------- | ---------------- | ------------ | --------------- |
| 行内样式表 | 当前标签 | 书写简单样式     | 结构样式混合 | 较少使用        |
| 内部样式   | 当前页面 | 结构样式部分分离 | 没彻底分离   | 较多            |
| 外部样式   | 多页面   | 结构样式完全分离 | NA           | **Recommended** |

### 1.1 行内样式表

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>css入门</title>
</head>
<body>
<p style="color: red; font-size: 30px">Hello Word</p>
</body>
</html>
```

### 1.2 内部样式表

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>css入门</title>
    <style>
        p {
            color: red;
            font-size: 30px; 
        }
    </style>
</head>
<body>
<p>Hello Word</p>
</body>
</html>
```

### 1.3 外部样式表

```css
p {
    color: blue;
}
```

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <!--引进来-->
    <link rel="stylesheet" href="first.css">
</head>
<body>

<p>hello</p>
</body>
</html>
```

## 2. 调试工具

### 2.1 chrome调试

- 按F12或者右键空白--inspect

```bash
# 左边是html元素结构， 右边是css样式
# 右边css样式可以改动数值，进行debug调试
# 如果点击html元素，右侧没有样式引入，则可能是类名或者样式引入错误
# 如果有样式，但样式前面有黄色感叹号，则是样式属性书写错误
```

![image-20230703113528267](https://erick-typora-image.oss-cn-shanghai.aliyuncs.com/img/image-20230703113528267.png)

### 2.2 IDEA快捷键

```bash
# HTML标签生成
div + tab:       快速生成
div*10 + tab：   快速生成10个
ul>li + tab:     父子标签
div+p + tab:     兄弟标签
p.demo  + tab:   class为demo的p标签
p#demo+ tab:     id为demo的p标签
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

- 建立在基础选择器上，对基本选择器进行组合
- 基本选择器：可以是任何基础选择器

### 2.1 后代选择器

- 选择父元素里面的子元素，孙子元素

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>

    <style>
        ul li {
            color: red;
        }

        ul li a {
            color: blue;
        }

        .nav li a {
            color: gray;
        }
    </style>
</head>
<body>


</p>
<ul>
    <li>hello</li>
    <li>hello</li>
    <li>hello</li>
    <li><a href="#">孙子</a></li>
</ul>

<ol class="nav">
    <li>hello</li>
    <li>hello</li>
    <li>hello</li>
    <li><a href="#">孙子</a></li>
</ol>

</body>
</html>
```

### 2.2 子选择器

- 某元素的最近一级子元素，亲儿子元素

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>

    <style>

        /*只会渲染子元素*/
        div > a {
          color: red;
        }
    </style>
</head>
<body>

<div>
    <a href="#">子元素</a>
    <p>
        <a href="#">孙子元素</a>
    </p>

</div>

</body>
</html>
```

### 2.3 并集选择器

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <style>
        div, p {
            color: red;
        }

        h1, span{
            color: blue;
        }
    </style>
</head>
<body>

<div>nihao</div>
<p>hello</p>

<h1>123</h1>
<span>234</span>

</body>
</html>
```

### 2.4 伪类选择器

- 用于向某些选择器添加特殊的效果，比如给链接添加特殊效果，或选择第一个，第n个元素
- 非常重要

#### 链接伪类

- 书写的时候，按照顺序来写， LVHV
- a链接在浏览器中具有默认样式，实际工作中都需要给链接单独指定样式
- 一般是指定： a:link  和 a.hover即可

| 选择器    | Desc                               |
| --------- | ---------------------------------- |
| a:link    | 选择所有未被访问的链接             |
| a:visited | 选择所有已被访问的链接             |
| a:hover   | 选择鼠标指针位于其上的链接         |
| a:active  | 选择活动链接(鼠标按下未弹起的链接) |

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>

    <style>
        a:link {
            color: black;
        }

        a:visited {
            color: blue;
        }

        a:hover {
            color: pink;
        }

        a:active {
            color: gray;
        }
    </style>
</head>
<body>

<a href="#">hello</a><br/>
<a href="#">hello</a><br/>
<a href="#">hello</a><br/>
<a href="#">hello</a><br/>
</body>
</html>
```

#### focus伪类

- 选取获得鼠标焦点的表单元素
- input:focus

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <style>
        input:focus {
            background-color: yellow;
        }
    </style>
</head>
<body>

<form action="#">
    用户名：<input type="text"><br/>
    密码：<input type="password"><br/>
</form>

</body>
</html>
```

# 基本特性

## 1. 显示模式

- 标签元素以什么方式进行显示，比如div独占一行，一行可以放多个span

### 1.1 块元素

- 常见：h1-h6, p, div, ul, ol, li,  其中div是最典型的块元素

```bash
- 独占一行
- 高度，宽度，外边距，内边距可控
- 宽度默认是容器的100%
- 是一个容器及盒子，里面可以放行内或块级元素

# 注意
- 文字类的元素内，不能使用块级别元素， 比如p，h系列，里面不能再放其他块级元素
```

### 1.2 行内元素

- 常见：a, strong, b, i, 其中span是经典的行内元素

```bash
- 相邻元素在一行上，一行可以显示多个
- 高，宽直接设置无效
- 默认宽度就是本身内容的宽度
- 行内元素只能容纳文本或其他行内元素

# tip
- 链接里面不能再放链接
```

### 1.3 行内块元素

- 常见： img， input， td，同时具有块元素和行内元素的特点

```bash
- 和相邻行内块元素在一行上，之间会有空白缝隙，一行可以显示多个
- 默认宽度就是本身内容的宽度(行内元素特点)
- 高度，行高，外边距，内边距可以控制(块元素特点)
```

### 1.4 显示模式的转换

- 经常需要
- 一个模式的元素需要另外一种模式的特性， 比如增加链接a的触发范围

```bash
# 行内转换块
display: block

# 块转换行内
display：inline

# 转换行内块元素
display: inline-block
```

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>

    <style>
        /*行内元素转还块元素*/
        a {
            color: black;
            width: 150px;
            height: 30px;
            background-color: pink;
            display: block;
        }

        div {
            width: 150px;
            height: 30px;
            background-color: yellow;
            display: inline;
        }
    </style>
</head>
<body>

<a href="#">百度一下</a>

<div>
     我是块级元素
</div>

</body>
</html>
```

## 2. 三大特性

### 2.1 层叠性

- 相同选择器，相同样式(**冲突的属性：就近原则**)
- 可以通过chrom的console来检查

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>

    <style>
        /*相同选择器，相同样式，就近原则*/
        div {
            color: red;
        }

        div {
            color: pink;
        }
    </style>
</head>
<body>

<div>nihao</div>
</body>
</html>
```

### 2.2 继承

- 子标签会继承父标签的样式，子标签可以重写

#### 普通属性

- 继承text-， font-， line-， color这些元素开头的样式

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>

    <style>
        /*p会继承div的*/
        div {
            color: red;
        }

    </style>
</head>
<body>

<div>nihao
    <p>hello</p>
</div>
</body>
</html>
```

#### 行高属性

- 行高可以跟单位，也可以不跟单位

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <style>
        /*line-height是font-size的1.5倍*/
        body {
            color: pink;
            font: 12px/1.5 'Times New Roman';
        }

        /*line-height继承父元素*/
        div {
            font-size: 20px;
        }

    </style>
</head>
<body>
<div>hello</div>
<p>word</p>
</body>
</html>
```

### 2.3 优先级

#### 基础选择器

- 选择器相同，执行层叠性
- 选择器不同，则根据**选择器权重**执行
- a标签：浏览器默认给了一个选择器对应的样式

![image-20230703224943530](https://erick-typora-image.oss-cn-shanghai.aliyuncs.com/img/image-20230703224943530.png)

```css
    <style>
        div {
            font-size: 20px !important;
        }
    </style>
```

#### 复合选择器

- 会有权重叠加

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>

    <style>
        /*权重为： 0,0,0,1 + 0,0,0,1 = 0,0,0,2*/
        ul li {
            color: red;
        }

        /*权重为： 0,0,0,1*/
        li {
            color: pink;
        }
    </style>
</head>
<body>

<ul>
    <li>hello</li>
</ul>

</body>
</html>
```



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
| text-indent     | 首行缩进                        | px:   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;像素<br/>em: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;相对单位，当前元素(font-size)一个文字的大小。**Recommended** |
| line-height     | 行间距                          | px<br/>修改行间距时，文本高度font-size不会变，改变的是上间距和下间距<img src="https://erick-typora-image.oss-cn-shanghai.aliyuncs.com/img/image-20230703104652164.png" alt="image-20230703104652164" style="zoom: 25%;" /> |

```css
    <style>
        p {
            /*1. 文本颜色*/
            color: rgb(52, 173, 26);
            /*2. 文本布局*/
            text-align: left;

            /*3. 上划线等*/
            text-decoration: none;

            /*4.  首行缩进*/
            text-indent: 20px;

            /*5. 行间距*/
            line-height:  26px;
        }
    </style>
```

## 3. 背景

| 标签                  | Desc             | Value                                                        |
| --------------------- | ---------------- | ------------------------------------------------------------ |
| background-color      | 背景颜色         | transparent:&nbsp;             默认透明<br/>颜色：                       red等<br/>rgb(200,100,30):        rgb色<br/>十六进制：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;#0e1b6d    **Recommended** |
| background-image      | 背景图片         | url("../image/1.jpg")：    路径或网络url                     |
| background-repeat     | 背景平铺重复方式 | no-repeat：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;不平铺<br/>repeat-x:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;沿x平铺<br/>repeat-y: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;沿y平铺<br/>repeat:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;沿x和y平铺 |
| background-position   | 背景图片方位     | 方位名次：left/center/right + top/center/bottom 两个参数顺序不影响<br/>精确单位：x,y<br/>混合单位： x,y |
| background-attachment | 背景附着         | fixed:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;固定的<br/>scroll: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;滚动的-Default |

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <style>

        /*分开写法*/
        .first {
            width: 1000px;
            height: 1000px;

            /*既可以选择背景颜色，也可以选择背景图片，背景图片会压住背景颜色*/
            /*背景颜色
              rgba(200, 100, 30,0.3): 背景颜色半透明，0代表全透明，1代表不透明
            */
            background-color: rgba(200, 100, 30,0.5);

            /*背景图片*/
            background-image: url("../image/1.jpg");

            /*背景图片的平铺方式*/
            background-repeat: no-repeat;

            /*背景图片方位
            参数方式一： 方位名词：
                    1.1 两个方位名词都全，前后顺序不影响 left/center/right + top/center/bottom
                    1.2 如果只写一个参数，则另外一个默认居中
            参数方式二： 精确单位：x,y: 距离左+上的距离， 顺序按照x，y;

            参数方式三： 混合单位，按照x，y
                */
            background-position: 20px 10px;

            background-attachment: scroll;
        }

        /*复合写法: 没有特定的书写顺序*/
        .second {
            width: 1000px;
            height: 1000px;
            background: red url("../image/1.jpg") no-repeat scroll 20px 10px;
        }
    </style>
</head>
<body>

<div class="first">
    第一个
</div>

<div class="second">
    第二个
</div>

</body>
</html>
```

# 页面布局

## 1. 盒子模型

### 1.1 border

#### 基本语法

| 元素         | DESC     | value                                |
| ------------ | -------- | ------------------------------------ |
| border-width | 边框粗细 | px                                   |
| border-style | 边框样式 | solid<br/>dashed<br/>dotted<br/>none |
| border-color | 边框颜色 |                                      |

```css
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>

    <style>
        div {
            width: 800px;
            height: 400px;
        }

        .first {
            border-color: green;
            border-style: solid;
            border-width: 5px;
        }

        /*复合写法：没有顺序*/
        .second {
            border: 5px solid rebeccapurple;
        }

        /*分别定义不同的边框*/
        .third {
            border-top: 5px solid gray;
            border-left: 5px solid olivedrab;
            border-right: 5px solid olivedrab;
            border-bottom: 5px solid olivedrab;
        }

        /*层叠性： 就近原则， 顺序不能颠倒*/
        .fourth {
            border: 5px solid yellow;
            border-top: 5px solid red;
        }
    </style>
</head>
<body>

<div class="first">

</div>

<div class="second">

</div>

<div class="third">

</div>

<div class="fourth">

</div>

</body>
</html>
```

#### 细线表格

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>

    <style>
        table {
            font-size: 20px;
            width: 500px;
            height: 300px;
            text-align: center;
        }

        /*所有单元格*/
        table, th, td {
            border-style: solid;
            border-color: gray;
            border-width: 1px;
            /*合并相邻边框*/
            border-collapse: collapse;
        }
    </style>
</head>
<body>

<table cellspacing="0">
    <thead>
    <tr>
        <th>姓名</th>
        <th>年龄</th>
        <th>住址</th>
    </tr>
    </thead>
    <tbody>
    <tr>
        <td>张三</td>
        <td>20</td>
        <td>山西</td>
    </tr>
    <tr>
        <td>李四</td>
        <td>30</td>
        <td>背景</td>
    </tr>
    <tr>
        <td>王五</td>
        <td>24</td>
        <td>湖南</td>
    </tr>
    </tbody>
</table>
</body>
</html>
```

#### 盒子大小

- 边框宽度，会增大盒子：就是在盒子本身的宽高上，再加上边框高度
- 如果盒子宽度固定：则需要用原来盒子大小减去边框

```css
    <style>
        div {
            width: 50px;
            height: 50px;
            background-color: green;
            /*会在原来盒子的宽高基础上，再加2px的边框*/
            border: 2px solid black;
        }
    </style>
```

### 1.2 padding

- 内边距：内边框和盒子内容的边距

#### 基本语法

| 值个数                        | 含义               |
| ----------------------------- | ------------------ |
| padding: 50px                 | 四个都是50px       |
| padding: 50px 20px            | 上下是50，左右是20 |
| padding: 50px 10px 20px       | 上50，左右10，下20 |
| padding: 10px 20px 30px 40 px | 上右下左           |

```css
    <style>
        div {
            width: 200px;
            height: 100px;
            border: gray 1px solid;
        }

        /*分开写法*/
        .first {
            padding-left: 20px;
            padding-right: 30px;
            padding-bottom: 40px;
            padding-top: 50px;
        }

        /*简单写法*/
        .second {
            padding: 50px;
        }

    </style>
```

#### 盒子大小

- 给盒子指定了padding后，内容和边框有了距离，同时padding撑大了盒子实际大小
- 导航栏应用：可以不给每个盒子指定宽，而是采用内边距来自动撑大盒子

![image-20230704120134309](https://erick-typora-image.oss-cn-shanghai.aliyuncs.com/img/image-20230704120134309.png)

```bash
# 不撑开盒子的情况
- 如果盒子本身就没有指定width 或者 height，则就不会撑开(不存在撑开的问题)
- 场景一：盒子如果没指定宽度，加padding后，还是浏览器默认宽度
- 场景二：盒子如果指定宽度为100%， 加padding后，浏览器就会向右边滚动屏幕
```

### 1.3 margin

#### 基本使用

- 外边距：盒子和盒子之间的距离，用法和padding一样
- 默认盒子和盒子之间，距离为0

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <style>
        div {
            width: 200px;
            height: 50px;
        }

        .first {
            background-color: red;
            margin-bottom: 20px;
        }

        .second{
            background-color: gray;
            margin-top: 20px;
        }
    </style>
</head>
<body>

<div class="first">
    hello
</div>
<div class="second">
    word
</div>
</body>
</html>
```

#### 单个块级元素水平居中

- 盒子必须指定宽度，盒子左右的外边距设置为auto

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>

    <style>
        div {
            height: 50px;
            background-color: green;
            width: 1000px;
            margin: 0 auto;
        }
    </style>
</head>
<body>

<div>

</div>

</body>
</html>
```

#### 嵌套元素垂直外边距塌陷

- 如果存在父子盒子，二者都有外边距，会取二者中较大的值，但是父子盒子内部不会有边距

![image-20230704150851287](https://erick-typora-image.oss-cn-shanghai.aliyuncs.com/img/image-20230704150851287.png)

- 解决方案一：为父元素定义上边框
- 解决方案二：为父元素定义上内边距
- 解决方案三：为父元素添加overflow:hidden

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <style>
        .father {
            background-color: green;
            width: 400px;
            height: 200px;
            margin-top: 20px;
            /*border-top: black 1px solid;*/
            /*padding-top: 10px;*/
            overflow: hidden;
        }

        .son {
            background-color: red;
            width: 200px;
            height: 100px;
            margin-top: 50px;
        }
    </style>
</head>
<body>

<div class="father">
    <div class="son"></div>
</div>
</body>
</html>
```

### 1.4 清除内外边距

- 网页元素如body，h，li等，都会默认带内外边距，并且在不同浏览器中，内外边距不同
- 为了统一起见，需要清除内外边距

```css
    <style>
        * {
            padding: 0;
            margin: 0;
        }
    </style>
```

### 1.5 圆角边框

- css3新增的语法: border-radius
- 内切圆

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>

    <style>
        /*做一个圆形： 
        1. 打造正方形盒子
        2. 设置圆角边框为长宽的一半*/
        .first {
            height: 200px;
            width: 200px;
            margin-bottom: 30px;
            background-color: red;
            border-radius: 100px;
        }

        /*做一个长方形，但是两边是圆的*/
        .second {
            height: 200px;
            width: 600px;
            background-color: green;
            border-radius: 100px;
        }
    </style>
</head>
<body>

<div class="first">

</div>

<div class="second">

</div>
</body>
</html>
```

### 1.6 盒子阴影

- box-shadow:
- 需求：鼠标经过时，对盒子添加阴影,    div:hover{box-shadow}

![image-20230704161012663](https://erick-typora-image.oss-cn-shanghai.aliyuncs.com/img/image-20230704161012663.png)

## 2. 浮动

### 2.1 分布方式

- 一个标准的页面，是包含三种分布方式的

#### 标准流

- 普通流，文档流
- 标签按照规定好，默认方式排列。包含块级元素，行内元素等
- 是最基本的布局方式

#### 浮动流

#### 定位流

### 2.2 浮动布局

- 场景：多个div分布在同一行？两个div分别在同一行的左边和右边
- 浮动：可以改变元素默认的排列方式
- 网页布局第一准则：**多个块元素纵向排列用标准流，多个块元素横向排列用浮动** 
- 网页布局第二准则：**先设置盒子大小，再设置盒子的位置**
- float：用于创建浮动框，将其移动到一边，直到左边缘或右边缘，及包含块或另一个浮动框的边缘

![image-20230704171521742](https://erick-typora-image.oss-cn-shanghai.aliyuncs.com/img/image-20230704171521742.png)

### 2.3 浮动特性

#### 脱标

- 设置了浮动的元素，脱离标准普通流的控制，移动到指定位置(飞升)
- 浮动的盒子不再保留原先的位置(图层叠加)

#### 一行显示

- 如果多个盒子都设置了浮动，则它们会按照属性值，在**一行内显示并且顶端对齐排列**
- 盒子之间没有空隙
- 如果缩放浏览器大小，则装不下的盒子，就会自动浮动到下一行

#### 行内块元素特性

- 任何元素都可以浮动，不管之前是什么模式的元素，添加浮动之后，都具有行内块元素的特性

### 2.4 常用布局

#### 多个块无间距

- 为了约束浮动元素位置(不能基于浏览器对齐)，网页布局一半采取
- 先用标准流的父元素排列上下文职，之后内部子元素采取浮动排列左右位置

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>

    <style>
        .bigBox {
            width: 1500px;
            height: 600px;
            margin: 50px auto; /*大盒子居中对齐*/
        }

        .leftBox {
            width: 1000px;
            height: 600px;
            float:left;
            background-color: green;
        }

        .rightBox {
            width: 500px;
            height: 600px;
            float:right;
            background-color: red;
        }


    </style>
</head>
<body>

<div class="bigBox">

    <div class="leftBox">

    </div>

    <div class="rightBox">

    </div>
</div>

</body>
</html>
```

#### 多个块有间距

- 可以用ul-li来做

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>

    <style>
        * {
            margin: 0;
            padding: 0;
        }

        .box {
            height: 300px;
            width: 1090px;
            background-color: gray;
            margin: 50px auto;
            list-style: none; /*清除掉li的样式*/
        }

        ul li {
            height: 200px;
            width: 250px;
            background-color: green;
            float: left;
            margin-right: 30px; /*盒子间距离一定的缝隙*/
        }

        /*最后一个不要加*/
        .last {
            margin-right: 0!important;
        }

    </style>
</head>
<body>

<ul class="box">
    <li></li>
    <li></li>
    <li></li>
    <li class="last"></li>
</ul>

</body>
</html>
```

#### 浮和不浮结合

- 理论上来说，所有的兄弟盒子，一个浮动，其他都要浮动
- 第一个不浮动，剩下的浮动：则第一个独占一行，剩下的兄弟盒子另起一行进行浮动
- **浮动的盒子只会影响浮动盒子后面的标准流，不会影响前面的标准流**

### 2.5 清除浮动

- 父盒子可能不能指定高度，但是又需要包含若干个子盒子。比如商品的展示页
- 理想情况：让子盒子撑开父盒子

#### 为什么要清除

- 父盒子不方便给高度，但是又希望子盒子撑开父盒子

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>

    <style>
        .box {
            background-color: gray;
            width: 1000px;
           /* height: 500px;*/
            margin: 50px auto;
        }

        /*假如浮动的块有很多个，希望不要给父盒子指定高度，让子盒子来撑开父盒子
        1. 不指定父元素高度时，又会导致父元素成为一条线*/
        .first {
            float: left;
            background-color: green;
            height: 100px;
            width: 100px;
        }

        .second {
            float: left;
            background-color: red;
            height: 100px;
            width: 100px;
        }

    </style>
</head>
<body>

<div class="box">

    <div class="first">

    </div>

    <div class="second">

    </div>
</div>

</body>
</html>
```

#### 清除浮动

- 本质就是清除浮动元素脱离标准流造成的影响
- 如果父盒子本身有高度，则不需要清除浮动
- 清除浮动后，父盒子就会根据浮动的子盒子自动检测高度。父级有了高度，就不会影响下面的标准流了

| 清除方式     | 做法                                                         | 缺点           | 推荐 |
| ------------ | ------------------------------------------------------------ | -------------- | ---- |
| 额外标签法   | 在最后一个浮动标签后面，再加一个块标签，并且用clea：both来清除 | 需要新加块标签 | N    |
| 父：overflow | 在父元素添加overflow：hidden, auto, scroll都可以             |                |      |
| 伪元素       |                                                              |                |      |

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>

    <style>
        .box {
            background-color: gray;
            width: 1000px;
            /* height: 500px;*/
            margin: 50px auto;
        }

        .first {
            float: left;
            background-color: green;
            height: 100px;
            width: 100px;
        }

        .second {
            float: left;
            background-color: red;
            height: 100px;
            width: 100px;
        }

        /*新增clear*/
        .sf {
            clear: both;
        }

    </style>
</head>
<body>

<div class="box">

    <div class="first">

    </div>

    <div class="second">

    </div>
    <!--新增clear-->
    <div class="sf">

    </div>
</div>

</body>
</html>
```

