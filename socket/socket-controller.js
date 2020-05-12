const User = require('../models/mongo-user')
const ImageModel = require('../models/mongo-image')
const TilesetModel = require('../models/mongo-tileset')
const mongoose = require('mongoose');
const ProjectModel = require('../models/mongo-project')
const MapModel = require('../models/mongo-map')
const LayerModel = require('../models/mongo-layer')

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
        this.socket.on('project-save', this.projectSaveController)
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
                    image.save().then(savedImage => {
                        if (!savedImage) {
                            socket.emit('draw-save-back', { err: true, msg: 'save image error' })
                            throw new Error('save image error')
                        } else {
                            socket.emit('draw-save-back', { err: false, msg: 'image saved' })
                        }
                    })
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
                _id: mongoose.Types.ObjectId(),
                name: name,
                width: tileset.width,
                height: tileset.height,
                tileWidth: tileset.tileWidth,
                tileHeight: tileset.tileHeight,
                owner: userId,
                imageId: newImage._id,
                editors: [],
                columns: Math.floor(tileset.width / tileset.tileWidth),
                margin: 0,
                spacing: 0,
                tilecount: Math.floor(tileset.width / tileset.tileHeight) * Math.floor(tileset.height / tileset.tileHeight),
                published: false,
            }).save().then(newTileset => {
                if (!newTileset) throw new Error('create new tileset error')
                socket.emit('duplicate-image-back', newTileset._id)
            })
        })
    }

    this.projectSaveController = req => {
        const { layers, map, tilesets, custom, project, imgData } = req
        const layerId = layers.map(e => e._id)
        const tilesetId = tilesets.map(e => e._id)
        const tilesetFirstgid = tilesets.map(e => e.firstgid)
        const customPropertyName = custom.map(e => e.name)
        const customPropertyValue = custom.map(e => e.value)
        for (let i = 0; i < layers.length; i++) {
            console.log(layers[i]._id)
            LayerModel.findOne({ _id: layers[i]._id }).then(currentLayer => {
                if (!currentLayer) {
                    new LayerModel({
                        ...layers[i],
                        _id: layers[i]._id ? layers[i]._id : mongoose.Types.ObjectId(),
                    }).save().then(newLayer => {
                        if (!newLayer) {
                            socket.emit('project-save-back', {
                                err: true, msg: 'save project fail'
                            })
                            throw new Error('create layer fail')
                        }
                    })
                } else {
                    currentLayer.name = layers[i].name
                    currentLayer.width = layers[i].width
                    currentLayer.height = layers[i].height
                    currentLayer.data = layers[i].data
                    currentLayer.opacity = layers[i].opacity
                    currentLayer.visible = layers[i].visible
                    currentLayer.x = layers[i].x
                    currentLayer.y = layers[i].y
                    currentLayer.save().then(savedLayer => {
                        if (!savedLayer) {
                            socket.emit('project-save-back', {
                                err: true, msg: 'save project fail'
                            })
                            throw new Error('save layer fail')
                        }
                    })
                }
            })
        }
        MapModel.findOne({ _id: map._id }).then(currentMap => {
            if (!currentMap) {
                socket.emit('project-save-back', {
                    err: true, msg: 'save project fail'
                })
                throw new Error('find map fail')
            }
            currentMap.width = map.width
            currentMap.height = map.height
            currentMap.infinite = map.infinite
            currentMap.nextlayerid = map.nextlayerid
            currentMap.orientation = map.orientation
            currentMap.renderorder = map.renderorder
            currentMap.tiledversion = map.tiledversion
            currentMap.tileWidth = map.tileWidth
            currentMap.tileHeight = map.tileHeight
            currentMap.save().then(savedMap => {
                if (!savedMap) {
                    socket.emit('project-save-back', {
                        err: true, msg: 'save project fail'
                    })
                    throw new Error('save map fail')
                }
            })
        })
        ImageModel.findOne({ _id: project.imageId }).then(image => {
            if (!image) throw new Error('image not found')
            image.data = new Buffer.from(imgData.split(',')[1], 'base64')
            image.save().then(savedImage => {
                if (!savedImage) {
                    socket.emit('project-save-back', {
                        err: true, msg: 'save project fail'
                    })
                    throw new Error('save map image fail')
                }
            })
        })
        ProjectModel.findOne({ _id: project._id }).then(currentProject => {
            if (!currentProject) {
                socket.emit('project-save-back', {
                    err: true, msg: 'save project fail'
                })
                throw new Error('save project fail')
            }
            currentProject.name = project.name
            currentProject.tilesetId = tilesetId
            currentProject.layerId = layerId
            currentProject.tilesetFirstgid = tilesetFirstgid
            currentProject.customPropertyName = customPropertyName
            currentProject.customPropertyValue = customPropertyValue
            currentProject.save().then(savedProject => {
                if (!savedProject) {
                    socket.emit('project-save-back', {
                        err: true, msg: 'save project fail'
                    })
                    throw new Error('save project fail')
                }
            })
        })
        console.log('success')
        socket.emit('project-save-back', {
            err: false, msg: 'project is saved'
        })

    }
}