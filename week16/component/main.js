import {createElement, Text, Wrapper} from './createElements';
import {Animation, Timeline } from './animation';
import {ease, linear } from './cubicBezier';
// import {Carousel} from './carousel.view';



class Carousel {
    constructor(config){
        this.children = [];
        this.attributes = new Map();
        this.properties = new Map();
    }

    setAttribute(name,value){       //attribute
        this[name] = value;
    }

    appendChild(child){
        this.children.push(child);
    }

    render(){
        let children = this.data.map(url => {
            let element = <img src={url}/>;
            element.addEventListener("dragstart", e => e.preventDefault());
            return element;
        });
        let root = <div class="carousel">
            {children}
        </div>

        let position = 0;

        let timeline = new Timeline;
        timeline.start();

        let nextPic = () =>{
            let nextPosition = (position + 1) % this.data.length;

            let current = children[position];       //避免操作DOM，以免造成不可预知的bug
            let next = children[nextPosition]; 
            
            
            let currentAnimation = new Animation(current.style, "transform", 
                -100*position, -100-100*position, 500, 0, ease, v=>`translateX(${v}%)`);

            let nextAnimation = new Animation(next.style, "transform", 
                100-100*nextPosition, -100*nextPosition, 500, 0, ease, v=>`translateX(${v}%)`);

            timeline.add(currentAnimation);
            timeline.add(nextAnimation);


            position = nextPosition;

            // 动画起始位置处不能有transition，需要去除
            // current.style.transition = `ease 0s`;     //也可改为none，都是去掉动画效果
            // next.style.transition = `ease 0s`;     

            // current.style.transform = `translateX(${-100 * position}%)`;        //动画起始位置
            // next.style.transform = `translateX(${100 -100 * nextPosition}%)`;

            // setTimeout(function(){                           
            //     current.style.transition = "";  //="" means use css rule;   
            //     next.style.transition = "";

            //     current.style.transform = `translateX(${-100 -100 * position}%)`;   //动画结束位置
            //     next.style.transform = `translateX(${-100 * nextPosition}%)`;

            //     position = nextPosition;
            // },16)       //16毫秒一帧                        
        
            setTimeout(nextPic,3000);
        }
        setTimeout(nextPic,3000);



        return root;
    }

    mountTo(parent){
        this.render().mountTo(parent);
    }
   
}



let component = <Carousel data={[
    "https://static001.geekbang.org/resource/image/bb/21/bb38fb7c1073eaee1755f81131f11d21.jpg",
    "https://static001.geekbang.org/resource/image/1b/21/1b809d9a2bdf3ecc481322d7c9223c21.jpg",
    "https://static001.geekbang.org/resource/image/b6/4f/b6d65b2f12646a9fd6b8cb2b020d754f.jpg",
    "https://static001.geekbang.org/resource/image/73/e4/730ea9c393def7975deceb48b3eb6fe4.jpg",
]} />

component.mountTo(document.body);

console.log(component);
// component.setAttribute("id", "a");