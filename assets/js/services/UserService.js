SudokuApp.factory('UserService', ['$http', function($http) {

  return {

    login: function(username, password, callback) {
      var self = this;
      $http.post('/api/auth',{
        username:username,
        password:password
      }).success(function(data){
        console.log('data',data)
        if(data && data.result && data.user) {
          console.log('data.user',data.user)
          console.log('self.currentUser',self.currentUser)
          self.currentUser = data.user;
          console.log('self.currentUser2',self.currentUser)
          console.log('currentUser',data.user)
        }else{
          self.currentUser = false;
          console.log('currentUser false')
        }
        callback(null, data);
      }).error(callback);
    },

    check: function(callback) {
      var self = this;
      $http.get('/api/auth').success(function(data){
        if(data && data.user) {
          self.currentUser = data.user;
        }else{
          self.currentUser = false;
        }
        callback(null, data);
      }).error(callback);
    },

    logout: function(callback) {
      this.currentUser = false;
      $http.delete('/api/auth')
      .success(function(data){
        console.log('***********Logged Out',data)
        callback(null,data);
      }).error(callback);
    }
  }

}]);