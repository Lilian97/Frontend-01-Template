export class Timeline {
    constructor(){
        this.animations = [];
        this.requestId = null;
        this.state = "inited";

        this.tick = () => {
            let t = Date.now() - this.startTime;
            console.log(t);
            let animations = this.animations.filter(animation => !animation.finished);
            for(let animation of animations){
                
                // t = animation.duration + animation.delay;
                let {object, property, template, start, end, timingFunction, delay, duration, startTime } = animation;
    
                let progression = timingFunction((t - delay - startTime) / duration);    //0-1之间，表示进展
    
                if(t > duration + delay + startTime){
                    progression = 1;
                    animation.finished = true;
                }
    
                let value = start + progression * (end - start);
    
                object[property] = template(value);
            }
            if(animations.length)
                this.requestId = requestAnimationFrame(this.tick);
        }


    }
    
    pause(){
        if(this.state !== "playing")
            return ;
        this.state = "paused";
        this.pauseTime = Date.now();
        if(this.requestId !== null)
            cancelAnimationFrame(this.requestId);
    }
    resume(){
        if(this.state !== "paused")
            return ;
        this.state = "playing";
        this.startTime += Date.now() - this.pauseTime;
        this.tick();
    }
    start(){
        if(this.state !== "inited")
            return;
        this.state = "playing";
        this.startTime = Date.now();
        this.tick();
    }
    restart(){
        if(this.state === "playing")
            this.pause();
        this.animations = [];
        this.requestId = null;
        this.state = "playing";
        this.startTime = Date.now();
        this.pauseTime = null;
        this.tick();
    }
    add(animation, startTime){
        this.animations.push(animation);
        animation.finished = false;
        if(this.state === "playing")
            animation.startTime = startTime !== void 0 ? startTime : Date.now() - this.startTime;
        else
            animation.startTime = startTime !== void 0 ? startTime :  0;
            
    }
}

export class Animation {
    constructor(object, property, template, start, end, duration, delay, timingFunction){
        this.object = object;
        this.property = property;
        this.template = template;
        this.start = start;
        this.end = end;
        this.duration = duration;
        this.delay = delay;
        this.timingFunction = timingFunction;      //timingFunction对应的是ease、linear、easeIn、easeOut
    }
}
