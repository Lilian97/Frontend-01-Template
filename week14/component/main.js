// require("./foo.js");

function create(Cls, attributes){
    let o = new Cls;

    for(let name in attributes){
        o[name] = attributes[name];
    }

    return o;
    // console.log(arguments);
}


class Div {

}

let component = <Div id="a" class="b" />

console.log(component);
// component.setAttribute("id", "a");