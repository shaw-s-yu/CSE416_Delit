export default class drawTransaction {

    constructor(old_value, new_value, callback, socket, isReceive) {
        this.old_value = old_value
        this.new_value = new_value
        this.callback = callback
        this.socket = socket
        this.isReceive = isReceive
    }

    doTransaction = () => {
        this.callback(this.new_value)
        if (!this.isReceive)
            this.socket.emit('draw', this.new_value)
    }

    undoTransaction = () => {
        this.callback(this.old_value)
        this.socket.emit('draw', this.old_value)
    }
}