SudokuApp.controller('LoginCtrl', ['$scope', '$http', '$location', '$mdDialog', '$mdToast', 'UserService', function($scope, $http, $location, $mdDialog, $mdToast, UserService){

$scope.closeDialog = function(){
    $mdDialog.hide();
  }

$scope.login = function(){
    UserService.login($scope.username, $scope.password, function(err, data){
      if(data.result === false){
        console.log('this is the error',err);
        $mdToast.show($mdToast.simple().content('Sorry, those were invalid login credentials. Please try again.'))
        $location.path('/')
      } else {
        $mdToast.show($mdToast.simple().content('You are now logged in.'))
        $scope.closeDialog();
        $location.path("/game");
      }
    })
    $http.get('/api/numbers').success(function(data){
    console.log(data.text)
    $scope.mathFacts = data
  })
  }

}]);