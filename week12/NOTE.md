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