# 第七周总结

#### 浏览器工作原理之排版

第一步：明确主轴交叉轴等概念

![image-20200524220158804](C:\Users\panliMa\AppData\Roaming\Typora\typora-user-images\image-20200524220158804.png)

第二步：收集元素进行

- 分行
  - 根据主轴尺寸，把元素分进行
  - 若设置了no-wrap，则强行分配进第一行

![image-20200524220338841](C:\Users\panliMa\AppData\Roaming\Typora\typora-user-images\image-20200524220338841.png)



第三步：计算主轴

- 计算主轴方向
  - 找出所有flex元素
  - 把主轴方向的剩余尺寸按比例分配给这些元素
  - 若剩余空间为负数，所有flex元素为0，等比压缩剩余元素

![image-20200524220431538](C:\Users\panliMa\AppData\Roaming\Typora\typora-user-images\image-20200524220431538.png)

第四步：计算交叉轴

- 计算交叉轴方向
  - 根据每一行中最大元素尺寸计算行高
  - 根据行高flex-align和item-align，确定元素具体位置

![image-20200524220521145](C:\Users\panliMa\AppData\Roaming\Typora\typora-user-images\image-20200524220521145.png)







#### 浏览器工作原理之绘制

第一步：绘制单个元素

- 绘制需要依赖一个图形环境
- 我们这里采用了npm包images
- 绘制在一个viewport上进行
- 与绘制相关的属性：background-color、border、background-images等

第二步：绘制DOM

- 递归调用子元素的绘制方法完成DOM树的绘制
- 忽略一些不需要绘制的节点
- 实际浏览器中，文字绘制是难点，需要依赖字体库，toy-browser这里忽略
- 实际浏览器中，还会对一些图层做compositing，我们这里也忽略了







#### 重学CSS

第一步：CSS语法的研究

- css总体结构
  - @charset
  - @import
  - stylesheet
  - rules
    - @media
    - @page
    - rule

第二步：css @ 规则的研究

- 

第三步：CSS规则的结构

第四步：初步构建CSS知识体系

第五步：

第六步：