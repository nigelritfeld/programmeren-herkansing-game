import * as PIXI from 'pixi.js'

import fishImage from "../images/fish.png"
import bubbleImage from "../images/bubble.png"
import waterImage from "../images/water.jpg"
import {Fish} from "./Characters/Fish";
import {Player} from "./Characters/Player";
import {Sprite} from "pixi.js";

export class Game {

    textures: PIXI.Loader
    loader: PIXI.Loader
    app: PIXI.Application
    fishes: Array<Sprite>
    playerTextures: Array<any>

    constructor(app:PIXI.Application) {
        this.app = app
        this.playerTextures = []
        this.fishes = []
        this.textures = new PIXI.Loader()
        this.textures.add('fishTexture', fishImage)
            .add('bubbleTexture', bubbleImage)
            .add('waterTexture', waterImage)

        // this.loader = PIXI.Loader.shared;
        // // console.log(this.loader)
        // this.loader.add('pig', 'pig.json')
        // this.loader.load(()=>this.handleLoadComplete());
        this.textures.load(()=> this.loadCompleted())
    }

    private update() {

    }
    private handleLoadComplete(){
        console.log('Spritesheet loading.')
        // console.log(this.loader.resources.pig.spritesheet)
        // let tex = this.loader.resources.player.spritesheet;
        // // @ts-ignore
        // let sprite = new PIXI.AnimatedSprite(tex.animations.pixels_large);
        let fish = new Fish(this.textures.resources['fishTexture'].texture!, this.app)
        console.log('sprite')
        // console.log(sprite)
        this.app.stage.addChild(fish)
    }
    private loadCompleted() {
        console.log('Load completed')

        for (let i= 0; i<10; i++){
            let fish = new PIXI.Sprite(this.textures.resources["fishTexture"].texture!)
            this.fishes.push(fish)
        }

        // // frames opslaan in een array
        // for (let i = 0; i <= 4; i++) {
        //     // const texture = PIXI.Texture.from(`player${i + 1}.png`);
        //     const texture = PIXI.Texture.from(`Attack-(38x28)_0${i + 1}.png`);
        //     this.playerTextures.push(texture);
        // }
        // console.log(this.playerTextures)
    }


    public start(){
        console.log('Started game!')
        for (let fish of this.fishes){
            this.app.stage.addChild(fish)
        }
        // let player = new Player(this.playerTextures)
        // this.app.stage.addChild(player)
        // player.width = 100;
        // player.height = 100;
        // player.x = 100;
        // player.y = 100;
        // player.anchor.set(0.5);
        // player.play();
    }

}



