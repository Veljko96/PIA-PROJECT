const mongoose = require ("mongoose")

const Schema = mongoose.Schema

const timeSchema = new Schema({
    "from": String,
    "to": String,
    "type": String

})

module.exports = mongoose.model('time', timeSchema, 'times')