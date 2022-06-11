import * as PIXI from "pixi.js";

export class Player extends PIXI.AnimatedSprite{
    constructor(idleAnimation: PIXI.Texture[]) {
        super(idleAnimation)
    }
}
