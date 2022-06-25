import * as PIXI from "pixi.js";

class Ground extends PIXI.Sprite{

    private app: PIXI.Application;

    constructor(texture: any, app: PIXI.Application) {
        super(texture);

        console.log(`screen width: ${app.screen.width}`)
        this.app = app
        this.height = 500
        this.width = app.screen.width
        this.x = 0

    }

}
export default Ground
