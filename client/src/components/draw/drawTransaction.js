export default class drawTransaction {

    constructor(old_value, new_value, callback) {
        this.old_value = old_value
        this.new_value = new_value
        this.callback = callback
    }

    doTransaction = () => {
        this.callback(this.new_value)
    }

    undoTransaction = () => {
        this.callback(this.old_value)
    }
}