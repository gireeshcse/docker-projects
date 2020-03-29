var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    username:  String, // String is shorthand for {type: String}
    name: String,
    password:String,
    lastLogin: [{ info: String, date: Date }],
    createdAt: { type: Date, default: Date.now },
    active: Boolean
  });

var User = mongoose.model('User', userSchema);

var dog = new User({ username: 'admin', name: 'admin', password: 'admin', active:true });

module.exports = User;