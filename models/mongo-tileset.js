const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var tilesetSchema = new Schema({
    editors: [String],
    name: String,
    owner: String,
    imageId: String,
    tileWidth: Number,
    tileHeight: Number,
    width: Number,
    height: Number
})


module.exports = mongoose.model('tileset', tilesetSchema);