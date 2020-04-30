const User = require('../models/mongo-user')
const TilesetModel = require('../models/mongo-tileset')


exports.Socket = function (socket) {
    this.socket = socket
    // this.on()

    this.on = () => {
        this.socket.on('username_register', this.usernameController)
        this.socket.on('draw', this.drawController)
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
        // let newimg = new TilesetModel();
        // newimg.image = data.data;
        // newimg.save();
    }
}