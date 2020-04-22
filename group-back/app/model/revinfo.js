const mongoose = require("mongoose");

const revinfoSchema = mongoose.Schema({
    revid: { type: Number, default: 0 },
    parentid: {type: Number, default: 0 },
    minor: { type: Boolean },
    user: { type: String, trim: true, default: ' ' },
    anon: { type: Boolean },
    userid: { type: Number, default: 0 }, 
    timestamp: { type: String, trim: true, default: ' ' },
    size: { type: Number, default: ' ' }, 
    sha1: { type: String, trim: true, default: ' ' }, 
    parsedcomment: { type: String, trim: true, default: ' ' },
    title: { type: String, trim: true, default: ' ' },

}); 

module.exports = mongoose.model("RevInfo", revinfoSchema, 'revinfos') 