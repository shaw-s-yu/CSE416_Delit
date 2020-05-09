const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var ProjectSchema = new Schema({
    name: String,
    owner: String,
    editors: [String],
    mapId: String,
    tilesetId: [String],
    tilesetFirstgid: [Number],
    layerId: [String],
    imageId: String,
    lastUpdate: { type: Date, default: Date.now },
});

module.exports = mongoose.model('project', ProjectSchema);
