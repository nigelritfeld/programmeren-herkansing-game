import {Game} from '../Game'
import {Button} from './Button'
import * as PIXI from "pixi.js";

export class StartMenu {

    private _pixi: PIXI.Application
    private start: Button
    private game: Game

    constructor() {
        this._pixi = new PIXI.Application({ width: 800, height: 450 })
        this.game = new Game(this._pixi)

        document.body.appendChild(this._pixi.view)
        this.start = new Button(150, 80,this._pixi.screen.width / 2, this._pixi.screen.height / 2)
        this.start.on('pointerdown', ()=>this.onStart())

        // start.addListener('click', ()=>this.onClick())
        this._pixi.stage.addChild(this.start)
        console.log('Created new start menu..')
    }

    private onStart() {
        this.start.destroy()
        console.log('Starting game...')
        this.game.start()
    }

}
