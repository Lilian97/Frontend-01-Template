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

