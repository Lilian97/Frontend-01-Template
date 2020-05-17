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

