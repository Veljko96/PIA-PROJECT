const mongoose = require ("mongoose")

const Schema = mongoose.Schema

const cvSchema = new Schema({
    "username": String,
    "firstname": String,
    "lastname": String,
    "address": String,
    "city": String,
    "country": String,
    "phone": String,
    "email": String,
    "website": String,
    "type_application": String,
    "type_description": String,
    "work_from": String,
    "work_to": String,
    "work_ongoing": String,
    "work_title": String,
    "work_name": String,
    "work_city": String,
    "work_country": String,
    "work_text": String,
    "education_from": String,
    "education_to": String,
    "education_ongoing": String,
    "education_title": String,
    "education_name": String,
    "education_city": String,
    "education_country": String,
    "education_text": String,
    "languages_mother": String,
    "languages_foreign": String,
    "skills": String

})

module.exports = mongoose.model('cv', cvSchema, 'cvs')