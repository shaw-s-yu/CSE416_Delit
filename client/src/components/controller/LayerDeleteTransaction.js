export default class LayerDeleteTransaction {
    constructor(id, layerList, doCallback, undoCallback) {
        this.id = id
        this.doCallback = doCallback
        this.undoCallback = undoCallback
        this.layerList = [...layerList]
    }

    doTransaction = () => {
        this.doCallback(this.id)
    }

    undoTransaction = () => {
        this.undoCallback(this.layerList)
    }
}