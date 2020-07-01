# 第十二周总结

#### 编程训练

##### 使用LL算法构建AST

- 四则运算
  - TokenNumber：0、1、2、3、4、5、6······9的组合
  - Operator：+、-、*、/之一
  - Whitespace：< sp>
  - LineTerminator：< LF>、< CR>
- 产生式



**四则运算表达式**

> <Expression> :=
>
> ​			<AdditiveExpression> <EOF>



**加法表达式**

> <AdditiveExpression> ::= 
>
> ​				<MultiplicativeExpression> |
>
> ​				<AdditiveExpression> <+> <MultiplicativeExpression> |
>
> ​				<AdditiveExpression> <-> <MultiplicativeExpression>



**乘法表达式**

> <MultiplicativeExpression> ::= 
>
> ​					<Number> |
>
> ​					<MultiplicativeExpression> <*> <Number> |
>
> ​					<MultiplicativeExpression> </> <Number> 





##### 字符串分析算法

- 字典树
  - 大量字符串的完整模式匹配
- KMP
  - 长字符串中找子串
- WildCard通配符算法
  - 长字符串中找子串升级版
- 正则
  - 字符串通用模式匹配
- 状态机
  - 通用的字符串分析
- LL LR
  - 字符串多层及结构分析





