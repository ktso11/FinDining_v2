var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/findinings", {useMongoClient: true, });
mongoose.Promise = global.Promise;


module.exports.User = require("./user.js");
