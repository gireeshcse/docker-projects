// import { newEnforcer } from 'casbin';
var newEnforcer = require('casbin').newEnforcer;

// Models cannot be saved from database where as 
// policies can be saved database as well as files

var checkAuthorization = async function(sub, obj, act){
    const e =  await newEnforcer(__dirname+'/models/model.conf',__dirname+'/policies/policy.csv');
    if ((await e.enforce(sub, obj, act)) === true) {
        // permit alice to read data1
        return true;
    } else {
        // deny the request, show an error
        return false;
    }
};

module.exports = {checkAuthorization};