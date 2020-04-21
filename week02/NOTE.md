# 第二周总结

### 编程语言通识

#### 语言按语法分类

- 非形式语言
  - 中文、英文
- 形式语言（乔姆斯基谱系）
  - 0型	无限制文法  	——对生成式a→β不作特殊限制
  - 1型	上下文相关文法  	——某个词放在不同地方有不同的语义
  - 2型	上下文无关文法  	——一个词放在任何地方都只有固定的语义
  - 3型	正则文法  	——



#### 产生式(BNF)

- 用尖括号括起来的名称表示语法结构名
- 语法结构分为基础结构和复合结构
  - 基础结构成为终结符
  - 复合结构需要用其他语法结构定义，称为非终结符
- 引号和中间的字符表示终结符
- 可以有括号
- *表示可以重复多次
- | 表示或
- +表示至少一次

例：

1、定义单个的数字，0-9；

<Number>::="0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" 

2、定义十进制数字，不能以0开头

<DecimalNumber> ::=  "0" | (("1" | "2" | ..... | "9")  <Number>* )

3、定义基本的表达式，数字或者带括号的逻辑运算

<PrimaryExpression>  ::= <DecimalNumber> | "("  <LogicalExpression>  ")"

4、定义乘法表达式，乘法的基本单元是PrimaryExpression，也就是括号（）的优先级最高。

​	*和/的表达式都叫乘法表达式，都是左结合的，即是先从左边两两结合计算。

<MultiplicativeExpression> ::= <PrimaryExpression> |

​						<MultiplicativeExpression> "*" <PrimaryExpression> |

​						<MultiplicativeExpression> "/" <PrimaryExpression> 

5、定义加法表达式，加法的基本单元是乘法表达式，意味着乘法的优先级	比加法的高，+和-的表达式都是加法表达式，都是左结合。

<AdditiveExpression> ::= <MultiplicativeExpression> |

​						<AdditiveExpression> "+" <MultiplicativeExpression> |

​						<AdditiveExpression> "-" <MultiplicativeExpression>

6、定义逻辑运算表达式，逻辑运算的基本单元是加法表达式，意味着加法的优先级比逻辑运算的要高，||和&&的表达式都是逻辑表达式，都是左结合。

<LogicalExpression> ::= <AdditiveExpression> |

​						<LogicalExpression> "||" <AdditiveExpression> |

​						<LogicalExpression> "&&" <AdditiveExpression>



#### 通过产生式理解乔姆斯基谱系

- 0型	无限制文法
  - ?::=?
  - 例如：<a> <b>::="c"、<a><b>::="c"<d>等，::=两边没有任何限制
- 1型	上下文相关文法
  - ?<A>?::=?<B>?
  - 例如，"a" <b> "c" ::= "a" "x" "c" ，::=两边有固定格式，如例子中的a、c
- 2型	上下文无关文法
  - <A>::=?
  - 例，上文中的BNF，::=左边只有一个非终结符
- 3型	正则文法
  - <A> ::=<A>?		正确写法
  - <A> ::=?<A>		错误写法
  - 只允许左递归



#### 其他产生式

EBNF	ABNF 



#### 现代语言的特例

- C++中，可能表示称号或者指针，具体是哪个，取决于*前面的标识符是否被声明。但声明可能出现在之前非常远的地方，语法与语义相关，所以**C++是非形式化语言**。
- VB中，<可能是小于号，也可能是XML直接量的开始，取决于当前位置是否可以接受XML直接量，所以VB是1型文法。
- Python中，行首的tab符和空格会根据上一行行首空白一一定规则被处理成虚拟终结符indent或dedent。不好定义Python，有可能会被打成非形式语言。
- JavaScript中，/ 可能是除号，也可能是正则表达式开头，处理方式类似VB；字符串末班中营业需要特殊处理 }，还有自动插入分号规则。所以JavaScript是1型文法。



#### 图灵完备性

- 命令式——图灵机
  - goto				（与if、whlie结合使用）
  - if和whlie
- 声明式——lambda
  - 递归式



#### 动态与静态

- 动态
  - 在用户设备上、在线服务器上
  - 产品实际运行中
  - Runtime
- 静态
  - 在程序员设备上
  - 产品开发时
  - Compiletime
- 静态更加方便调试解决问题

#### 类型系统

- 动态系统与静态系统
- 强类型与弱类型
  - 强类型：无隐形转换
  - 弱类型：有隐式转换
- 复合类型
  - 结构体
  - 函数签名：（T1,T2)=>T3，参数和返回值，其位置和数量都必须一致
- 子类型
  - 逆变：凡是能用Function<Child>的地方，都能用Function<Parent>
  - 协变：凡是能用Arrary<Parent>的地方，都能用Arrary<Child>



#### 一般命令式编程语言

- Atom
  - Identifier
  - Literal
- Expression
  - Atom
  - Operator
  - Punctuator
- Statement
  - Expression
  - Keywords
  - Punctuator
- Structure
  - Function
  - Class
  - Process
  - Namespace
- Program
  - Program
  - Module
  - Package
  - Library





### javaScript词法类型

#### Unicode

- 应用范围最广的字符集
- 开发中使用Basic Latin 与ASCII码兼容，U+0000— U+007F
- cjk是中日韩三国文字编码，BMP（Basic Multilingual Plane），基本多文种平面，范围是U+0000—U+FFFF
- “\u”转义。例如，“厉害”.codePointAt(0).toString(16)可以把“厉害”转义为"\u5389\u5bb3"



#### InputElement

- whiteSpace
  - <TAB>	制表符，一般4位或8位
  - <VT>	  纵向制表符，现代排版系统对其并无特殊对待
  - <NBSP>  不间断空格，可以产生两个单词之间既有空格，在换行时又不会分开的效果。
  - <FF>       Form Feed
  - <ZWNBSP>  zero width no break space ，零宽空格
  - <SP>       推荐开发时使用
  - <USP>     包括以上的某些
- LineTerminator
  - <LF>	Line Feed,"\n"，推荐开发时使用
  - <CR>	回车，"\r"
  - <LS>	换行符，屏蔽windows和linux的区别
  - <PS>	分页符
- Comment
  - 单行注释，//
  - 多行注释，/*            */
- Token
  - Punctuator
    - 符号，等号、分号、大于号、小于号等等
  - IdentifierName
    - Identifier（标识符）
      - 变量名：不可与关键字重合
      - 属性名：可与关键字重合
      - var class不合法，a.class=10;合法
    - Keywords（关键字）
    - Future reserved Keywords（保留字）:enum
      - Undefined在局部可以改变值，在全局不可以；
      - Null未被设计成关键字，但它的值不可以改变
  - Literal
    - Number
      - IEEE 754 Double Float
        - f符号位 	Sign(1)
        - 指数位 	 Exponent(11)
        - 小数部分   Fraction(52)
      - Grammar
        - DecimalLiteral（以下为合法值举例）
          - 0
          - 0.
          - .2
          - 1e3或1E3
        - BinaryIntegerLiteral  	 0b11
        - OctalIntegerLiteral 	    0o17
        - HexIntegerLiteral 	  	 0xFF
      - 最佳实践
        - 浮点数作比较时，需要加精度
          - Math.abs(0.1+0.2-0.3)==0 	 ==>false
          - Math.abs(0.1+0.2-0.3)<=Number.EPSLON 	 ==>true
        - Number.MAX_SAFE_INTEGER，最大安全整数
          - 超高精度比较时，最好先转换成整数
    - String
      - 字符集
        - ASCII
        - Unicode
        - UGS：U+0000—U+FFFF
        - GB：GB2312、GBK(GB13000)、GB18030
        - ISO-8859
        - BIG5
      - Character	   字符
      - Code Point	   码点
      - Encoding
        - UTF
          - UTF-8	   使用8位存储
          - UTF-16	 使用16位存储，实际内存中是这种方式
      - Grammar
        - "abc"
        - 'abc'
        - ``
    - Boolean
      - false
      - true
    - Null
    - Undefined