/**
 * PlayController
 *
 * @description :: Server-side logic for managing plays
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var chatlog = [
  {from:'System', msg:'Test Message'}
];

module.exports = {

  join: function(req,res){

    sails.sockets.broadcast('mychatroom','userjoin',{user:req.session.user.username});
    console.log('userjoin',req.session.user.username)
    req.socket.on('disconnect', function(){
        sails.sockets.broadcast('mychatroom','userleave',{user:req.session.user.username});
    });

    sails.sockets.join(req.socket, 'mychatroom');
    res.send(chatlog);
  },
  post: function(req,res){
    var msg = {
      msg: req.body.msg,
      from: req.session.user.username
    };
    chatlog.push(msg);
    sails.sockets.broadcast('mychatroom', 'addchat', msg);
    res.send({result:true});
  }

};
