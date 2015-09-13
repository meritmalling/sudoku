SudokuApp.controller('SignupCtrl', ['$scope', '$http', '$location', '$mdDialog', '$mdToast', 'UserService', function($scope, $http, $location, $mdDialog, $mdToast, UserService){

$scope.closeDialog = function(){
    $mdDialog.hide();
  }

$scope.signup = function(){
    var newUser = {
      username:$scope.newUser.username,
      password:$scope.newUser.username
    }

    $http.post('/api/user', newUser).success(function(data){
      $scope.closeDialog();
      UserService.login($scope.newUser.username, $scope.newUser.username, function(err,data){
        if(data.err){
          console.log(err);
          $mdToast.show($mdToast.simple().content('Oops! Invalid login credentials. Please try again.'))
          $location.path('/')
        } else {
          $mdToast.show($mdToast.simple().content('You have been logged in!'))
          $scope.closeDialog();
        }
      })
    })
  }

}]);