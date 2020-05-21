const mongoose = require("mongoose");
const uniqueValidator = require ("mongoose-unique-validator")

const userSchema = mongoose.Schema({
    
    firstname: { type: String, required: true, trim: true },
    lastname: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique:true,trim: true },
    password: { type: String, required: true, trim: true }, 
    question: { type: String, required: true,trim: true }, 
    answer: { type: String, required: true, trim: true }
    
});

//validate unique entry of email address
userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema, "users");