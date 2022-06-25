import * as PIXI from 'pixi.js'
import { Game } from '../game'

export class Enemy extends PIXI.AnimatedSprite {

    private readonly gravity: number = 0.0981
    private readonly bounce: number = 0.985

    private app: PIXI.Application
    private speedX: number = 0
    private speedY: number = 0
    private health: number = 5
    private state = 'spawning'
    private grounded = false
    private texturesArray = []

    constructor(app: PIXI.Application, textures:any, x: number, y: number) {
        const [idleTextures, attackTextures] = textures
        super(idleTextures)
        this.texturesArray = textures
        this.app = app


        /*
         * An AnimatedSprite inherits all the properties of a PIXI sprite
         * so you can change its position, its anchor, mask it, etc
         */

        this.x = x
        this.y = y
        this.scale.set(1.5)
        this.animationSpeed = 0.08;
        // this.loop = false
        this.play();

        this.app.stage.addChild(this);
        window.addEventListener("keydown", (e: KeyboardEvent) => this.onKeyDown(e))
        window.addEventListener("keyup", (e: KeyboardEvent) => this.onKeyUp(e))
        // this.onComplete = () => this.destroy()

    }

    onKeyDown(e: KeyboardEvent): void {
        if (this.state === 'spawning') return

        switch (e.key.toUpperCase()) {
            case " ":
                this.attack()
                break;
            case "A":
            case "ARROWLEFT":
                this.runLeft()
                break
            case "D":
            case "ARROWRIGHT":
                console.log(e.key.toUpperCase())
                this.run()
                break
            case "W":
            case "ARROWUP":
                this.jump()
                break
            case "S":
            case "ARROWDOWN":
                // this.speedY = 7
                break
            case "R":
                this.x = this.width
                this.y = 100
                this.state = 'spawning'
                // this.speedY = 7
                break
        }
    }
    onKeyUp(e: KeyboardEvent): void {
        if (this.state === 'spawning') return

        switch (e.key.toUpperCase()) {
            case " ":
                this.state = 'stoppedAttacking'
                this.textures = this.texturesArray[0]
                break;
            case "A":
            case "D":
            case "ARROWLEFT":
                this.textures = this.texturesArray[0]
                this.speedX = 0
            case "ARROWRIGHT":
                this.textures = this.texturesArray[0]
                this.speedX = 0
                break
            case "W":
            case "S":
            case "ARROWUP":
                this.speedY = 0
                this.state = 'falling'
            case "ARROWDOWN":
                this.speedY = 0
                break
        }
    }

    private hit(){
        this.health += -1
        this.textures = this.texturesArray[1]
        this.play()
    }
    private attack(){
        if (this.state === 'attacking') return
        this.textures = this.texturesArray[3]
        this.state = 'attacking'
        this.play()
    }
    private doorOut(){
        if (this.state === 'doorOut') return
        const [doorOutTextures] = this.texturesArray
        this.textures = this.texturesArray[2]
        this.play()
    }
    private run(){
        if (this.state === 'running') return
        this.speedX = 0
        if (this.scale.x === -1.5){
            this.scale.x *= -1;    /* flip vertically */
        }
        this.textures = this.texturesArray[4]
        this.state = 'running'
        this.speedX += 3

        this.play()
    }
    private jump(){
        console.log(this.grounded)
        if (!this.grounded ||this.state === 'jumping') return
        // place on top of height (screen or object)
        // this.y = this.app.screen.bottom - this.height
        const intervalID = setInterval(()=>{
            this.grounded = false
            this.state = 'jumping'
            this.speedY += -3
            // Your code here
            // Parameters are purely optional.
            console.log(a);
            console.log(b);
        }, 500,'paea', '2' );


        // keep the object bouncing without loss

    }
    private runLeft(){
        if (this.state === 'runningLeft') return
        this.speedX = -3
        this.textures = this.texturesArray[4]

        if (this.scale.x !== -1.5){
            this.scale.x *= -1;    /* flip vertically */
        }
        this.state = 'runningLeft'
        this.play()
    }
    public update(delta: number): void {
        super.update(delta)
        this.x += this.speedX
        this.y += this.speedY
        this.keepInScreen(delta)

    }
    private fall(delta:number): void {
        if (this.grounded) return
        if(this.state = 'jumping'){
            console.log('need to fall')
        }
        this.x += this.speedX * delta
        this.y += this.speedY * delta
        this.speedY += this.gravity

    }
    private keepInScreen(delta:number) {

        this.fall(delta)

        // if (this.getBounds().top < 0) {
        //     this.speedY = 0
        //     console.log('this.speedX *= -1')
        //     this.y = (this.getBounds().top + 10)
        //     console.log(this.height)
        // }

        // Collision left
        if (this.getBounds().left < 0) {
            this.speedX = 0
            // this.x = this.getBounds().left + 10
            this.x = this.x + 1

        }
        // Collision right
        if (this.getBounds().right > this.app.screen.right) {
            this.speedX = 0
            this.x = this.x - 1
        }
        // Collision bottom
        if (this.getBounds().bottom > this.app.screen.bottom) {
            if (this.grounded) return
            this.state = 'grounded'
            this.speedY = 0
            this.grounded = true
            this.y = this.app.screen.bottom - 30
        }

    }
    private bounceUpFrom(height: number): void {
        // place on top of height (screen or object)
        // this.y = this.app.screen.bottom - this.height - 50
        // this.speedY = height
        // console.log(this.app.screen.bottom - this.height +1)
        // keep the object bouncing without loss
        this.speedY -= 100
        // this.speedY *= -this.bounce
    }
}
