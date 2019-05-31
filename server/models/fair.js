const mongoose = require ("mongoose")

const Schema = mongoose.Schema

const fairSchema = new Schema({
    "Fair_Name":String,
    "Informations":String,
    "Locations":Array,
    "Place":String,
	"FromDate":String,
	"ToDate":String,
	"FromTime":String,
    "ToTime":String,
    "Packages":Array, 
    "LogoImage":String,
    "Slots":Array, 
    "Additional":Array

})

module.exports = mongoose.model('fair', fairSchema, 'fairs')