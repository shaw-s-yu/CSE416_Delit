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
    margin: Number,
    spacing: Number,
    tilecount: Number,
    lastUpdate: { type: Date, default: Date.now },
    published: Boolean,
})


module.exports = mongoose.model('tileset', tilesetSchema);

