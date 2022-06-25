import * as PIXI from 'pixi.js'
import { Game } from '../game'

export class Player extends PIXI.AnimatedSprite {

    private readonly gravity: number = 0.0981
    private readonly bounce: number = 0.985

    private app: PIXI.Application
    private speedX: number = 0
    private speedY: number = 0
    private state = 'grounded'
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
        }
    }
    onKeyUp(e: KeyboardEvent): void {
        switch (e.key.toUpperCase()) {
            case " ":
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
                this.bounceUpFrom(this.app.screen.bottom - this.height)
                this.jumping = false
            case "ARROWDOWN":
                this.speedY = 0
                break
        }
    }

    private hit(){
        this.textures = this.texturesArray[1]
        this.play()
    }
    private attack(){
        this.textures = this.texturesArray[3]
        this.state = 'attacking'
        this.play()
    }
    private doorOut(){
        const [doorOutTextures] = this.texturesArray
        this.textures = this.texturesArray[2]
        this.play()
    }
    private run(){
        this.speedX = 0
        if (this.scale.x === -1.5){
            this.scale.x *= -1;    /* flip vertically */
        }
        this.textures = this.texturesArray[4]
        this.state = 'running'
        this.speedX += 1

        this.play()
    }
    private jump(){
        // place on top of height (screen or object)
        // this.y = this.app.screen.bottom - this.height
        // keep the object bouncing without loss
        this.speedY += -3
    }
    private runLeft(){
        this.speedX = -1
        this.textures = this.texturesArray[4]
        // if (this.state !== 'running'){
        //     this.textures = this.texturesArray[4]
        // }
        if (this.scale.x !== -1.5){
            this.scale.x *= -1;    /* flip vertically */
        }
        this.state = 'running'
        this.play()
    }
    public update(delta: number): void {
        super.update(delta)
        this.x += this.speedX
        this.y += this.speedY
        // console.log(`new ${ this.y += this.speedY}`)
        this.keepInScreen()
        // this.fall(delta)

        // this.bounceUpFrom(this.height)
    }
    private fall(delta:number): void {
        // if (this.jumping) return
        this.x += this.speedX * delta
        this.y += this.speedY * delta
        this.speedY += this.gravity
    }
    private keepInScreen() {
        if (this.getBounds().top < 0) {
            this.speedY = 0
            console.log('this.speedX *= -1')
            this.y = (this.getBounds().top + 10)
            console.log(this.height)
        }
        // Collision left
        if (this.getBounds().left < 0) {
            this.speedX = 0
            console.log('this.speedX *= -1')
            this.x = this.getBounds().left + 10
        }
        // Collision right
        if (this.getBounds().right > this.app.screen.right) {
            this.speedX = 0
            console.log('this.speedX *= -1')
            this.x = this.app.screen.right + 10
        }
        // Collision bottom
        if (this.getBounds().bottom > this.app.screen.bottom) {
            this.y = this.getBounds().bottom + 50
            this.speedY = 0
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
