export default class PropertyTransaction {
    constructor(index, name, value, custom, doCallback, undoCallback) {
        this.index = index
        this.name = name
        this.value = value
        this.custom = [...custom]
        this.doCallback = doCallback
        this.undoCallback = undoCallback
    }

    doTransaction = () => {
        if (this.index !== undefined) {
            this.doCallback(this.index, this.name, this.value)
        }
        else this.doCallback()
    }

    undoTransaction = () => {
        if (this.custom !== undefined) this.undoCallback(this.custom)
        else this.undoCallback()
    }
}