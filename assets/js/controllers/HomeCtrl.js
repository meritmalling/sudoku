SudokuApp.controller('HomeCtrl', ['$scope', '$rootScope', '$mdDialog', 'UserService', function($scope, $rootScope, $mdDialog, UserService){

  console.log('Home Controller')

  $scope.UserService = UserService;
  $scope.$watchCollection('UserService', function(){
    $scope.currentUser = UserService.currentUser;
  });

//Numbers Worldcloud
$scope.words = [
  {text:'1', weight:13, link:'/thing/1'},
  {text:'2', weight:19, link:'/thing/2'},
  {text:'3', weight:6, link:'/thing/3'},
  {text:'4', weight:2, link:'/thing/4'},
  {text:'5', weight:7},
  {text:'6', weight:20},
  {text:'7', weight:16},
  {text:'8', weight:14},
  {text:'9', weight:4}
];

$scope.colors =

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