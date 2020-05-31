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



【0,2,2,1】

【0,2,0,0】

【0,0,1,1】

【0,0,1,1】



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
  - 
- first-letter
  - 





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



- 正常流



- 正常流排版
  - 收集盒进行
  - 计算盒在行中的排布
  - 计算行的排布



- float与clear



- margin折叠