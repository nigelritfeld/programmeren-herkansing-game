import * as PIXI from 'pixi.js'
import {Player} from "./Characters/Player";
import {Sprite} from "pixi.js";
import {Assets} from "./Assets";
import Ground from "./Platforms/Ground";
import Background from "./UI/Background";

export class Game {

    app: PIXI.Application
    player: Player
    bg: Array<Background> = []

    constructor(app: PIXI.Application) {
        this.app = app
        this.app.loader = new Assets(this)

        console.log(this.app.loader)
    }

    public handleLoadComplete() {

    }

    private createPlayerFrames(): PIXI.Texture[][] {
        // create an array of textures from an image path
        let idleAnimation = ["idle/images/human-idle_01.png", "idle/images/human-idle_02.png", "idle/images/human-idle_03.png", "idle/images/human-idle_04.png", "idle/images/human-idle_05.png", "idle/images/human-idle_06.png", "idle/images/human-idle_07.png", "idle/images/human-idle_08.png", "idle/images/human-idle_09.png", "idle/images/human-idle_10.png", "idle/images/human-idle_11.png"];
        let hitAnimation = ["hit/images/human-hit_01.png", "hit/images/human-hit_02.png"];
        let doorOutAnimation = ["door-out/images/human-door-out_01.png", "door-out/images/human-door-out_02.png", "door-out/images/human-door-out_03.png", "door-out/images/human-door-out_04.png", "door-out/images/human-door-out_05.png", "door-out/images/human-door-out_06.png", "door-out/images/human-door-out_07.png", "door-out/images/human-door-out_08.png"];
        let attackAnimation = ["attack/images/human-attack_01.png", "attack/images/human-attack_02.png", "attack/images/human-attack_03.png"]
        let runAnimation = ["run/images/human-run_01.png", "run/images/human-run_02.png", "run/images/human-run_03.png", "run/images/human-run_04.png", "run/images/human-run_05.png", "run/images/human-run_06.png", "run/images/human-run_07.png", "run/images/human-run_08.png"];

        let idleTextures = [];

        for (let i = 0; i < idleAnimation.length; i++) {
            let texture = PIXI.Texture.from(idleAnimation[i]);
            idleTextures.push(texture);
        }
        let runTextures = [];

        for (let i = 0; i < runAnimation.length; i++) {
            let texture = PIXI.Texture.from(runAnimation[i]);
            runTextures.push(texture);
        }
        let hitTextures = [];

        for (let i = 0; i < hitAnimation.length; i++) {
            let texture = PIXI.Texture.from(hitAnimation[i]);
            hitTextures.push(texture);
        }

        let doorOutTextures = [];

        for (let i = 0; i < doorOutAnimation.length; i++) {
            let texture = PIXI.Texture.from(doorOutAnimation[i]);
            doorOutTextures.push(texture);
        }
        let attackTextures = [];

        for (let i = 0; i < attackAnimation.length; i++) {
            let texture = PIXI.Texture.from(attackAnimation[i]);
            attackTextures.push(texture);
        }

        return [idleTextures, hitTextures, doorOutTextures, attackTextures, runTextures]
    }

    private update(delta: number) {
        //todo: Update characters

        this.player.update(delta)
        for (let bg of this.bg){
            bg.update()
        }
        //todo: Update controllers
        //todo: Check for collision controllers
    }

    // grounded(sprite1:PIXI.Sprite, sprite2:PIXI.Sprite) {
    //     const bounds1 = sprite1.getBounds()
    //     const bounds2 = sprite2.getBounds()
    //
    //     return bounds1.x < bounds2.x + bounds2.width
    //         && bounds1.x + bounds1.width > bounds2.x
    //         && bounds1.y < bounds2.y + bounds2.height
    //         && bounds1.y + bounds1.height > bounds2.y;
    // }

    // collision(sprite1:PIXI.Sprite, sprite2:PIXI.Sprite) {
    //     const bounds1 = sprite1.getBounds()
    //     const bounds2 = sprite2.getBounds()
    //
    //     return bounds1.x < bounds2.x + bounds2.width
    //         && bounds1.x + bounds1.width > bounds2.x
    //         && bounds1.y < bounds2.y + bounds2.height
    //         && bounds1.y + bounds1.height > bounds2.y;
    // }
    addBackground() {
        this.bg.push(new Background(this.app.loader.resources["background"].texture!, this.app.screen.width, this.app.screen.height, 0))
        this.bg.push(new Background(this.app.loader.resources["background-clouds"].texture!, this.app.screen.width, this.app.screen.height , 0))
        this.bg.push(new Background(this.app.loader.resources["background-trees"].texture!, this.app.screen.width, this.app.screen.height , 0))
        this.bg.push(new Background(this.app.loader.resources["background-trees-bottom"].texture!, this.app.screen.width, this.app.screen.height , -1))
            //
        for (let bg of this.bg){
            this.app.stage.addChild(bg)

        }
    }


    public start() {
        console.log('Started game!')
        let frames = this.createPlayerFrames()
        this.addBackground()
        // let platform = new Ground(this.app.loader.resources.ground.textures, this.app)
        let ground = PIXI.Sprite.from('images/ground.png')
        ground.width = this.app.screen.width
        ground.x = this.app.screen.width / 2;
        ground.y = this.app.screen.height / 2;
        ground.height = 500
        ground.anchor.set(0.5);

        let platform = PIXI.Sprite.from('images/ground.png')
        platform.width = 200
        platform.x = 200;
        platform.y = 100;
        platform.height = 500
        platform.anchor.set(0.5);

        this.player = new Player(this.app, frames, 400, 200)

        this.app.stage.addChild(platform)
        this.app.stage.addChild(ground)
        this.app.stage.addChild(this.player)
        this.app.ticker.add((delta: number) => this.update(delta))

    }

}



