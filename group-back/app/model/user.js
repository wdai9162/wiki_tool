const mongoose = require("mongoose");
const uniqueValidator = require ("./node_modules/mongoose-unique-validator")

//schema needs more work on to meet project requirement. 
const userSchema = mongoose.Schema({
    email: { type: String, required: true, unique:true },
    password: {type: String, required: true }
}); 

//validate unique entry of email address
userSchema.plugin(uniqueValidator); 

module.exports = mongoose.model("User", userSchema)