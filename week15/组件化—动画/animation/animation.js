export class Timeline {
    tick(){
        console.log("tick");
        requestAnimationFrame(()=>this.tick());
    }
    start(){
        this.tick();
    }
}

export class Animation {
    
}
