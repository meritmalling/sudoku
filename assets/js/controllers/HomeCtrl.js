SudokuApp.controller('HomeCtrl', ['$scope', '$mdDialog', 'UserService', '$mdToast', function($scope, $mdDialog, UserService, $mdToast){

  console.log('Home Controller')

  $scope.UserService = UserService;
  $scope.$watchCollection('UserService', function(){
    $scope.currentUser = UserService.currentUser;
  });

//Numbers Worldcloud
$scope.words = [
{text:'1', weight:13},
{text:'2', weight:19},
{text:'3', weight:6},
{text:'4', weight:2},
{text:'5', weight:7},
{text:'6', weight:20},
{text:'7', weight:16},
{text:'8', weight:14},
{text:'9', weight:4},
{text:'1', weight:5},
{text:'2', weight:6},
{text:'3', weight:18},
{text:'4', weight:2},
{text:'5', weight:13},
{text:'6', weight:20},
{text:'7', weight:10},
{text:'8', weight:14},
{text:'9', weight:3},
{text:'1', weight:1},
{text:'2', weight:18},
{text:'3', weight:16},
{text:'4', weight:12},
{text:'5', weight:17},
{text:'6', weight:18},
{text:'7', weight:4},
{text:'8', weight:3},
{text:'9', weight:4}
];

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

//ShowSignUp
$scope.showSignup =function(){
  $mdToast.show($mdToast.simple().content('Singup'));
}

//ShowLogin
$scope.showLogin = function(){
  $mdToast.show($mdToast.simple().content('Login'));
}



}]);