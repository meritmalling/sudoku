/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

var bcrypt = require('bcrypt');

module.exports = {

  attributes: {
    username:{
      type:'string',
      required: true,
      unique: true,
      minLength: 3
    },

    password:{
      type:'string',
      minLength: 6,
      required: true
    },

//Don't Show Password In API/Auth JSON
toJSON: function(){
  var obj = this.toObject();
  delete obj.password;
  return obj;
},
//Hash Password
},
beforeCreate: function(values, callback) {
  bcrypt.hash(values.password, 10, function(err,hash){
    if(err) return callback(err);
    values.password = hash;
    callback();
  });
}
}