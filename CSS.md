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

- 子标签会继承父标签的样式

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

