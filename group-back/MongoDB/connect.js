var mongodb = require("mongoose");
mongodb.Promise = global.Promise;
var url = "mongodb+srv://root:sam88888888@cluster0-z3t4s.mongodb.net/test?authSource=admin&replicaSet=Cluster0-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true";
mongodb.connect(url, { useNewUrlParser: true,useUnifiedTopology: true  });
mongodb.connection.on("connected", () => {
    console.log("mongodb数据库连接成功")
});
mongodb.connection.on("error", (error) => {
    console.log("mongodb数据库连接失败", error)
});
module.exports = mongodb;
