var mongoose = require("mongoose");

mongoose.connect( process.env.MONGODB_URI || "mongodb://localhost/ArtsyBizc" );
mongoose.Promise = global.Promise;


module.exports.User = require("./user.js");
