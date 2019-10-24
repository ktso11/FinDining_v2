var mongoose = require("mongoose");

mongoose.connect( process.env.MONGODB_URI || "mongodb://localhost:27017/findinings");
mongoose.Promise = global.Promise;


module.exports.User = require("./user.js");
