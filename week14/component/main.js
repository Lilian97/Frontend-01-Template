// require("./foo.js");

function createElement(Cls, attributes,...children){

    let o;
    if(typeof Cls === "string"){
        o = new Wrapper(Cls);
    } else{
        new Cls({
            timer:{}
        });
    }


    for(let name in attributes){
        o.setAttribute(name, attributes[name]);
    }

    for(let child of children){
        o.appendChild(child);
    }

    return o;
}


class Wrapper {
    constructor(type){
        this.children = [];
        this.root = document.createElement(type);
    }

    setAttribute(name,value){       //attribute
        this.root.setAttribute(name, value);
    }

    appendChild(child){
        this.children.push(child);
    }

    mountTo(parent){
        parent.appendChild(this.root);
        for(let child of this.children){
            child.mountTo(this.root);
        }
    }

}


class Div {
    constructor(config){
        this.children = [];
        this.root = document.createElement("div");
    }

    setAttribute(name,value){       //attribute
        this.root.setAttribute(name, value);
    }

    appendChild(child){
        this.children.push(child);
    }

    mountTo(parent){
        parent.appendChild(this.root);
        for(let child of this.children){
            child.mountTo(this.root);
        }
    }

    
}


let component = <div id="a" cls="b" style="width:100px;height:100px;background:lightgreen;">
    <div></div>
    <div></div>
    <div></div>
</div>

component.mountTo(document.body);

console.log(component);
// component.setAttribute("id", "a");