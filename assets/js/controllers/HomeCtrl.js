SudokuApp.controller('HomeCtrl', ['$scope', '$rootScope', '$mdDialog', 'UserService', function($scope, $rootScope, $mdDialog, UserService){

  console.log('Home Controller')

  $scope.UserService = UserService;
  $scope.$watchCollection('UserService', function(){
    $scope.currentUser = UserService.currentUser;
  });

//Numbers Worldcloud
$scope.words = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];

//Open Signup Modal
$scope.signup = function(){
  $mdDialog.show({
    templateUrl:'views/signupModal.html',
    clickOutsideToClose: true,
    controller: 'SignupCtrl'
  })
}

// Open Login Modal
$scope.login = function(){
  $mdDialog.show({
    templateUrl:'views/loginModal.html',
    clickOutsideToClose: true,
    controller: 'LoginCtrl'
  })
}

//Close Modal
$scope.closeDialog = function(){
  $mdDialog.hide();
}

}]);