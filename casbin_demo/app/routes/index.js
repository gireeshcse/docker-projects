var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
var User = require('../models/user');
var os = require('os');
var info = { 
  hostname: os.hostname(),
  networkInterfaces: os.networkInterfaces(),
  uptime:os.uptime(),
  cpus:os.cpus(),
  user_ip: ''
}

router.use(function(req,res,next){
  info.user_ip = req.headers['x-forwarded-for'] || 
  req.connection.remoteAddress || 
  req.socket.remoteAddress ||
  (req.connection.socket ? req.connection.socket.remoteAddress : null);
  next();
});
/* GET home page. */
router.get('/', function(req, res, next) {
  
  res.render('pages/index', { title: 'Casbin Demo App' , info : info });
});

router.get('/login', function(req, res, next) {
  res.render('pages/login', { title: 'Casbin Demo App::Login App',token :req.csrfToken() });
});

router.post('/login', function(req, res, next) {
  console.log(req.body);
  if(bcrypt.compareSync(req.body.password, hash)) {
    // Passwords match
   } else {
    // Passwords don't match
   }
  res.render('pages/login', { title: 'Casbin Demo App::Login App',token :req.csrfToken(),error:'Invalid Username' });
});

router.get('/register', function(req, res, next) {
  res.render('pages/register', { title: 'Casbin Demo App::Register',token :req.csrfToken() });
});
router.post('/register', function(req, res, next) {
  req.body.password  =  bcrypt.hashSync(req.body.password, 10);//hashing password
  var userModel = new User();
  userModel.username = req.body.email;
  userModel.email = req.body.email;
  userModel.firstname = req.body.firstname;
  userModel.lasttname = req.body.lastname;
  userModel.password = req.body.password;
  userModel.save(function(err){
    if(err)
    {
      res.render('pages/register', { 
        title: 'Casbin Demo App::Register Error',
        token :req.csrfToken(),
        error:JSON.stringify(err) 
      });
    }else{
      res.render('pages/success',{data:JSON.stringify(userModel), title: 'Casbin Demo App::Register Success',});
    }
  });

  
});


module.exports = router;
