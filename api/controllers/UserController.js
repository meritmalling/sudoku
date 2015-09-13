/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var bcrypt = require('bcrypt');

module.exports = {

  attributes: {
    username:{
      type:'string',
      minLength: 3,
      required: true
    },
    password:{
      type:'string',
      minLength: 6,
      required: true
    },
//When Sending Object Over API, Remove Password
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
};

