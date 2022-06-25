import * as PIXI from 'pixi.js'
import {Player} from "./Characters/Player";
import {Sprite} from "pixi.js";
import {Assets} from "./Assets";

export class Game {

    app: PIXI.Application
    fishes: Array<Sprite>
    player: Player

    constructor(app: PIXI.Application) {
        this.app = app
        this.fishes = []
        this.app.loader = new Assets(this)
    }

    public handleLoadComplete() {

    }

    private createPlayerFrames(): PIXI.Texture[][] {
        // create an array of textures from an image path
        let idleAnimation = ["idle/images/human-idle_01.png", "idle/images/human-idle_02.png", "idle/images/human-idle_03.png", "idle/images/human-idle_04.png", "idle/images/human-idle_05.png", "idle/images/human-idle_06.png", "idle/images/human-idle_07.png", "idle/images/human-idle_08.png", "idle/images/human-idle_09.png", "idle/images/human-idle_10.png", "idle/images/human-idle_11.png"];
        let hitAnimation = ["hit/images/human-hit_01.png", "hit/images/human-hit_02.png"];
        let doorOutAnimation = ["door-out/images/human-door-out_01.png", "door-out/images/human-door-out_02.png", "door-out/images/human-door-out_03.png", "door-out/images/human-door-out_04.png", "door-out/images/human-door-out_05.png", "door-out/images/human-door-out_06.png", "door-out/images/human-door-out_07.png", "door-out/images/human-door-out_08.png"];
        let attackAnimation = ["attack/images/human-attack_01.png","attack/images/human-attack_02.png","attack/images/human-attack_03.png"]
        let runAnimation = 	["run/images/human-run_01.png","run/images/human-run_02.png","run/images/human-run_03.png","run/images/human-run_04.png","run/images/human-run_05.png","run/images/human-run_06.png","run/images/human-run_07.png","run/images/human-run_08.png"];

        let idleTextures = [];

        for (let i=0; i < idleAnimation.length; i++)
        {
            let texture = PIXI.Texture.from(idleAnimation[i]);
            idleTextures.push(texture);
        }
        let runTextures = [];

        for (let i=0; i < runAnimation.length; i++)
        {
            let texture = PIXI.Texture.from(runAnimation[i]);
            runTextures.push(texture);
        }
        let hitTextures = [];

        for (let i=0; i < hitAnimation.length; i++)
        {
            let texture = PIXI.Texture.from(hitAnimation[i]);
            hitTextures.push(texture);
        }

        let doorOutTextures = [];

        for (let i=0; i < doorOutAnimation.length; i++)
        {
            let texture = PIXI.Texture.from(doorOutAnimation[i]);
            doorOutTextures.push(texture);
        }
        let attackTextures = [];

        for (let i=0; i < attackAnimation.length; i++)
        {
            let texture = PIXI.Texture.from(attackAnimation[i]);
            attackTextures.push(texture);
        }

        return [idleTextures, hitTextures, doorOutTextures,attackTextures,runTextures ]
    }

    private update(delta: number) {
        //todo: Update characters
        this.player.update(delta)
        //todo: Update controllers
        //todo: Check for collision controllers
    }

    public start() {
        console.log('Started game!')
        let frames = this.createPlayerFrames()
        this.player = new Player(this.app, frames, 400, 400)
        this.app.stage.addChild(this.player)
        this.app.ticker.add((delta: number) => this.update(delta))

    }

}



