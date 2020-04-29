##### 1、写一个String转Number的函数 convertStringToNumber

```
function hexConversion(number){
	if(number>=17 &&number<=22){
		return number-7;
	} else if(number>=49 && number<=54){
		return number-39;	
	}
}
function convertStringToNumber(string, radix){
	if(arguments.length <2)
		radix=10;
	let flag=/e|E/.test(string);
	
	if(flag){
		//对科学计数法的字符串单独处理
        let logNumber = Number(string.match(/\d+$/)[0]);
        let number = string.match(/^[\d\.]+/)[0].replace(/\./, '');
        if (/e-|E-/.test(string)) {
          return Number(number.padEnd(logNumber + 1, 0));
        } else {
          return Number(number.padStart(logNumber + number.length, 0).replace(/^0/, '0.'));
        }
		
	} else{
	
		//处理进制问题
		let chars = string.split('');
		let number = 0,i=0;
		
        while(i<chars.length && chars[i]!=='.'){
            number=number*radix;
            let temp=chars[i].codePointAt(0) - '0'.codePointAt(0);
            if(temp>9){
            	number+=hexConversion(temp);
            } else{
            	number += temp;
            }
            i++;
        }
        
        if(chars[i]=='.')  i++;
        
        let fraction=1;
        
        while(i<chars.length){
            fraction = fraction/radix;
            let temp=chars[i].codePointAt(0) - '0'.codePointAt(0);
            if(temp>9){
            	number+=(hexConversion(temp))*fraction;
            } else{
            	number += temp*fraction;
            }
            i++;
        }	
        
        return number;
		
	}
}

//convertStringToNumber('100',8);
```





##### 2、写一个Number转String的函数convertNumberToString

```


function convertNumberToString(number, radix) {
  let integer = Math.floor(number);
  let fraction = String(number).match(/\.\d+$/);

  if (fraction) {
    fraction = fraction[0].replace('.', '');
  }

  let string = '';

  while (integer > 0) {
    string = String(integer % radix) + string;
    integer = Math.floor(integer / radix);
  }

  return fraction ? `${string}.${fraction}` : string;
}




```





##### 3、总结JavaScript中的特殊对象