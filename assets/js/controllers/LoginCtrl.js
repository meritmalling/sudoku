SudokuApp.controller('LoginCtrl', ['$scope', '$http', '$location', '$mdDialog', '$mdToast', 'UserService', function($scope, $http, $location, $mdDialog, $mdToast, UserService){

$scope.closeDialog = function(){
    $mdDialog.hide();
  }

$scope.login = function(){
  console.log('username/password',$scope.username, $scope.password)
    UserService.login($scope.username, $scope.password, function(err, data){
      if(err){
        console.log('this is the error',err);
        $mdToast.show($mdToast.simple().content('Sorry, those were invalid login credentials. Please try again.'))
        $location.path('/')
      } else {
        $mdToast.show($mdToast.simple().content('You are now logged in.'))
        $scope.closeDialog();
        $location.path("/game");
      }
    })
  }

}]);