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

| 样式表             | 作用域   | 优点             | 缺点                   | 场景            |
| ------------------ | -------- | ---------------- | ---------------------- | --------------- |
| 行内样式(内联样式) | 当前标签 | 书写简单样式     | 结构样式混合，不能复用 | 较少使用        |
| 内部样式           | 当前页面 | 结构样式部分分离 | 没彻底分离             | 较多            |
| 外部样式           | 多页面   | 结构样式完全分离 | NA                     | **Recommended** |

### 1.1 行内样式

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

### 1.2 内部样式

- 一般会放在head中

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

### 1.3 外部样式

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

## 2. 样式表优先级

```bash
# 不同名的
- merge操作：行内+内部+外部

# 同名
- 行内 > 内部 = 外部
- 内部和外部的优先级：取决于在html中的声明顺序(后写的会覆盖前面的)
- 同一个样式表：优先级和编写顺序有关，后面的会覆盖前面的
```

# 基础选择器

- 根据不同需求，把不同的标签选择出来
- 由单个选择器组成

## 1. 通配符选择器

- 选取页面中所有的标签
- 当前页面的所有标签的通用属性
- 一般用来样式清除

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

## 2. 元素选择器

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
        }

        p {
            color: green;
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

## 3. 类选择器

### 3.1 单class

- 单独选择一个或者某几个标签
- 开发最常用

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>

    <style>
        /*类选择器，对应class
           . : 告知该选择器是类选择器
               选中页面中所有的class为该类名的
         */
        .fruit {
            color: green;
            font-size: 20px;
        }

        .old-phone {
            color: blue;
            font-size: 50px;
        }
    </style>
</head>
<body>

<!--class：指定类选择器的名称-->
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

### 3.2 多class

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

## 4. id选择器

- 和类选择器比较类似
- 缺陷：id只能是页面唯一一个节点，因此一个id选择器对应的css样式，只能被使用一次

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <style>
        /*id选择器
         # ： 表明是一个id选择器*/
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

# 复合选择器

- 建立在基础选择器上，对基本选择器进行组合

## 1. 交集选择器

- 两个基础选择器，链接在一起
- 某个页面元素，同时符合两种基础选择器才能选中的

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <style>
        /*   p: 代表元素选择器
            #nav： id选择器
         目标元素：p标签且id为nav   */
        p#nav {
            color: green;
        }

    </style>
</head>
<body>

<p id="nav">nihao</p>

</body>
</html>
```

## 2. 并集选择器

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <style>
        /*目标元素： div或者p标签*/
        div, p {
            color: red;
        }
    </style>
</head>
<body>

<div>nihao</div>
<p>hello</p>
</body>
</html>
```

## 3. 后代选择器

- 选择父元素里面的子元素，孙子元素

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>

    <style>
        /*后代选择器：可以按照页面元素，自定义若干个子孙*/
        ul li {
            color: red;
        }

        ul li a {
            color: blue;
        }

        /*类名为 .nava的，后代选择器*/
        .nav li a {
            color: gray;
        }
    </style>
</head>
<body>

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

## 4. 子选择器

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

## 5. 兄弟选择器

### 5.1 紧紧相联

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>

    <style>
        /*定位元素：和div相连的，下面的，紧紧相连的 一个p元素
        <p>舒展的下面兄弟</p>
          */
        div + p {
            color: red;
        }
    </style>
</head>
<body>

<p>舒展的上面兄弟</p>
<div>舒展</div>
<p>舒展的下面兄弟</p>
<p>其他兄弟1</p>

</body>
</html>
```

### 5.2 非紧紧相连

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>

    <style>
        /*定位元素：1. 定位div
                   2. 把div的所有的下面的兄弟元素
          */
        div ~ p {
            color: red;
        }
    </style>
</head>
<body>

<p>舒展的上面兄弟</p>
<div>舒展</div>
<p>舒展的下面兄弟</p>
<p>其他兄弟1</p>

</body>
</html>
```

## 6. 伪类选择器

- 用于向某些选择器添加特殊的效果，比如给链接添加特殊效果，或选择第一个，第n个元素
- 很像类，但不是类，是元素特殊状态的一种描述
- 非常重要

### 6.1 动态伪类

#### 链接伪类

- 书写的时候，按照顺序来写， LVHV
- a链接在浏览器中具有默认样式，实际工作中都需要给链接单独指定样式
- 一般是指定： a:link  和 a.hover即可

| 选择器    | Desc                               | 使用场景      |
| --------- | ---------------------------------- | ------------- |
| a:link    | 选择所有未被访问的链接             | a             |
| a:visited | 选择所有已被访问的链接             | a             |
| a:hover   | 选择鼠标指针位于其上的链接         | 其他也可 span |
| a:active  | 选择活动链接(鼠标按下未弹起的链接) | 其他也可 span |

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

- 选取获得鼠标焦点的表单元素，只能存在于表单元素
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

# 三大特性

## 1. 层叠性

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

## 2. 继承

- 子标签会继承父标签的样式，子标签可以重写

### 普通属性

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

### 行高属性

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

## 3. 优先级

### 基础选择器

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

### 复合选择器

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

## 1. 颜色

```bash
# 英文
- blue 
- 表示的颜色少(使用较少） 

# 十六进制(HEX)
- #0e1b6d
- 最常用
- 可以用snipaste取色

# rgb
-  rgb(200,0,0)
- 可以用snipaste取色 
```

## 2. 字体

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
         1. 判断标准：按声明顺序，判断电脑是否安装，安装了就会选用
         2. 使用标准：从前往后匹配，匹配上就可以*/
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

### 2.1 font-size

- 设置的时候，40px指的是单个格子的高度，宽度会随着自适应
- 字体设计的原因，文字最终呈现的大小，并不一定与font-size的值一致，可能大， 也可能小
- 文字相对字体设计框，并不是垂直居中的，一般都靠小一些

![image-20240616133932500](https://erick-typora-image.oss-cn-shanghai.aliyuncs.com/img/image-20240616133932500.png)



## 3. 文本

| 标签            | Desc                                              | Value                                                        |
| --------------- | ------------------------------------------------- | ------------------------------------------------------------ |
| color           | 文本颜色                                          | 三种方式都可                                                 |
| letter-spacing  | 字母之间的间距                                    | px                                                           |
| word-sapcing    | 单词之间的间距，对中文不起作用                    | px                                                           |
| text-align      | 对齐文本<br>**<u>针对盒子，在盒子内部的布局</u>** | center: 水平居中&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br/>left: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;default value<br/>right |
| text-decoration | 文本装饰                                          | none: &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Recommended**， 用来删除本来带删除线的文本<br/>underline:  &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;下划线<br/>overline： &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;上划线<br/>line-through:  &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 删除线 |
| text-indent     | 首行缩进                                          | px:   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;像素<br/>em: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;相对单位，当前元素(font-size)一个文字的大小。**Recommended** |
|                 |                                                   | px<br/>修改行间距时，文本高度font-size不会变，改变的是上间距和下间距<img src="https://erick-typora-image.oss-cn-shanghai.aliyuncs.com/img/image-20230703104652164.png" alt="image-20230703104652164" style="zoom: 25%;" /> |

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

### 3.1 行高

- line-height: px
- 修改line-height时，文本高度font-size不会变，改变的是上间距和下间距
- 如果不写line-heigh时，浏览器会根据font-size值，给一个默认的line-height值
- 受字体原因影响，文本在一行中，并不是绝对垂直居中

![image-20240616135657189](https://erick-typora-image.oss-cn-shanghai.aliyuncs.com/img/image-20240616135657189.png)

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <style>

        /*写法一：显示根据font-size值，给一个line-height值*/
        #first {
            font-size: 40px;
            line-height: 100px;
            background-color: green;
        }

        /*写法二：normal，
               1. 浏览器根据font-size值，给line-height一个合适的值
               2. 不写line-height，就是默认normal*/
        #second {
            font-size: 40px;
            line-height: normal;
            background-color: blue;
        }

        /*写法三：倍数，用的比较多
             1. 根据font-size值，乘以对应的倍数，就是line-height
             2. 可以写数值 2， 或者 200%*/

        #third {
            font-size: 40px;
            line-height: 200%;
            background-color: gray;
        }
    </style>

</head>
<body>

<div id="first">
    舒展Hi,what are you doing?
</div>

<div id="second">
    舒展Hi,what are you doing?
</div>

<div id="third">
    舒展Hi,what are you doing?
</div>

</body>
</html>
```

### 3.2 文本垂直

#### 垂直-top-line-height

- 默认就是这种方式

#### 垂直居中~line-height

- 不太推荐的一种方式

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <style>
        div {
            /*div盒子的高度*/
            height: 400px;
            font-size: 40px;
            /*行高和盒子一样高*/
            line-height: 400px;
            background-color: green;
        }
    </style>

</head>
<body>

<div id="first">
    舒展Hi,what are you doing?
</div>

</body>
</html>
```

![image-20240616142034070](https://erick-typora-image.oss-cn-shanghai.aliyuncs.com/img/image-20240616142034070.png)

#### 垂直-bottom~line-height

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <style>
        div {
            /*div盒子的高度*/
            height: 400px;
            font-size: 40px;
            /*行高是盒子的两倍-fontsize-字体设计的原因
             400*2-40-10*/
            line-height: 750px;
            background-color: green;
        }
    </style>

</head>
<body>

<div id="first">
    舒展Hi,what are you doing?
</div>

</body>
</html>
```

![image-20240616142335012](https://erick-typora-image.oss-cn-shanghai.aliyuncs.com/img/image-20240616142335012.png)

## 4. 背景

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

# 显示模式

- 标签元素以什么方式进行显示，比如div独占一行，一行可以放多个span

## 1. Block元素

- 其中div是最典型的块元素
- 是一个容器及盒子，里面可以放block或者inline元素

```bash
# 特点
- 独占一行，不会与任何元素共用一行，从上到下排列
- width：默认撑满父元素
- height：默认由内容撑开

- height，width，外边距，内边距可控

# 注意
- 文字类的元素内，不能使用块级别元素， 比如p，h系列，里面不能再放其他块级元素

# 常见
- h1-h6, p, div, ul, ol, li, from   option
```

### 默认方式

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <style>

        body{
            background-color: aqua;
        }

        /*父元素是：body*/
        #first {
            background-color: green;
        }

        #second {
            background-color: pink;
        }

        #third {
            background-color: gray;
        }
    </style>

</head>
<body>

<div id="first">
    舒展Hi,what are you doing?
</div>
<div id="second">
    LucyHi,what are you doing?
</div>
<div id="third">
    张三Hi,what are you doing?
</div>

</body>
</html>
```

![image-20240616151242189](https://erick-typora-image.oss-cn-shanghai.aliyuncs.com/img/image-20240616151242189.png)

### 设置高宽

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <style>

        body {
            background-color: aqua;
        }

        /*父元素是：body*/
        #first {
            background-color: green;
            width: 400px;
            height: 200px;
        }

        #second {
            background-color: pink;
            width: 400px;
            height: 200px;
        }

        #third {
            background-color: gray;
            width: 400px;
            height: 200px;
        }
    </style>

</head>
<body>

<div id="first">
    舒展Hi,what are you doing?
</div>
<div id="second">
    LucyHi,what are you doing?
</div>
<div id="third">
    张三Hi,what are you doing?
</div>

</body>
</html>
```

![image-20240616151338513](https://erick-typora-image.oss-cn-shanghai.aliyuncs.com/img/image-20240616151338513.png)

## 2. Inline元素

- span是经典的行内元素
- Inline元素内，只能容纳文本或其他Inline元素

```bash
# 特点
- 相邻元素在一行上，一行可以显示多个
- 如果一行容纳不下，则继续在下一行从左往右排列

- width：默认就是本身内容的宽度， 直接设置无效
- height：默认由内容撑开，直接设置无效

# tip
- 链接里面不能再放链接

# 常见
- br  em   strong      a     label
```

![image-20240616151730959](https://erick-typora-image.oss-cn-shanghai.aliyuncs.com/img/image-20240616151730959.png)

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <style>

        body {
            background-color: aqua;
        }

        /*父元素是：body*/
        #first {
            background-color: green;
            width: 400px;
            height: 200px;
        }

        #second {
            background-color: pink;
            width: 400px;
            height: 200px;
        }

        #third {
            background-color: gray;
            width: 400px;
            height: 200px;
        }
    </style>

</head>
<body>

<sapn id="first">
    舒展Hi,what are you doing?
    <sapn/>
    <sapn id="second">
        LucyHi,what are you doing?
    </sapn>
    <sapn id="third">
        张三Hi,what are you doing?
    </sapn>

</body>
</html>
```

## 3. Inline-Block元素

- 行内块元素，内联块元素
- 同时具有块元素和行内元素的特点

```bash
# Inline特点
- 不独占一行，和相邻行内块元素在一行上，之间会有空白缝隙
- 一行中不能容纳的行内元素，会在下一行继续从左向右排列
- 默认宽度：由内容撑开
- 默认高度：由内容撑开

# Block特点
- 可以通过CSS来设置宽高

#  常见
- 图片：img
- 单元格：td th
- 表单控件： input textarea    select  button
```

![image-20240616152459810](https://erick-typora-image.oss-cn-shanghai.aliyuncs.com/img/image-20240616152459810.png)

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <style>

        body {
            background-color: aqua;
        }

        img {
            height: 500px;
        }

    </style>

</head>
<body>

<img src="../image/1.jpg">
<img src="../image/1.jpg">
<img src="../image/1.jpg">
<img src="../image/1.jpg">

</body>
</html>
```

## 4. 模式转换

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
        body {
            background-color: gray;
        }

        /*行内元素转块元素*/
        a {
            color: black;
            width: 150px;
            height: 30px;
            background-color: pink;
            display: block;
        }
         
         /*block元素转inline元素*/
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

![image-20240616154244320](https://erick-typora-image.oss-cn-shanghai.aliyuncs.com/img/image-20240616154244320.png)

# 盒子模型

- 会把所有的html元素都看成是一个盒子

## 1. Content

- 盒子的内容区
- 默认充满外部盒子的宽度

## 2. padding

- 内边距：盒子中，content距离盒子边缘的距离

| 值个数                        | 含义               |
| ----------------------------- | ------------------ |
| padding: 50px                 | 四个都是50px       |
| padding: 50px 20px            | 上下是50，左右是20 |
| padding: 50px 10px 20px       | 上50，左右10，下20 |
| padding: 10px 20px 30px 40 px | 上右下左           |

```css
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>

    <style>
        body {
            background-color: gray;
        }

        div {
            width: 200px;
            height: 100px;
            background-color: pink;
            padding-left: 20px;
            padding-right: 30px;
            padding-bottom: 40px;
            padding-top: 50px;
        }
    </style>
</head>
<body>

<div>
    你好
</div>

</body>
</html>
```

![image-20240616173004031](https://erick-typora-image.oss-cn-shanghai.aliyuncs.com/img/image-20240616173004031.png)

## 3. border

- 盒子的边框

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

## 4. margin

### 4.1 基本使用

- 外边距：当前设置的盒子和其他盒子之间的距离，用法和padding一样
- 默认盒子和盒子之间，距离为0
- 上下左右

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

        .second {
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

![image-20240616173531540](https://erick-typora-image.oss-cn-shanghai.aliyuncs.com/img/image-20240616173531540.png)

### 4.2 单个块级元素水平居中

- 盒子中，让盒子内部的一个块级元素居中
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

### 4.3 嵌套元素垂直外边距塌陷

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

## 4. 清除内外边距

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

## 5. 圆角边框

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

## 6. 盒子阴影

- box-shadow:
- 需求：鼠标经过时，对盒子添加阴影,    div:hover{box-shadow}

![image-20230704161012663](https://erick-typora-image.oss-cn-shanghai.aliyuncs.com/img/image-20230704161012663.png)

# 浮动

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

