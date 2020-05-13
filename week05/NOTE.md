# 第五周学习总结

#### JS执行粒度

- JS Context  =>  Realm
- 宏任务
- 微任务（Promise）
- 函数调用（Execution Context）
- 语句/声明
- 表达式
- 直接量/变量/this······



##### Realm









##### 函数调用

```
import {foo} from 'foo.js';
var i=0;
console.log(i);
foo(); //执行foo()时会报错，因为foo()无法访问到i;
console.log(i);
i++;

//foo.js
function foo(){
	console.log(i);
}	
```



- 函数调用时会形成执行上下文栈（Execution Context Stack），有进栈和出栈操作，类似数据结构。
- 当函数调用进入一个函数时，会发生进栈操作（push)；
- 当函数返回时，会发生出栈操作（pop）；
- 栈顶的元素叫 Running Execution Context



##### Execution Context

- 一个Execution Context中包含：

  1. code evaluation state：代码执行位置
  2. Function：可能为null
  3. Script or Module：可能为null
  4. Realm
  5. LexicalEnvironment：词法环境
  6. VariableEnvironment：变量环境
  7. Generator：可能为null

- 分为两种

  - ECMAScript Code Execution Context
    - 1-6

  - Generator Execution Context
    - 1-7



##### LexicalEnvironment

- this
- new.target
- super
- 变量

##### VariableEnvironment

​	历史遗留问题，仅用于处理var声明。



​	不论是**LexicalEnvironment**，还是**VariableEnvironment**，本身都是一个复杂的链表结构，每一项叫Environment Record。

##### Environment Record

​	Environment Records是一个基类，包含三个子类

1. Declarative Environment Records
   - Function Environment Records
   - module Environment Records
2. Global Environment Records：全局
3. Object Environment Records：一般由with产生





##### Function — Closure

举例一：

```
var y = 2;
function foo2(){
	console.log(y);
}
export foo2;
```

```
Function foo2
	Environment Record:
		y:2
	Code:
		console.log(y);
```



举例二：

```
var y = 2;
function foo2(){
	var z = 3;
	return function foo3(){
		console.log(y,z);
	}
	/*如果把return改成
	return () => {
		console.log(y,z);
	}	
	*/
}
var foo3 = foo2();
export foo2;
```

```
Function :foo2
	Environment Record:    =>  Environment Record:
		z:3							y:2
		/*this:global*/
	Code:
		console.log(y,z);
```



##### Realm

- 在js中，函数表达式和对象直接量会创建对象。例：var x={}，var foo=function(){}
- 使用 .  做隐式转换也会创建对象
- 这些对象也是有原型的。如果没有Realm，就无法得知它们的原型是什么。