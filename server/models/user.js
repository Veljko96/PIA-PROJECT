const mongoose = require ("mongoose")

const Schema = mongoose.Schema

const userSchema = new Schema({
    "Username": String,
    "Password": String,
    "Email": String,
    // User
    "First_Name": String,
    "Last_Name": String,
    "Phone": Number,
    // Company
    "Company_Name": String,
    "Address": String,
    "City": String,
    "Director_FirstName": String,
    "Director_LastName": String,
    "TIN": String,
    "Employees": Number,
    "WEB": String,
    "Activity": String,
    "Special_Activity": String,
    // Student
    "Bachelors_Degree": Number,
    "Graduated": String,
    "user_type": String,
    "package": String,
    "additional": Array
})

module.exports = mongoose.model('user', userSchema, 'users')