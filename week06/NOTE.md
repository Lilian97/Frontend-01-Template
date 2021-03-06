# 第六周总结

#### 有限状态机处理字符串

##### 有限状态机

- 每一个状态都是一个机器
  - 在每一个机器里，我们可以做计算、存储、输出等等
  - 所有的机器接受的输入是一致的
  - 状态机的每一个机器本身没有状态，如果我们用函数来表示的话，它应该是纯函数（无副作用）
- 每一个机器都知道下一个状态
  - 分为两类
    - 每个机器都有确定的下一个状态（Moore），稍复杂
    - 每个机器根据输入决定下一个状态（Mealy），最常用



##### 使用有限状态机处理字符串

- 在一个字符串中，找到字符“a”

```
function match(string){
	for(let c of string){
		if(c == 'a'){
			return true;
		}
		return false;
	}
}
match("I am groot");
```



- 在一个字符串中，找到字符“ab”

```
function match(string){
	let foundA = false;
	for(let c of string){
		if(c == 'a'){
			foundA = true;
		} else if(c == 'b'){
			return false;
		} else{
			foundA = false;
		}
	}
}
match("I abm groot");//true
match("I amb groot");//false
```



- 在一个字符串中，找到字符“abcdef”

```
function match(string){
	let foundA = false;
	let foundB = false;
	let foundC = false;
	let foundD = false;
	let foundE = false;
	let foundF = false;
	for(let c of string){
		if(c == 'a'){
			foundA = true;
		} else if(foundA && c == 'b'){
			foundB = true;
		} else if(foundB && c == 'c'){
			foundC = true;
		} else if(foundC && c == 'd'){
			foundD = true;
		} else if(foundD && c == 'e'){
			foundE = true;
		} else if(foundE && c == 'f'){
			return true;
		} else{
			foundA = false;
			foundB = false;
			foundC = false;
			foundD = false;
			foundE = false;
			foundF = false;
		}
	}
	return false;
}
match("I abcdefm groot");//true
```

以上解决方法时间复杂度为O(m*n)，由于字符串固定，当要找的字符过多，且时常更换，这种方法就显得很麻烦。如果用状态机来解决问题，代码参考以下：

```
function match(string){
	let state = start;
	for(let c of string){
		state = state(c);
	}
	return state === end;
}

function start(c){
	if(c == 'a')
		return foundA;
	else
		return start;
}

function end(c){
	return end;
}

function foundA(c){
	if(c == 'b')
		return foundB;
	else
		return start;
}

function foundB(c){
	if(c == 'c')
		return foundC;
	else
		return start;
}

function foundC(c){
	if(c == 'd')
		return foundD;
	else
		return start;
}

function foundD(c){
	if(c == 'e')
		return foundE;
	else
		return start;
}

function foundE(c){
	if(c == 'f')
		return end;
	else
		return start;
}

match("I abm grabcdefoot")
```



##### JS中的有限状态机(Mealy)

```
//每个函数是一个状态
function state(input){//函数参数就是输入值
	//在函数中可以自由编写代码，处理每个状态的逻辑
	return next;//返回值作为下一个状态
}

//以下是调用
while(input){
	//获取输入
	state = state(input); //把状态机的返回值作为下一个状态
}
```



- 在一个字符串中，找到字符“abcabx”

```
function match(string){
	let state = start;
	for(let c of string){
		state = state(c);
	}
	return state === end;
}

function start(c){
	if(c == 'a')
		return foundA;
	else
		return start;
}

function end(c){
	return end;
}

function foundA(c){
	if(c == 'b')
		return foundB;
	else
		return start(c);
}

function foundB(c){
	if(c == 'c')
		return foundC;
	else
		return start(c);
}

function foundC(c){
	if(c == 'a')
		return foundA2;
	else
		return start(c);
}

function foundA2(c){
	if(c == 'b')
		return foundB2;
	else
		return start(c);
}

function foundB2(c){
	if(c == 'x')
		return end;
	else
		return foundB(c);
}

match("aabcabx");
```



浏览器：当输入URL按下回车时发生了什么？

![image-20200517195713328](C:\Users\panliMa\AppData\Roaming\Typora\typora-user-images\image-20200517195713328.png)





#### HTML的解析

- 第一步：拆分文件
  - 为了方便文件管理，我们把parser单独拆到文件中
  - parser接受HTML文本作为参数，返回一棵DOM树
  - 参考解析DOM树中的1-splitFile
- 第二步：创建状态机
  - 我们用FSM来实现HTML的分析
  - 在HTML标准中，已经规定了HTML的状态
  - Toy-Browser只挑选其中一部分状态，完成一个最简版本
  - 参考解析DOM树中的2-initFSM
- 第三步：解析标签
  - 主要的标签有：开始标签、结束标签和自封闭标签
  - 在这一步我们暂时忽略属性
  - 参考解析DOM树中的3-ParserTag
- 第四步：创建元素
  - 在状态机中，除了状态迁移，我们还会加入业务逻辑
  - 我们在标签结束状态提交标签token
  - 参考解析DOM树中的4-emitToken
- 第五步：处理属性
  - 属性值分为单引号、双引号、无引号三种写法，因此需要较多状态处理
  - 处理属性的方式跟标签类似
  - 属性结束时，我们把属性加到标签token上
  - 参考解析DOM树中的5-attribute
- 第六步：构建DOM树
  - 从标签构建DOM树的基本技巧是使用栈
  - 遇到开始标签时创建元素并入栈，遇到结束标签时出栈
  - 自封闭节点可视为入栈后立刻出栈
  - 任何元素的父元素是它入栈前的栈顶
  - 参考解析DOM树中的6-constructTree
- 第七步：文本节点
  - 文本节点与自封闭标签处理类似
  - 多个文本节点需要合并
  - 参考解析DOM树中的7-combineText





#### CSS计算，排版,渲染，合成

- 环境准备：npm install css
- 第一步：收集CSS规则
  - 遇到style标签时，我们把CSS规则保存起来
  - 这里我们调用CSS Parser来分析CSS规则
  - 这里我们必须要仔细研究此库分析CSS规则的格式
  - 参考css-computing文件中的目录1
- 第二步：添加调用
  - 当我们创建一个元素后，立即计算CSS
  - 理论上，当我们分析一个元素时，所有CSS规则已经收集完毕
  - 在真实浏览器中，可能遇到写在body的style标签，需要重新CSS计算的情况，这里我们忽略
  - 参考css-computing文件中的目录2
- 第三步：获取父元素序列
  - 在computeCSS函数中，我们必须知道元素的所有父元素才能判断元素与规则是否匹配
  - 我们从上一步骤的stack可以获取到当前元素所有的父元素
  - 因为我们首先获得是“当前元素”，所以我们获得和计算父元素匹配的顺序是从内向外
  - 举例，div div #myid，首先匹配到当前元素的“#myid”，再去匹配两个div父元素
  - 参考css-computing文件中的目录3
- 第四步：拆分选择器
  - 选择器也要从当前元素向外排列
  - 复杂选择器拆成针对单个元素的选择器，用循环匹配父元素队列
  - 参考css-computing文件中的目录4
- 第五步：计算选择器与元素匹配
  - 根据选择器的类型和元素属性，计算是否与当前元素匹配
  - 这里仅仅实现了三种基本选择器，实际的浏览器中要处理复合选择器
  - 参考css-computing文件中的目录5
- 第六步：生成computed属性
  - 一旦选择匹配，就应用选择器到元素上，形成computedStyle
  - 参考css-computing文件中的目录6
- 第七步：明确规则覆盖关系
  - CSS规则根据specificity和后来优先规则覆盖
  - specificity是个四元组，越左边权重越高
  - 一个CSS规则的specificity根据包含的简单选择器相加而成
  - 参考css-computing文件中的目录7

