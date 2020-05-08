const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var mapSchema = new Schema({
    id: String,
    width: Number,
    height: Number,
    infinite: Boolean,
    // layers: [{
    //     data: [Number],
    //     width: Number,
    //     height: Number,
    //     id: Number,
    //     name: String,
    //     opacity: Number,
    //     type: String,
    //     visible: Boolean,
    //     x: Number,
    //     y: Number
    // }],
    layers: [String],
    nextlayerid: Number,
    nextobjectid: Number,
    orientation: String,
    renderorder: String,
    tiledversion: String,
    tilewidth: Number,
    tileheight: Number,
    // tilesets: [{
    //     columns: Number,
    //     firstgid: Number,
    //     image: String,
    //     imageWidth: Number,
    //     height: Number,
    //     margin: Number,
    //     name: String,
    //     spacing: Number,
    //     tilecount: Number,
    //     tileheight: Number,
    //     tilewidth: Number
    // }],
    tilesets: [String],
    type: String,
    version: Number
});

module.exports = mongoose.model('map', mapSchema);