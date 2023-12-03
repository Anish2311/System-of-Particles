let particles = []
let att = []
let rep = []

class Particle{
    constructor(x,y){
        this.pos = createVector(x,y)
        this.vel = createVector(0,0)
        this.acc = createVector(0,0)
        this.r = 5
        this.col = 50
    }
    update(){
        this.vel.add(this.acc)
        this.pos.add(createVector(5,0))
        this.vel.limit(2)
        this.pos.add(this.vel)
        if(this.pos.x < 0){
            this.pos.x = width
            // this.acc.mult(-1)
        }
        if(this.pos.x > width){
            this.pos.x = 0
        }
        if(this.pos.y < 0){
            this.pos.y = height
            // this.acc.mult(-1)
        }
        if(this.pos.y > height){
            this.pos.y = 0
        }
    }
    show(){
        noStroke()
        fill(150,0,this.col)
        circle(this.pos.x,this.pos.y,this.r)
    }
    setAcc(pos,m,b){
        let f = p5.Vector.sub(pos,this.pos)
        if(b){
            f = p5.Vector.sub(this.pos,pos)
            // f.normalize()
            // f.mult(-1)
        }
        f.setMag(m*10)
        this.acc.add(f)
        // this.acc.mult(2)
        this.acc.limit(1)
    }
    scatter(){
        // this.vel.limit(5)
        this.vel.add(p5.Vector.sub(this.pos,createVector(mouseX,mouseY)).normalize())
    }
}

function setup(){
    createCanvas(window.innerWidth/1, window.innerHeight/1)
    for(let i = 1; i < 16; i++){
        for(let j = 1; j < 16; j++){
            particles.push(new Particle(i * (width/16),j * (height/16)))
        }
    }
}

function draw(){
    background(0,50)
    // fr = particles[0]
    att.forEach(el => {
        fill(0,80,100)
        noStroke()
        circle(el.x,el.y,20)
    })
    rep.forEach(el => {
        fill(100,0,20)
        noStroke()
        circle(el.x,el.y,20)
    })
    particles.forEach(e => {
        particles.forEach(el => {
            let d = e.pos.dist(el.pos)
            let f = false
            if(d < 100){
                f = true
            }
            e.setAcc(el.pos,5/d**2,f)
        });
        let m = width
        att.forEach(el => {
            let d = e.pos.dist(el)
            m = min(m,d)
            if(d < 10){
                e.setAcc(el,100/d**2,true)
            }
            else{
                e.setAcc(el,100/d**2,false)
            }
        });
        rep.forEach(el => {
            let d = e.pos.dist(el)
            e.setAcc(el,100/d**2,true)
        });
        angleMode(DEGREES)
        e.col = map(e.acc.heading(),-360,360,0,255)
        e.update()
        e.show()
    });
}

function mouseDragged(){
    if(key == 'a'){
        att.push(createVector(mouseX,mouseY))
    }
    else if(key == 'r'){
        rep.push(createVector(mouseX,mouseY))
    }
}