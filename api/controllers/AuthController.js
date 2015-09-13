/**
 * AuthController
 *
 * @description :: Server-side logic for managing auths
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var bcrypt = require('bcrypt');

module.exports = {

  login: function(req,res) {
    User.find({username: req.body.username}).then(function(user){
      if(user){
        console.log(user)
        console.log('**************User Found:',user[0].password)
        console.log('reqbodypassword',req.body.password)
        bcrypt.compare(req.body.password, user[0].password, function(err, result){
          if(err) return res.send({result:false, error: err});
          if(result){
            req.session.user = user;
            res.send({
              result: true,
              user: user
            });
          }else{
            res.send({
              result: false,
              error: 'Invalid Password.'
            })
          }
        });
      }else{
        res.send({
          result:false,
          error:'Unknown User.'
        });
      }
    });
  },

  logout: function(req,res) {
    delete req.session.user;
    res.send({result: true});
  },

  check: function(req,res) {
    res.send({user: req.session.user || false})
  }

};

