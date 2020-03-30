var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    username:  {type: String,lowercase:true,trim:true,required:true,unique:true}, // String is shorthand for {type: String}
    firstname: String,
    lastname: String,
    email: {type: String,lowercase:true,trim:true,required:true,unique:true},
    password:{type: String,required:true},
    lastLogin: [{ info: String, date: Date }],
    createdAt: { type: Date, default: Date.now },
    active: Boolean
  });

//Indexes
// schema level username ascending order & email descending order
userSchema.index({ username: 1, email: -1 }); 

userSchema.methods.savedInfo = function () {
  var message = 'Account Created with username '+this.username + " Whose ID is " + this._id;
  console.log(message);
}

userSchema.virtual('fullName').get(function () {
  return this.firstname + ' ' + this.lastname;
}).
set(function(v) {
  this.firstname = v.substr(0, v.indexOf(' '));
  this.lastname = v.substr(v.indexOf(' ') + 1);
});

userSchema.statics.findByUsername = function(username){
  return this.find({username : new RegExp(username,'i')});
}

userSchema.static('findUsersByGroup',function(active){
  return this.find({active:active});
});

var User = mongoose.model('User', userSchema);

module.exports = User;