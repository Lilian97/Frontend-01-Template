# 第八周总结

#### 重学CSS之选择器

##### 选择器语法

- 简单选择器
  - *
  - div svg|a（注意：svg中的a与HTML中的a不同）
  - .cls
  - #id
  - [attr=value]
  - :hover
  - ::before
- 复合选择器
  - <简单选择器><简单选择器><简单选择器>
  - *或者div必须写在最前面
- 复杂选择器
  - <复合选择器> <sp> <复合选择器>
  - <复合选择器> ">" <复合选择器>
  - <复合选择器> "~" <复合选择器>
  - <复合选择器> "+" <复合选择器>
  - <复合选择器> "||" <复合选择器>：“||”表示table里面的一列，由于比较复杂，浏览器实现不好，开发中不常用



##### 选择器优先级

选择器优先级的练习

- div #a.b.c[id=x]
  - [id=x]跟class优先级相同
  - 【0 1 3 1】
- #a:not(#b)
  - not不参与优先级计算
  - 【0 2 0 0】
- *.a
  - *不参与优先级计算
  - 【 0  0 1 0】
- div.a
  - 【0 0 1 1】

总结：

1. 四元组代表选择器的权重，0位最高以此类推，【行内样式，id，class，tag】。
2. 部分伪类会参与优先级计算，但:not不参与
3. *不参与优先级计算



##### 伪类

- 链接/行为
  - :any-link
  - :link :visited
  - :hover
  - :active
  - :focus
  - :target
- 树结构
  - :empty
  - :nth-child()
  - :nth-last-child()
  - :first-child :last-child :only-child
- 逻辑性
  - :not伪类
  - :where :has

##### 伪元素

- ::before
- ::after
- ::first-line
- ::first-letter

##### 可用属性

- first-line
  - font系列
  - color系列
  - background系列
  - word-spacing
  - letter-spacing
  - text-decoration
  - text-transform
  - line-height
- first-letter
  - font系列
  - color系列
  - background系列
  - word-spacing
  - letter-spacing
  - text-decoration
  - text-transform
  - line-height
  - float
  - vertical-align
  - 盒模型系列：margin、padding、border
- 总结
  - first-letter可以设置float，而first-line不可以，原因在于first-line设置float会脱离正常流，first-line就不再是第一行了。
  - 字体会影响第一行的内容，但first-line却可以设置font相关属性，原因是，浏览器并非是先计算好哪些文字有first-line属性再去排版，而是在排版过程中，把first-line相关属性直接加在字体上，文字一个一个地渲染，当第一行排满无法继续容纳更多的字体，就会把下一个字的first-line伪类去掉，这样字体大小不会对first-line造成影响。





#### 重学CSS之排版

- 盒（box）
  - 区分标签（Tag）、元素（element）、盒（box）
  - HTML代码中可以书写开始标签、结束标签和自封闭标签
  - 一对起止标签，表示一个元素
  - DOM树中存储的是元素和其他类型的节点（node）
  - css选择器选中的是元素
  - css选择器选的是元素，在排版时可能产生多个盒
  - 排版和渲染的基本单位是盒
  
- 盒模型

  - box-sizing
    - content-box：只包含内容的宽度
    - border-box：包含内容（content）和内边距（padding）的宽度

  ​	

![:](C:\Users\panliMa\AppData\Roaming\Typora\typora-user-images\image-20200603211947783.png)



- 正常流



- 正常流排版
  - 收集盒进行
  - 计算盒在行中的排布
  - 计算行的排布



![image-20200603214233659](C:\Users\panliMa\AppData\Roaming\Typora\typora-user-images\image-20200603214233659.png)



- 正常流的行模型（IFC）

  - vertical-align的属性值尽量用top、bottom、middle，避免使用text-bottom、text-top这类与文字相关的值
  - 如果子元素的高度超过了line-height，对齐方式的行高以最高的子元素的高度为准；如果子元素高度小于line-height，对齐方式的行高以line-height为准。

  

- float与clear



- margin折叠



- BFC

