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



##### CSSOM





