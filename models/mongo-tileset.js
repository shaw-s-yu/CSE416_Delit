const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var tilesetSchema = new Schema({
    name: String,
    name_lower: String,
    owner: String,
    editors: [String],
    
    projectName: String,

    // imageId: String,
    // tileWidth: Number,
    // tileHeight: Number,
    // width: Number,
    // height: Number,
    
    columns: Number,
    firstgid: Number,
    image: String,
    imagewidth: Number,
    imageheight: Number,
    margin: Number,
    spacing: Number,
    tilecount: Number,
    tileheight: Number,
    tilewidth: Number,

    lastUpdate: { type: Date, default: Date.now },
})


module.exports = mongoose.model('tileset', tilesetSchema);

