import * as PIXI from 'pixi.js';
import { Game } from '../game';

export class Fish extends PIXI.Sprite{

    private app: PIXI.Application;
    // private pixi : PIXI.Application;

    constructor(texture: PIXI.Texture, app: PIXI.Application){
        super(texture); // new PIXI.Sprite()
        this.app = app;
        this.scale.set(Math.random()* 0.9);
        this.anchor.set(0.5);

        const filter = new PIXI.filters.ColorMatrixFilter();
        this.filters = [filter];
        filter.hue(Math.random()*360, false); // HUE filter

        this.x = Math.random() * 800;
        this.y = Math.random() * 450;

    }
    //update word in de game geroepen (bij this.fish.update(delta)...
    update(delta: number){
        this.x -= delta * 1;

        if(this.x >= window.innerWidth){
            //finish
            // this.game.finish();
        }
    }
}
