import * as PIXI from 'pixi.js'
import { Game } from './game'
import {Loader} from "pixi.js";

/**
 * json bestand moet in de static map omdat de pixi loader de json inleest en interpreteert
 * spritesheet png moet in de static map omdat de pixi loader niet de dynamische bestandsnaam kan gebruiken
 * bestanden die niet in de static map staan kan je als volgt importeren
 * import catImage from "./images/cat_39.png"
 */

type AssetFile = { name: string, url: string }

export class Assets extends PIXI.Loader {

    // private game: Game
    private assets: AssetFile[] = []

    constructor(game: Game) {
        super()
        // this.game = game

        this.assets = [
            { name: "human", url: "Sprites/human/human.json" },
            { name: "ground", url: "images/ground.png" },
            { name: "background", url: "images/background.png" },
            { name: "background-clouds", url: "images/background-clouds.png" },
            { name: "background-trees", url: "images/background-trees.png" },
            { name: "background-trees-bottom", url: "images/background-trees-bottom.png" },
            // { name: "fishTexture", url: "fish.png" },
        ]

        this.assets.forEach(asset => {
            this.add(asset.name, asset.url)
        })

        this.onError.add((arg) => { console.error(arg) })
        this.onProgress.add((loader:PIXI.Loader, resource:PIXI.LoaderResource) => this.showProgress(loader, resource))
        this.load(() => game.handleLoadComplete())
    }

    private showProgress(loader: PIXI.Loader,resource:PIXI.LoaderResource ) {
        console.log('resource')
        console.log(resource)
        console.log(`Loading ${loader.progress}%`)
    }
}
