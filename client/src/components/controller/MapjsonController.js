export default class MapjsonController {
    constructor(mapjson) {
        this.mapjson = JSON.parse(JSON.stringify(mapjson))
        this.tilesets = []
        this.layers = []
        this.map = new Object()
        this.propertys = new Object()

        this.buildTilesets()
        this.buildLayers()
        this.buildMap()
        this.buildProperties()
    }

    buildTilesets = () => {

    }

    buildLayers = () => {

    }

    buildMap = () => {

    }

    buildProperties = () => {

    }
}