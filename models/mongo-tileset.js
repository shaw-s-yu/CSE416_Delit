const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var tilesetSchema = new Schema({
    _id: String,
    name: String,
    owner: String,
    editors: [String],
    imageId: String,
    tileHeight: Number,
    tileWidth: Number,
    width: Number,
    height: Number,
    columns: Number,
    firstgid: Number,
    margin: Number,
    spacing: Number,
    tilecount: Number,
    lastUpdate: { type: Date, default: Date.now },
})


module.exports = mongoose.model('tileset', tilesetSchema);

