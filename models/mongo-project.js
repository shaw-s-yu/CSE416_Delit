const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var ProjectSchema = new Schema({
    name: String,
    ownerId: String,
    img: String,
    editors: [String],
    mapId: String,
    tileset: [String],

    // lastUpdate: { type: Date, default: Date.now },
});

module.exports = mongoose.model('project', ProjectSchema);
