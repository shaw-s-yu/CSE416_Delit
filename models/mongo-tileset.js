const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var tilesetSchema = new Schema({
    name: String,
    owner: String,
    editors: [String],
    imageId: String,
    tileWidth: Number,
    tileHeight: Number,
    width: Number,
    height: Number
})


module.exports = mongoose.model('tileset', tilesetSchema);