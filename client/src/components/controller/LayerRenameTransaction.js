export default class LayerRenameTransaction {
    constructor(name, id, layerList, doCallback, undoCallback) {
        this.id = id
        this.name = name
        this.doCallback = doCallback
        this.undoCallback = undoCallback
        this.layerList = layerList.map(e => { return { ...e } })
    }

    doTransaction = () => {
        if (this.id !== undefined) this.doCallback(this.name, this.id)
        else this.doCallback()
    }

    undoTransaction = () => {
        if (this.layerList !== undefined) this.undoCallback(this.layerList)
        else this.undoCallback()
    }
}