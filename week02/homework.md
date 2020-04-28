## 第二周作业

##### 1、写一个正则表达式 匹配所有 Number 直接量

```
^(\d*\.?\d*e?\d*|0((b|B)[0-1]*|(o|O)[0-7]*|(x|X)[0-9a-fA-F]*))$
```



##### 2、写一个 UTF-8 Encoding 的函数

```javascript
function utf8Encoding(str){
	let arr = [];
    for (let i = 0; i < str.length; i++) {
      let code = str.codePointAt(i);
      if ( code >= 0x00 && code <= 0x7f) {
        list.push(code);
      } else if (code >= 0x80 && code <= 0x7ff) {
        list.push(0b11000000 | (0b00011111 & (code >> 6)));
        list.push(0b10000000 | (0b00111111 & code));
      } else if (code >= 0x800 && code <= 0xffff) {
        list.push(0b11100000 | (0b00001111 & (code >> 12)));
        list.push(0b10000000 | (0b00111111 & (code >> 6)));
        list.push(0b10000000 | (0b00111111 & code));
      } else if (code >= 0x10000 && code <= 0x10ffff) {
        list.push(0b11110000 | (0b00000111 & (code >> 18)));
        list.push(0b10000000 | (0b00111111 & (code >> 12)));
        list.push(0b10000000 | (0b00111111 & (code >> 6)));
        list.push(0b10000000 | (0b00111111 & code));
      }
    }
   
    let result = list.map((item) => item.toString(16));
    return result;
}
```



##### 3、写一个正则表达式，匹配所有的字符串直接量，单引号和双引号

```
^(?:['"\\bfnrtv\n\r\u2028\u2029]|\\x[0-9a-fA-F]{2}|\\u[0-9a-fa-F]{4})*$

//未得出答案
```





