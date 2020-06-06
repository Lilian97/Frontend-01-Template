# 第九周总结

#### 重学CSS之动画与绘制

- Animation

  - @keyframes定义
  - animation使用

  ```
  /*keyframes是关键帧，from、to和百分比不可混用*/
  @keyframes mykf{
  	from{
  		background:red;
  	}
  	to{
  		background:yellow;
  	}
  }
  div{
  	animation: mykf 5s infinite;
  }
```
  
  - 属性
    - animation-name：时间曲线
    - animation-duration：动画时长
    - animation-timing-function：动画的时间曲线
    - animation-delay：动画开始前的延迟
    - animation-iteration-count：动画播放次数
    - animation-direction：动画方向
    
    ```
    @keyframes mykf{
    	0%{top:0;transition:top ease;}
    	50%{top:30px;transition:top ease-in;}
    	75%{top:10px;transition:top ease-out;}
    	100%{top:0;transition:top linear;}
    }
    ```
    
    

##### Transition

- transition-property：要变换的属性
- transition-duration：要变幻的时长
- transition-timing-function：时间曲线
- transition-delay：延迟







#### 重学HTML

- HTML的定义：XML与SGML



- HTML标签——语义





- 合法元素
  - Element:<tagname></tagname>
  - Text:text
  - Comment:<!-- comments-->
  - DocumentType:<!Doctype html>
  - ProcessingInstruction:<?a 1?>
  - CDATA:<![CDATA[]]>
- 字符引用
  - &3161；
  - &amp；
  - &lt；
  - &gt；



#### 重学DOM





- 导航类操作
  - parentNode
  - childNodes
  - firstChild
  - lastChild
  - nextSibling
  - previousSibling
- 修改操作
  - appendChild
  - insertBefore
  - removeChild
  - replaceChild
- 高级操作
  - compareDocumentPosition：是一个用于比较两个节点中关系的函数
  - contains：检查一个节点是否包含另一个节点的函数
  - isEuqalNode：检查两个节点是否完全相同
  - isSameNode：检查两个节点是否是同一个节点，实际上在JavaScript中可以用“===”
  - cloneNode：复制一个节点，如果传入参数true，则会连同元素做深拷贝

##### Event

- 





