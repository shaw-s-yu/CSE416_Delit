export default class LayerDeleteTransaction {
    constructor(id, layerList, doCallback, undoCallback) {
        this.id = id
        this.doCallback = doCallback
        this.undoCallback = undoCallback
        this.layerList = [...layerList]
    }

    doTransaction = () => {
        if (this.id !== undefined) this.doCallback(this.id)
        else this.doCallback()
    }

    undoTransaction = () => {
        if (this.layerList !== undefined) this.undoCallback(this.layerList)
        else this.undoCallback()
    }
}