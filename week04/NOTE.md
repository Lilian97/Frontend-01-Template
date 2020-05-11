# 第四周总结

#### 事件循环

​	事件循环是浏览器执行任务的机制，它会不断循环判断消息队列中是否有任务，队列中的任务都是指宏任务，而宏任务中包含微任务队列，在宏任务结束前后执行微任务队列，直到微任务队列中为空才结束这个宏任务。

- 也就是说所有的JS代码都是一个微任务，只是哪些微任务构成了一个宏任务；执行在JS引擎里的就是微任务，执行在JS引擎之外的就是宏任务，循环宏任务的工作就是事件循环。
- 事件循环不属于JavaScript引擎实现的东西，而是由浏览器或NodeJS宿主环境实现的。
- 一个宏任务里的同步代码可以理解为微任务，只不过比宏任务里的异步代码的微任务优先入队。
- 微任务是没有优先级的，一个宏任务中只存在一个微任务队列，根据入队时间决定微任务顺序，列表里的所有微任务执行完才会执行下一个宏任务。
- Promise的then方法以及async函数里的await（await相当于语法上的then，then在分号之后）会将一个微任务入队，添加在微任务队列的最后。



#### 宏任务

- 渲染事件（如解析 DOM、计算布局、绘制）；
- 用户交互事件（如鼠标点击、滚动页面、放大缩小等）；
- JavaScript 脚本执行事件；网络请求完成、文件读写完成事件。 为了协调这些任务有条不紊地在主线程上执行，页面进程引入了消息队列和事件循环机制，渲染进程内部会维护多个消息队列，比如延迟执行队列和普通的消息队列。然后主线程采用一个 for 循环，不断地从这些任务队列中取出任务并执行任务。我们把这些消息队列中的任务称为宏任务。



#### 微任务

微任务就是一个需要异步执行的函数，执行时机是在主函数执行结束之后、当前宏任务结束之前。

- 微任务和宏任务是绑定的，每个宏任务在执行时，会创建自己的微任务队列。
- 微任务的执行时长会影响到当前宏任务的时长。比如一个宏任务在执行过程中，产生了 100 个微任务，执行每个微任务的时间是 10 毫秒，那么执行这 100 个微任务的时间就是 1000 毫秒，也可以说这 100 个微任务让宏任务的执行时间延长了 1000 毫秒。所以你在写代码的时候一定要注意控制微任务的执行时长。
- 在一个宏任务中，分别创建一个用于回调的宏任务和微任务，无论什么情况下，微任务都早于宏任务执行。



#### 举例

```
async function afoo(){
    console.log("1");
    await new Promise(resolve => resolve());
    console.log("2");
}

new Promise(resolve => (console.log("3"), resolve()))
    .then(()=>(
        console.log("4"), 
        new Promise(resolve => resolve())
            .then(() => console.log("5")) ));

setTimeout(function(){
    console.log("6");
    new Promise(resolve => resolve()) .then(console.log("7"));
}, 0);
console.log("8");
console.log("9");
afoo();

// 3
// 8
// 9
// 1
// 4
// 2
// 5
// 6
// 7
```



##### 解析：

- 第一个宏任务：
  - 3
    - 入队 4
  - 8
  - 9
  - 1
    - 入队 2
  - 4
    - 入队 5
  - 2
  - 5
- 第二个宏任务：
  - 6
    - 入队 7
  - 7





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