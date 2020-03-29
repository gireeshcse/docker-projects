var mongoose = require('mongoose');
var User = require('./models/user');
mongoose.connect(process.env.MONGODB_CONNECTION_URL, {useNewUrlParser: true,useUnifiedTopology: true});

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function() {
  // we're connected!
  console.log("Database Connected");
});


module.exports = db;
