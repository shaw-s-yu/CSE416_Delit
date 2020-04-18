const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var ProjectSchema = new mongoose.Schema({
    id: String,
    name: String,
    creater: String,
    lastUpdate: { type: Date, default: Date.now },
});

module.exports = mongoose.model('project', ProjectSchema);
