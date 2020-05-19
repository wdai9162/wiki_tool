const mongoose = require("mongoose");
const uniqueValidator = require ("mongoose-unique-validator")

const revinfoSchema = mongoose.Schema({
    revid: { type: Number, unique:true, required: true },
    parentid: {type: Number, default: 0, required: true, },
    minor: { type: Boolean },
    user: { type: String, trim: true,required: true, default: ' '},
    anon: { type: Boolean },
    userid: { type: Number, required: true }, 
    timestamp: { type: Date, trim: true, required: true},
    size: { type: Number, required: true }, 
    sha1: { type: String, trim: true }, 
    parsedcomment: { type: String, trim: true },
    title: { type: String, trim: true, required: true },
    sha1hidden: { type: Boolean },
    commenthidden: { type: Boolean },
}); 

revinfoSchema.plugin(uniqueValidator);
module.exports = mongoose.model("RevInfo", revinfoSchema, 'revinfos') 