export default class TilesetTransaction {
    constructor(oldValue, newValue, doCallback, undoCallback) {
        this.oldValue= oldValue
        this.doCallback = doCallback
        this.undoCallback = undoCallback
        this.newValue = newValue
    }

    doTransaction = () => {
        if (this.oldValue !== undefined) this.doCallback(this.oldValue)
        else this.doCallback()
    }

    undoTransaction = () => {
        if (this.newValue !== undefined) this.undoCallback(this.newValue)
        else this.undoCallback()
    }
}