import * as PIXI from "pixi.js"

class Background extends PIXI.TilingSprite {
    constructor(texture: PIXI.Texture, w:number, h:number, y:number) {
        super(texture, w, h)
        this.y = y
    }
    public update() {
        this.tilePosition.x -= 3
    }
}
export default Background
