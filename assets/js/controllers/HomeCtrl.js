SudokuApp.controller('HomeCtrl', ['$scope', '$rootScope', '$mdDialog', 'UserService', function($scope, $rootScope, $mdDialog, UserService){

  console.log('Home Controller')

  $scope.UserService = UserService;
  $scope.$watchCollection('UserService',function(){
    $scope.currentUser = UserService.currentUser;
  });

//Hard Coded Game Board
$scope.solution = [

[1, 4, 5, 8, 3, 6, 2, 7, 9],
[2, 9, 7, 5, 1, 4, 3, 8, 6],
[8, 6, 3, 9, 2, 7, 5, 1, 4],

[9, 5, 1, 6, 7, 3, 8, 4, 2],
[3, 8, 2, 4, 5, 9, 7, 6, 1],
[6, 7, 4, 2, 8, 1, 9, 5, 3],

[4, 2, 6, 7, 9, 5, 1, 3, 8],
[7, 3, 8, 1, 4, 2, 6, 9, 5],
[5, 1, 9, 3, 6, 8, 4, 3, 7]

]

//Generate Gameboard!!!

// Clone The Solution Board
var cloneRows = function(board) {
  var solutionBoard = [];
  for (var i = 0; i  < board.length; i+=1){
    solutionBoard.push(board[i].slice(0))
  }
  return solutionBoard
}

//Replace Single Gamebaord Row
var replaceRow = function(row){
  var newRow = []
  for (var i = 0; i  < row.length; i+=1){
    if (Math.random() < .45){
      row[i] = null
    }
    newRow.push(row[i])
  }
  return newRow
}

//Replace Board With New Rows
var replaceBoard = function(board){
  var newBoard = []
  for (var i = 0; i  < board.length; i+=1){
    newBoard.push(replaceRow(board[i]))
  }
  return newBoard
}

// Make Gameboard Clone
gameboard = cloneRows($scope.solution)
$scope.gameboard = replaceBoard(gameboard)

// Make Player's Solution Clone
playersboard = cloneRows($scope.solution)
$scope.playersboard = replaceBoard(playersboard)


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

// Logout
$scope.logout = function(){
  UserService.logout(function(err,data){
  });
}

$scope.closeDialog = function(){
  $mdDialog.hide();
}

}]);