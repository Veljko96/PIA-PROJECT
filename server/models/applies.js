const mongoose = require ("mongoose")

const Schema = mongoose.Schema

const mongo = require("mongodb")

const applySchema = new Schema({
    "Competition_Id": String,
    "Competition_Name": String,
    "First_Name": String,
    "Last_Name": String,
    "CV": Object,
    "Email": String,
    "Cover_Letter": String,
    "PDFFile": Object,
    "Accepted": String
})

module.exports = mongoose.model('apply', applySchema, 'applies')