SudokuApp.controller('ChatCtrl',['$scope', 'UserService',function($scope, UserService){

  $scope.messages = [];


  $scope.UserService = UserService;
  $scope.$watchCollection('UserService', function(){
    $scope.currentUser = UserService.currentUser;
    joinChat();
  });



  io.socket.on('userjoin', function(data, jwRes){
    $scope.$evalAsync(function(){
      $scope.messages.push({from:'SYSTEM', msg: data.user + ' joined the chat.'});
      scrollChat();
    });
  });

  io.socket.on('userleave', function(data, jwRes){
    $scope.$evalAsync(function(){
      $scope.messages.push({from:'SYSTEM', msg: data.user + ' left the chat.'});
      scrollChat();
    });
  });

  io.socket.on('addchat', function(msg){
    $scope.$evalAsync(function(){
      $scope.messages.push(msg);
      scrollChat();
    });
  });

  function joinChat(){
    if(!$scope.currentUser) return;
    console.log('currentUser',$scope.currentUser)

    io.socket.post('/api/chat/join',{data:'my data'},function(data, jwRes){
      $scope.$evalAsync(function(){
        $scope.messages = data;
      });
      console.log('data', data);
    });
  }

  $scope.sendMsg = function(){
    console.log('sending')
    var data = {msg: $scope.msgText};
    io.socket.post('/api/chat/post', data, function(data, jwRes){
      $scope.$evalAsync(function(){
        $scope.msgText = '';
      });
    });
  }

  var scrollChat = function() {
    var chatView = document.querySelector('.chat-window .chat-list');
    chatView.scrollTop = chatView.scrollHeight+100;
  }


}]);