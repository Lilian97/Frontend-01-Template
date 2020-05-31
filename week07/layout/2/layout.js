function getStyle(element){
    if(!element.style)
        element.style = {};


    for(let prop in element.computedStyle){
        var p = element.computedStyle.value;
        element.style[prop] = element.computedStyle[prop].value;


        if(element.style[prop].toString().match(/px$/)){
            element.style[prop] = parseInt(element.style[prop]);
        }
        if(element.style[prop].toString().match(/^[0-9\.]+$/)){
            element.style[prop] = parseInt(element.style[prop]);
        }
    }
    return element.style;
}

function layout(element){
    if(!element.computedStyle)
        return;
    
    var elementStyle = getStyle(element);

    if(elementStyle.display !== "flex")
        return;
    
    var items = element.children.filter(e => e.type === "element");

    items.sort(function(a, b){
        return (a.order || 0) - (b.order || 0);
    })

    var style = elementStyle;

    ['width', 'height'].forEach(size =>{
        if(style[size] === 'auto' || style[size] === ''){
            style[size] = null;
        }
    })

    if(!style.flexDirection || style.flexDirection === 'auto')
        style.flexDirection = 'row';
    if(!style.alignItems || style.alignItems === 'auto')
        style.alignItems = 'stretch';
    if(!style.justifyContent || style.justifyContent === 'auto')
        style.justifyContent = 'flex-start';
    if(!style.flexWrap || style.flexWrap === 'auto')
        style.flexWrap = 'nowrap';
    if(!style.alignContent || style.alignContent === 'auto')
        style.alignContent = 'stretch';

    var mainSize, mainStart, mainEnd, mainSign, mainBase,
        crossSize, crossStart, crossEnd,crossSign,crossBase;
    if(style.flexDirection === "row"){
        mainSize = 'width';
        mainStart = 'left';
        mainEnd = 'right';
        mainSign = +1;
        mainBase = 0;

        crossSize = 'height';
        crossStart = 'top';
        crossEnd = 'bottom';
    }
    if(style.flexDirection === 'row-reverse'){
        mainSize = 'width';
        mainStart = 'right';
        mainEnd = 'left';
        mainSign = -1;
        mainBase = style.width;

        crossSize = 'height';
        crossStart = 'top';
        crossEnd = 'bottom';
    }

    if(style.flexDirection === 'column'){
        mainSize = 'height';
        mainStart = 'top';
        mainEnd = 'bottom';
        mainSign = +1;
        mainBase = 0;

        crossSize = 'width';
        crossStart = 'left';
        crossEnd = 'right';
    }
    if(style.flexDirection === 'column-reverse'){
        mainSize = 'height';
        mainStart = 'bottom';
        mainEnd = 'top';
        mainSign = -1;
        mainBase = style.height;

        crossSize = 'width';
        crossStart = 'left';
        crossEnd = 'right';
    }
    if(style.flexWrap === 'wrap-reverse'){
        var tmp = crossStart;
        crossStart = crossEnd;
        crossEnd = tmp;
        crossSign = -1;
    } else{
        crossBase = 0;
        crossSign = 1;
    }


    var isAutoMainSize = false;
    if(!style[mainSize]){
        elementStyle[mainSize] = 0;
        for(var i = 0; i < items.length; i++){
            var item = items[i];
            var itemStyle = getStyle(item);
            if(itemStyle[mainSize] !== null || itemStyle !==(void 0))
                elementStyle[mainSize] = elementStyle[mainSize] + itemStyle[mainSize];
                // 把子元素的mainSize累加到父元素的mainSize
        }
        isAutoMainSize = true;
    }



    var flexLine = []
    var flexLines = [flexLine]

    var mainSpace = elementStyle[mainSize]//主轴剩余空间
    var crossSpace = 0;

    for(var i = 0; i < items.length; i++){
        var item = items[i]
        var itemStyle = getStyle(item);    
        // 元素的mainSize为null，就置为零
        if(itemStyle[mainSize] === null){
            itemStyle[mainSize] = 0;
        }


        if(itemStyle.flex){
            flexLine.push(item);
        } else if(style.flexWrap === 'nowrap' && isAutoMainSize){
            mainSpace -= itemStyle[mainSize];
            if(itemStyle[crossSize] !== null && itemStyle[crossSize] !== (void 0))
                crossSpace = Math.max(crossSpace, itemStyle[crossSize]);
            flexLine.push(item);//nowrap时，元素强行塞进第一行
        } else {//元素的mainSize大于一行的mainSize时，把元素的mainSize缩到一行的mainSize
            if(itemStyle[mainSize] > style[mainSize]){
                itemStyle[mainSize] = style[mainSize]
            }
            if(mainSpace < style[mainSize]){
                //如果主轴剩余空间小于元素的mainSize,把主轴交叉轴的剩余空间存起来，把元素放进下一行
                flexLine.mainSpace = mainSpace;
                flexLine.crossSpace = crossSpace;

                flexLine = [];
                flexLines.push(flexLine);

                flexLine.push(item);

                mainSpace = style[mainSize];
                crossSpace = 0;

            } else {
                flexLine.push(item);
            }
            if(itemStyle[crossSize] !== null && itemStyle[crossSize] !== (void 0))
                // 一行的高度取决于这一行最高元素的高度
                crossSpace = Math.max(crossSpace, itemStyle[crossSize])
            // 剩余空间应减掉已经排进来的元素的mainSize
            mainSpace -= itemStyle[mainSize];
        }
    }
    flexLine.mainSpace = mainSpace;

    console.log(items);
}




module.exports = layout;