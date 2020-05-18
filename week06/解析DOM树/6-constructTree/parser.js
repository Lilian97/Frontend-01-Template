let currentToken = null;
let currentAttribute = null;

let stack = [{
    type: "document",
    children:[]
}];

function emit(token){
    
    if(token.type === "text")
        return;
    console.log(token.tagName);
    let top = stack[stack.length-1];
    // console.log(top);
    if(token.type == "startTag"){
        let element = {
            type: "element",
            children:[],
            attributes:[]
        };

        element.tagName = token.tagName;

        for(let p in token){
            if(p != "type" && p != "tagName")
            element.attributes.push({
                name:p,
                value:token[p]
            });
        }

        top.children.push(element);
        element.parent = top;
        // console.log(top);
        if(!token.isSelfClosing)
            stack.push(element);
        
        currentTextNode = null;
    } else if(token.type == "endTag"){
        // console.log(top);
        if(top.tagName != token.tagName){
            throw new Error("Tag start end doesn't match!");
        } else {
            stack.pop();
        }
        currentTextNode = null;
    }
}

const EOF = Symbol("EOF");  //EOF: End of File

function data(c){
    if(c == "<"){
        return tagOpen;
    } else if(c == EOF){
        emit({
            type:"EOF"
        });
        return ;
    } else {
        emit({
            type:"text",
            content:c
        });
        return data;
    }
}

function tagOpen(c){
    if(c == "/"){
        return endTagOpen;
    } else if(c.match(/^[a-zA-Z]$/)){
        currentToken = {
            type : "startTag",
            tagName : ""
        }
        return tagName(c);
    } else {
        emit({
            type:"text",
            content:c
        })
        return ;
    }
}

function tagName(c){
    if(c.match(/^[\t\n\f ]$/)){
        return beforeAttributeName;
    } else if(c == "/"){
        return selfClosingStartTag;
    } else if(c.match(/^[a-zA-Z]$/)){
        currentToken.tagName += c;
        return tagName;
    } else if(c == ">"){
        emit(currentToken);
        return data;
    } else {
        currentToken.tagName +=c;
        return tagName;
    }
}

function beforeAttributeName(c){
    if(c.match(/^[\t\n\f ]$/)){
        return beforeAttributeName;
    } else if(c == ">" || c == "/" || c == EOF){
        return afterAttributeName;
    } else if(c == "="){
        
    } else {
        currentAttribute = {
            name : "",
            value : ""
        }
        return attrinbuteName(c);
    }
}

function attrinbuteName(c){
    if(c.match(/^[\t\n\f ]$/) || c == ">" || c == "/" || c == EOF){
        return afterAttributeName(c);
    } else if(c == "="){
        return beforeAttributeValue;
    } else if(c == "\u0000"){

    } else if(c == "\"" || c =="'" || c== "<"){

    } else{
        currentAttribute.name += c;
        return attrinbuteName;
    }
}

function beforeAttributeValue(c){
    if(c.match(/^[\t\n\f ]$/) || c == ">" || c == "/" || c == EOF){
        return beforeAttributeValue;
    } else if(c == "\""){
        return doubleQuotedAttributeValue;
    } else if(c == "\'"){
        return singleQuotedAttributeValue;
    } else if(c == ">"){

    } else {
        return UnqoutedAttributeValue(c);
    }
}

function doubleQuotedAttributeValue(c){
    if(c == "\""){
        currentToken[currentAttribute.name] = currentAttribute.value;
        return afterQuotedAttributeValue;
    } else if(c == "\u0000"){

    } else if(c == EOF){

    } else {
        currentAttribute.value += c;
        return doubleQuotedAttributeValue;
    }
}

function singleQuotedAttributeValue(c){
    if(c == "\'"){
        currentToken[currentAttribute.name] = currentAttribute.value;
        return afterQuotedAttributeValue;
    } else if(c == "\u0000"){

    } else if(c == EOF){

    } else {
        currentAttribute.value += c;
        return doubleQuotedAttributeValue;
    }
}

function afterQuotedAttributeValue(c){
    if(c.match(/^[\\t\n\f ]$/)){
        return beforeAttributeName;
    } else if(c == "/"){
        return selfClosingStartTag;
    } else if(c == ">"){
        currentToken[currentAttribute.name] = currentAttribute.value;
        emit(currentToken);
        return data;
    } else if(c == EOF){

    } else {
        currentAttribute.value += c;
        return doubleQuotedAttributeValue;
    }
}

function UnqoutedAttributeValue(c){
    if(c.match(/^[\\t\n\f ]$/)){
        currentToken[currentAttribute.name] = currentAttribute.value;
        return beforeAttributeName;
    } else if(c == "/"){
        currentToken[currentAttribute.name] = currentAttribute.value;
        return selfClosingStartTag;
    } else if(c == ">"){
        currentToken[currentAttribute.name] = currentAttribute.value;
        emit(currentToken);
        return data;
    } else if(c == "\u0000"){

    } else if(c == "\"" || c== "'" || c == "<" || c =="=" || c== "`"){

    } else if(c == EOF){

    } else {
        currentAttribute.value += c;
        return UnqoutedAttributeValue;
    }
}

function selfClosingStartTag(c){
    if(c == ">"){
        currentToken.isSelfClosing = true;
        emit(currentToken);
        return data;
    } else if(c == "EOF"){

    } else{

    }
}

function endTagOpen(c){
    if(c.match(/^[a-zA-Z]$/)){
        currentToken = {
            type : "endTag",
            tagName : ""
        }
        return tagName(c);
    } else if(c == ">"){

    } else if(c == EOF){
         
    } else {

    }
}

function afterAttributeName(c){
    if(c.match(/^[\\t\n\f ]$/)){
        return afterAttributeName;
    } else if(c == "/"){
        return selfClosingStartTag;
    } else if(c == "="){
        return beforeAttributeValue;
    } else if(c == ">"){
        currentToken[currentAttribute.name] = currentAttribute.value;
        emit(currentToken);
        return data;
    } else if(c == EOF){

    } else {
        currentToken[currentAttribute.name] = currentAttribute.value;
        currentAttribute = {
            name : "",
            value : ""
        };
        return attrinbuteName;
    }
}

module.exports.parserHTML = function parserHTML(html){
    let state = data;
    for(let c of html){
        // console.log(c)
        state = state(c);
    }
    state = state(EOF);
}