const mongoose = require("mongoose");

const revinfoSchema = mongoose.Schema({
    revid: { type: Number },
    parentid: {type: Number },
    minor: { type: Boolean },
    user: { type: String },
    anon: { type: Boolean },
    userid: { type: Number }, 
    timestamp: { type: String },
    size: { type: Number }, 
    sha1: { type: String }, 
    parsedcomment: { type: String },
    title: { type: String },

}); 

module.exports = mongoose.model("RevInfo", revinfoSchema) 

var data = require("../Australia.json");

mongoose.connect("mongodb+srv://user-post-project:HhFKyQ8hUTDZZUzt@cluster0-yc3oa.mongodb.net/node-angular?retryWrites=true&w=majority")
.then(()=> {
  console.log("Connected to David's test Database! ");
})

const RevInfo = require("../MongoDB/revinfo");
RevInfo.insertMany(data);
