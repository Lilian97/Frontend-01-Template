# 第十一周总结

#### 异步编程

- 回调函数
- promise
- async与await
  - 异常捕获：try catch
- generator

```
function sleep(t{
	return new Promise((resolve,reject) =>{
		setTimeout(resolve,t);
	}
}
async function g(){
	let i = 0;
	while(true){
		await sleep(1000);
		yield i++;
	}
}
for await(let v of g()){
	console.log(v)
}
```





##### 正则表达式

- match

> 1、输入：**"abc".match(/a(b)c/)**
> 输出：["abc", "b", index: 0, input: "abc", groups: undefined]
>
> 可以输出单独输出（）中的匹配项
>
> 
>
> 2、输入：**"abc".match(/a(b)c/g)**
> 输出：["abc"]
>
> 加上g后不再单独输出（）中的匹配项
>
> 
>
> 3、输入：**"[a=value]".match(/\[([ ^=]+)=([ ^\]]+)\]/)**
> 输出：(3) ["[a=value]", "a", "value", index: 0, input: "[a=value]", groups: undefined]
>
> 可以利用正则匹配像css中的[a=value]这种
>
> 
>
> 4、输入："[a=value]".match(/\[(?:[ ^=]+)=(?:[ ^\]]+)\]/)
> 输出：["[a=value]", index: 0, input: "[a=value]", groups: undefined]
>
> 加上?:可以取消（）的圈组能力
>
> 总结：（）：捕获
>
> ​			  (?:)：不捕获



- replace

> 1、输入："abc".replace(/a(b)c/,function(str,$1){
>     						console.log(str,$1);
> 							return $1+$1;
> 					})
> 	输出：abc b
> 				"bb"
> 	解析：replace的参数可以传一个函数，$1为匹配的字符
>
> 
>
> 2、输入："abc".replace(/a(b)c/,"$1$1")
> 	输出："bb"
>
> 
>
> 3、输入："abc".replace(/a(b)c/,"$$1$$1")
> 	输出："$1$1"
>
> 



- exec()和lastIndex

  - exec() 方法用于检索字符串中的正则表达式的匹配。

  - 如果字符串中有匹配的值返回该匹配值，否则返回 null。
  - lastIndex 属性用于规定下次匹配的起始位置。
  - 注意：该属性只有设置标志 g 才能使用；仅对exec方法与test方法有效


