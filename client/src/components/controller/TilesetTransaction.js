export default class TilesetTransaction {
    constructor(id, tilesets, doCallback, undoCallback) {
        this.id= id
        this.doCallback = doCallback
        this.undoCallback = undoCallback
        this.tilesets = [...tilesets]
    }

    doTransaction = () => {
        if (this.id !== undefined) this.doCallback(this.id)
        else this.doCallback()
    }

    undoTransaction = () => {
        if (this.tilesets !== undefined) this.undoCallback(this.tilesets)
        else this.undoCallback()
    }
}