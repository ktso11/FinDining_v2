var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    passportLocalMongoose = require('passport-local-mongoose');

var UserSchema = new Schema({
      username: String,
      password: String,
      truckname: String,
      // long: String,
      // lat: String,
      location: String,
      foodtype: String,
    });

UserSchema.plugin(passportLocalMongoose);
var User = mongoose.model('User', UserSchema);
module.exports = User;
