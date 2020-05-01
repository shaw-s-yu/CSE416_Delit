const User = require('../models/mongo-user')
const ImageModel = require('../models/mongo-image')


exports.Socket = function (socket) {
    this.socket = socket
    // this.on()

    this.on = () => {
        this.socket.on('username_register', this.usernameController)
        this.socket.on('draw', this.drawController)
        this.socket.on('draw-save', this.drawSaveController)
    }

    this.usernameController = data => {
        if (data.length < 6)
            socket.emit('username_register_back', { err: true, msg: 'At Least 6 Letters' })
        else
            User.findOne({ username: data }).then(user => {
                if (user)
                    socket.emit('username_register_back', { err: true, msg: 'Username Already Existed' })
                else
                    socket.emit('username_register_back', { err: false, msg: 'Good' })
            })
    }

    this.drawController = data => {
        socket.broadcast.emit('drawBack', data)
    }

    this.drawSaveController = data => {
        let newimg = new ImageModel();
        newimg.data = new Buffer.from(data.split(",")[1], "base64");
        newimg.save();
    }
}