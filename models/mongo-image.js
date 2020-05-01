const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var imageSchema = new Schema({
    data: Buffer
})


module.exports = mongoose.model('image', imageSchema);