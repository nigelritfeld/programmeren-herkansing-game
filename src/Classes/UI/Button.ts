import * as PIXI from 'pixi.js'
import {Game} from "./game";

export class Button extends PIXI.Graphics {
    constructor(width: number, height: number, x: number = 0, y: number = 0) {
        super()
        // this.width = width
        // this.height = height
        // Creating rect
        this.beginFill(0xDE3249);
        this.drawRoundedRect(0,0, width, height, 16);
        this.endFill();

        this.x = x - this.getBounds().width / 2
        this.y = y - this.getBounds().height / 2

        // Creating text
        const style = new PIXI.TextStyle({
            "fill": "white",
        });
        const text = new PIXI.Text('Start Game', style);

        text.x = this.getBounds().width / 2
        text.y = this.getBounds().height / 2
        text.anchor.set(0.5)

        this.addChild(text)
        // Activating button
        this.buttonMode = true
        this.interactive = true
    }

}
