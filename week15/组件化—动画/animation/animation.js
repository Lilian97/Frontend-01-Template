export class Timeline {
    constructor(){
        
    }
    tick(){
        console.log("tick");
        requestAnimationFrame(()=>this.tick());
    }
    start(){
        this.tick();
    }
    add(animation){

    }
}

export class Animation {
    constructor(object, property, start, end, duration, delay, timingFunction){
        this.object = object;
        this.property = property;
        this.start = start;
        this.end = end;
        this.duration = duration;
        this.delay = delay;
        this.timingFunction = timingFunction || ((start, end) => {
            return (t) => start + t * (end - start)
        })
    }
}
