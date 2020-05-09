const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var mapSchema = new Schema({
    _id: String,
    width: Number,
    height: Number,
    infinite: Boolean,
    nextlayerid: Number,
    nextobjectid: Number,
    orientation: String,
    renderorder: String,
    tiledversion: String,
    tilewidth: Number,
    tileheight: Number,
    type: String,
    version: Number
});

module.exports = mongoose.model('map', mapSchema);