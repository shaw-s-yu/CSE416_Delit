const User = require('../models/mongo-user')
const ImageModel = require('../models/mongo-image')
const TilesetModel = require('../models/mongo-tileset')

exports.Socket = function (socket, io) {
    this.socket = socket
    this.io = io

    this.on = () => {
        this.socket.on('username_register', this.usernameController)
        this.socket.on('draw', this.drawController)
        this.socket.on('draw-save', this.drawSaveController)
        this.socket.on('invite', this.inviteController)
        this.socket.on('join-room', this.joinRoomController)
        this.socket.on('duplicate-image', this.duplicateImageController)
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

    this.drawController = req => {
        const { room } = req
        socket.to(room).emit('draw-back', req)
    }

    this.drawSaveController = data => {
        TilesetModel.findOne({ _id: data.tilesetId }).then(tileset => {
            if (!tileset) throw new Error('Error')
            else {

                ImageModel.findOne({ _id: tileset.imageId }).then(image => {
                    if (!image) throw new Error('image not found')
                    image.data = new Buffer.from(data.data.split(',')[1], 'base64')
                    image.save()
                })
            }
        })
    }

    this.inviteController = req => {
        const { name, data } = req
        User.findOne({ username: data.text }).then(user => {
            if (user)
                socket.emit('inviteBack', { name, err: false, msg: '👍 User Found', req: data.text, id: user._id })
            else
                socket.emit('inviteBack', { name, err: true, msg: '👎 User not Exist', req: data.text, id: null })
        })
    }

    this.joinRoomController = req => {
        socket.join(req)
    }

    this.duplicateImageController = req => {
        const { name, data, tileset, userId } = req
        new ImageModel({
            data: new Buffer.from(data.split(',')[1], 'base64')
        }).save().then(newImage => {
            if (!newImage) throw new Error('create new image error')
            new TilesetModel({
                name: name,
                width: tileset.width,
                height: tileset.height,
                tileWidth: tileset.tileWidth,
                tileHeight: tileset.tileHeight,
                owner: userId,
                imageId: newImage._id,
                editors: []
            }).save().then(newTileset => {
                if (!newTileset) throw new Error('create new tileset error')
                socket.emit('duplicate-image-back', newTileset._id)
            })
        })
    }
}