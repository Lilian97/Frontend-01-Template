# 第十周总结





##### Range API（属于DOM API）

- 获取Range的方法
  - var range = new Range()
  - range.setStart(element,9)
  - range.setEnd(element,4)
  - var range = document.getSelection().getRangeAt(0)

- 辅助性API
  - range.setStartBefore
  - range.setEndBefore
  - range.setStartAfter
  - range.setEndAfter
  - range.selectNode
  - range.selectNodeContents

- 与插入节点结合使用
  - var fragment = range.extractContents()
  - range.insertNode(document.createTextNode("aaaa"))



#### CSSOM

- document.styleSheets



Rules

- document.styleSheets[0].cssRules
- document.styleSheets[0].insertRule("p {color:pink;}",0)
- document.styleSheets[0].removeRule(0)

Rule

- CSSStyleRule
- CSSChartsetRule
- CSSImportRule
- CSSMediaRule
- CSSFontFaceRule
- CSSPageRule
- CSSNamespaceRule
- CSSKeyframesRule
- CSSKeyframeRule
- CSSSuportsRule
- ....



CSSStyleRule

- selectorText：String
- style：K-V



getComputedStyle

- window.getComputedStyle(elt, pseudoElt);
  - elt：想要获取的元素
  - pseudoElt：可选，伪元素



滚动相关API

- scrollx
- scrolly
- scrollBy
- scrollTo



window.open

window.close

window.innerHeight：页面在浏览器内部的视口大小

window.innerWidth

window.outerHeight：整个浏览窗口大小

window.outerWidth

window.devicePixelRatio：当前显示设备的物理像素分辨率与 CSS 像素分辨率的比率



##### 所有API

whatwg所有的API整理好，其他的可选









