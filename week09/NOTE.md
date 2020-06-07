# 第九周总结

#### 重学CSS之动画与绘制

- Animation

  - @keyframes定义
  - animation使用

  ```
  /*keyframes是关键帧，from、to和百分比不可混用*/
  @keyframes mykf{
  	from{
  		background:red;
  	}
  	to{
  		background:yellow;
  	}
  }
  div{
  	animation: mykf 5s infinite;
  }
  ```
```
  
  - 属性
    - animation-name：时间曲线
    - animation-duration：动画时长
    - animation-timing-function：动画的时间曲线
    - animation-delay：动画开始前的延迟
    - animation-iteration-count：动画播放次数
    - animation-direction：动画方向
    
```
    @keyframes mykf{
    	0%{top:0;transition:top ease;}
    	50%{top:30px;transition:top ease-in;}
    	75%{top:10px;transition:top ease-out;}
    	100%{top:0;transition:top linear;}
    }
    ```


​    

##### Transition

- transition-property：要变换的属性
- transition-duration：要变幻的时长
- transition-timing-function：时间曲线
- transition-delay：延迟

##### 贝塞尔曲线

##### 



#### 重学CSS之渲染与颜色

- 颜色
  - CMYK与RGB
  - HSL与HSV
- 形状
  - border
  - box-shadow
  - border-radius
  - data uri+svg







#### 重学HTML

- HTML的定义：XML与SGML

  - DTD与XML namespace
    - https://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd
    - http://www.w3.org/1999/xhtml

- HTML标签——语义

  - 实践：仿写wiki
  - < aside >：通常用于描述与主体内容不相关的内容，用来放置广告、侧边栏、正文有关资料、名词解释。
  - < main >：文章主体部分
  - < article >：适用场景：讨论区、评论区、个人博客、新闻文章等
  - < hgroup>、<h1>、<h2>.....<h6>：多个标题标签出现用<hgroup>包裹
  - < hr >：表示故事走向的转变或话题的转变
  - < abbr > ：缩写
  - < nav >：导航栏
  - l列表
    - < ol >、< li >：有序列表
    - < ul >、< li >：无序列表
    - < dl >、< dd>、< dt >：解释型列表。dl定义一个列表，dt是列表标题，dd是带缩进的内容
  - < figure >、< figcaption >：用于文档中插入图片文字说明（figcaption ）
  - < dfn >：对特殊术语或者短语的定义
  - < pre >：可定义预格式化的文本。在pre元素中的文本会保留空格和换行符。
  - < samp >：表示一段用户应该对其没有什么其他解释的文本字符。要从正常的上下文抽取这些字符时，通常要用到这个标签。
  - 引用
    - < cite >：引用文章名
    - < quote >：引用文章的内容
  - < data >：将给定内容与机器可读的翻译相链接。 此元素既为数据处理器提供机器可读值，又在浏览器中为人类呈现可读值。 提示：如果内容与时间或日期相关，则必须使用< time >元素。
  - < address >、< email>：表示文章作者的地址、邮件、使用时要注意
  - < code >：代码



- 合法元素
  - Element:< tagname></ tagname>
  - Text:text
  - Comment:< !-- comments-->
  - DocumentType:< !Doctype html>
  - ProcessingInstruction:< ?a 1?>
  - CDATA:< ![CDATA[ ]] >
- 字符引用
  - &3161；
  - &amp；
  - &lt；
  - &gt；



#### 重学DOM

##### Node

- Element：元素型节点，跟标签相对应
  - HTMLElement：
    - HTMLAnchorElement
    - HTMLAppleElement
    - HTMLAreaElement
    - HTMLAudioElement
    - HTMLBaseElement
    - HTMLBodyElement
    - ....
  - SVGElement：
    - SVGElement
    - SVGAltGlyphElement
    - ....
- Document：文档根节点
- CharacterData：
  - Text：文本节点
  - Comment：注释
  - ProcessingInstruction：处理信息
- DocumentFragment：文档片段
- DocumentType：文档类型



- ##### 导航类操作
  - parentNode
  - childNodes
  - firstChild
  - lastChild
  - nextSibling：返回某个元素之后紧跟的节点:
  - previousSibling

- ##### 修改操作
  
  - appendChild
  - insertBefore
  - removeChild
  - replaceChild
- ##### 高级操作
  
  - compareDocumentPosition：是一个用于比较两个节点中关系的函数
  - contains：检查一个节点是否包含另一个节点的函数
  - isEuqalNode：检查两个节点是否完全相同
  - isSameNode：检查两个节点是否是同一个节点，实际上在JavaScript中可以用“===”
  - cloneNode：复制一个节点，如果传入参数true，则会连同元素做深拷贝



##### Event

- 冒泡与捕获
- element.addEventListener(event, function, useCapture)
  - event:必须。字符串，指定事件名。
  - function: 必须。指定要事件触发时执行的函数。
  - useCapture:可选。布尔值，指定事件是否在捕获或冒泡阶段执行。
    - true：在捕获阶段执行
    - false：默认，在冒泡阶段执行
- 先捕获后冒泡





