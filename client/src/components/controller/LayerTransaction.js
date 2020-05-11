export default class LayerTransaction {
    constructor(id, doCallback, undoCallback) {
        this.id = id
        this.doCallback = doCallback
        this.undoCallback = undoCallback
    }

    doTransaction = () => {
        this.doCallback(this.id)
    }

    undoTransaction = () => {
        this.undoCallback(this.id)
    }
}