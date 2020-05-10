const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var LayerSchema = new Schema({
    _id: String,
    data: [Number],
    width: Number,
    height: Number,
    name: String,
    opacity: Number,
    type: String,
    visible: Boolean,
    x: Number,
    y: Number,
});

module.exports = mongoose.model('layers', LayerSchema);