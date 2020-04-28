const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var tilesetSchema = new Schema({
    image: Buffer
})


module.exports = mongoose.model('tileset', tilesetSchema);