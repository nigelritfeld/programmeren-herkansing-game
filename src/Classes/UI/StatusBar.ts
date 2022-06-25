import {Game} from '../Game'
import {Button} from './Button'
import * as PIXI from "pixi.js";

export class StatusBar {

    private _pixi: PIXI.Application
    private start: Button
    private counter: number


    constructor() {

    }

    private startTimer() {

        this.game.start()
    }

}
