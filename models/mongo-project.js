const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var ProjectSchema = new Schema({
    name: String,
    owner: String,
    img: String,
    editors: [String],
    mapId: String,
    tilesetId: [String],
    imageId: String
    // lastUpdate: { type: Date, default: Date.now },
});

module.exports = mongoose.model('project', ProjectSchema);
