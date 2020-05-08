const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var tilesetSchema = new Schema({
    name: String,
    name_lower: String,
    owner: String,
    editors: [String],
    imageId: String,
    tileWidth: Number,
    tileHeight: Number,
    width: Number,
    height: Number,
    lastUpdate: { type: Date, default: Date.now },
})


module.exports = mongoose.model('tileset', tilesetSchema);