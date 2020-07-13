// require("./foo.js");

function createElement(Cls, attributes,...children){
    let o = new Cls({
        timer:{}
    });

    for(let name in attributes){
        o.setAttribute(name, attributes[name]);
    }

    for(let child of children){
        o.appendChild(child);
    }

    return o;
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


    /*
    set cls(v){   //property
        console.log("Parent::class", v);
    }
    set id(v){
        console.log("Parent::id", v);
    }
    */
    
}

/*
class Child {
    constructor(config){
        this.children = [];
        this.root = document.createElement("div");
    }

    setAttribute(name,value){       //attribute
        this.root.setAttribute(name, value);
    }

    appendChild(child){
        child.mountTo(this.root);
    }

    mountTo(parent){
        parent.appendChild(this.root);
    }
}
*/

let component = <Div id="a" cls="b" style="width:100px;height:100px;background:lightgreen;">
    <Div></Div>
    <Div></Div>
    <Div></Div>
</Div>

component.mountTo(document.body);

console.log(component);
// component.setAttribute("id", "a");