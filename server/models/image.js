const mongoose = require ("mongoose")

const Schema = mongoose.Schema

const imageSchema = new Schema({
    "Username": String,
    "image": String

})

module.exports = mongoose.model('image', imageSchema, 'images')