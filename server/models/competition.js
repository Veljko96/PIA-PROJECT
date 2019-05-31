const mongoose = require ("mongoose")

const Schema = mongoose.Schema

const mongo = require("mongodb")

const competitionSchema = new Schema({
    "Company_username": String,
    "Company_Name": String,
    "Competition_Name": String,
    "Description": String,
    "Type": String,
    "DateTo": String,
    "File": Object,
    "End": Boolean
})

module.exports = mongoose.model('competition', competitionSchema, 'competitions')