# 第三周学习总结

#### JavaScript表达式、类型转换

- Atom
  - Grammar
    - Tree  vs Priority：用树表达优先级
  - Runtime
- Expression（优先级从高到低）
  - Member
    - a.b
    - a[b]：b可以是变量
    - foo\string\
    - super.b
    - super['b']
    - new.target：只能在构造函数中使用
    - new Foo()
  - New
    - new Foo
    - 规定带括号的优先级更高
    - 例，new new cls()  =>       new (new cls());
  - Reference
    - Object
    - Key
    - delete
    - assign
  - Call（比new的优先级低）
    - foo()
    - super()
    - foo()['b']：先new后访问成员/属性
    - foo().b
    - foo()\abc\
  - Left Handside &Right Handside
    - member、new、call合称为Left Handside
    - 再加上其他一些东西成为Right Handside
  - Update
    - a++
    - a--
    - --a
    - ++a
  - Unary（单目运算符）
    - delete a.b
    - void foo()：void后面无论跟什么都会返回undefined，所以会用void 0代替undefined
    - typeof a：typeof null="object",  typeof function(){}="function"
    - +a
    - -a
    - ~a：按位取反
    - !a：两次取反会得到Boolean值
    - await a：a必须是Promise
    - 补充：IIFE是立即执行的函数表达式，由于不能作为开头，通常用括号括起来
  - Exponental
    - **：唯一一个右结合，3 * *2 * *3 =3 * *（2 * *3）
  - Multiplicative
    - */%
  - Additive
    - +-
  - Shift（移位）
    - <<、>>、>>>
  - Relationship（关系比较）
    - <、>、<=、>=、instanceof、in
  - Equality（等号也属于关系比较，但优先级低于关系比较）
    - ==
    - !=
    - ===
    - !==
  - Bitwise
    - &、^、|
  - Logical（短路逻辑）
    - &&
    - ||
  - Conditional
    - ?:    JS中的三目运算符也是短路逻辑
- 类型转换
- Boxing & Unboxing （装箱拆箱)
  - ToPremitive
  - ToString  vs valueof





#### 语句、对象

- Atom
  - Grammar
    - 简单语句
    - 组合语句
    - 声明
  - Runtime
    - Completion Record
    - Lexical Environment



- Completion Record
  - [[type]]：normal,break.continue,return,throw
  - [[value]]：Types，即7种基本类型
  - [[target]]：label



- 简单语句   （前三项产生normal，其余产生非normal）
  - ExpressionStatement：表达式语句，最基础的语句
  - EmptyStatement：空语句，一个分号构成
  - DebuggerStatement：调试语句
  - ThrowStatement：
  - ContinueStatement
  - BreakStatement
  - ReturnStatement
- 复合语句
  - BlockStatement
    - [[type]]：normal
    - [[value]]:
    - [[target]]
    - {很多条语句结构化，形成作用域；顺次执行代码的过程中，遇到非normal语句会改变执行顺序}
  - IfStatement
  - SwitchStatement
  - IterationStatement
    - while(表达式){执行语句}
    - do{执行语句}while(表达式)
    - for( 声明 ;  表达式; 表达式 ;){执行语句}       
    - for( 声明 in 对象){执行语句}  ：  循环对象的属性，而不是属性值
    - for( 声明 of 数组或者generator ){执行语句}   
    - ~~for await( of )~~
    - 补充：for里面的声明可以用var、const/let、in。var有预处理机制，可以先使用后声明，但var最好出现在第一次使用之前。
  - WithStatement
  - LabelledStatement
  - TryStatement



- 标签、循环、break、continue

  - 使用
    - [[type]]: break continue
    - [[value]]:
    - [[target]]:label

  - LabelledStatement：使用性能上并没有问题，但对于阅读代码会产生一定问题，所以很多人不建议使用
  - IterationStatement
  - ContinueStatement
  - BreakStatement
  - SwitchStatement



- try

  - [[type]]: return

  - [[value]]:

  - [[target]]:label

  - try{    

    ​      花括号必须有，不能省略

    ​		throw  a;

    }catch(e){     

    ​		catch可以捕获到throw的内容

       	同样必须有花括号

    }finally{  

    ​          至少要有try和catch

    }



- 声明
  - FunctionDeclaration
  - GeneratorDeclaration
  - AsyncFunctionDeclaration
  - AsyncGeneratorDeclaration
  - VariableDeclaration
  - ClassDeclaration
  - LexicalDeclaration



- Types
  - Number
  - Object
  - String
  - Boolean
  - Symbol
  - Undefined
  - Null



- Object
  - 任何一个对象都是唯一的，与本身状态无关。
  - 状态完全一致的两个对象，也并不相等。
  - 用状态去描述对象，状态的改变即是行为。



- Object—Class
  - 类是常见描述对象的一种方式，归类和分类是两个主要流派
  - 归类：多继承，可以分属多个类
  - 分类：单继承，有一个基类Object



- Object—Prototype
  - 原型是更接近人类认知的描述对象的一种方法。
  - 不采用严谨分类，而是采用相似这样的方式描述对象。
  - 任何对象**只需要描述**自己与原型的**区别**。





- Object Exercise
  - 在设计对象的状态和行为时，总是遵循“行为改变状态”的原则。
- Object in JavaScript
  - 在JavaScript运行时，原生对象的描述方式非常简单，只需要关心原型和属性两部分。
  - 属性（键值对）
    - key（键）
      - Symbol
      - String
    - value（值）
      - Data
      - Accessor
  - DataProperty（数据属性，用于描述状态，如果DataProperty中存储函数，也可以用于描述行为）
    - [[value]]
    - writable：是否可写
    - enumerable：是否能被for in 枚举
    - configurable：只可修改一次，档位false时，不可修改删除
  - AccessorProperty（访问器属性，用于描述行为）
    - get
    - set
    - enumerable
    - configurable
  - 当访问属性时，如果当前对象没有，就会沿着原型找原型对象是否有此名称的属性，二元性对象还可能有原型，因此有“原型链”的说法。这一算法保证了，每个对象只需要描述自己和原型的区别即可。



- Object API/Grammar(使用前三种，且2、3不要混用)
  - {}.Object.defineProperty
  - Object.create / Object.setPrototypeOf / Object.getPrototypeOf
  - new / class / extends
  - new / function / prototype



​		上述为JavaScript中的一般对象，但JavaScript还有一些比较特殊的对象，例如函数对象。



- Function Object
  - 除了一般对象的属性和原型，函数对象还有一个行为 [[ call ]]。
  - 用JavaScript中的function关键字、箭头运算符或者Function构造器穿件的对象，会有 [[ call ]] 这个行为。
  - 用类似 f()  这样的语法把对象当作函数调用时，回放闻到 [[ call ]] 这个行为。如果对应对象没有 [[ call ]] 行为，则会报错。

