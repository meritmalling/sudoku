SudokuApp.controller('NavCtrl', ['$scope', '$timeout', '$mdSidenav', '$mdUtil', '$log', '$mdDialog', 'UserService', 'Game', 'User', '$location', function ($scope, $timeout, $mdSidenav, $mdUtil, $log, $mdDialog, UserService, Game, User, $location) {

  console.log('NavCtrl')

  $scope.currentUser = null;

$scope.UserService = UserService;
$scope.$watchCollection('UserService', function(){
  $scope.currentUser = UserService.currentUser;

  console.log('inside',$scope.currentUser)
});

//Games
Game.query().then(function(games){
    $scope.games = games;
  });

//Set Current Board
$scope.selectGame = function(board){
  $scope.selectedBoard = board
  console.log('type',typeof($scope.selectedBoard.playersboard))
//   console.log('gettingboard',board.playersboard);
//   $scope.currentPlayersboard = [];
//   var tempboard = board.playersboard.split(",");
// var size = 9
//   for (var i =0; i < tempboard.length; i +=size){
//     var row = tempboard.slice(i,i+size);
//     $scope.currentPlayersboard.push(row);
//     row = [];
//   }
//   console.log('scopecurrentboard',$scope.currentPlayersboard);
}

//Delete Game
$scope.deleteGame = function(game){
  game.$delete();
}

//New Game Modal
$scope.newGame= function(){
  $mdDialog.show({
    templateUrl:'views/newGameModal.html',
    clickOutsideToClose: true,
    controller: 'GameCtrl'
  })
}

//Build Toggle
function buildToggler(navID) {
  var debounceFn =  $mdUtil.debounce(function(){
    $mdSidenav(navID)
    .toggle()
    .then(function () {
      $log.debug("toggle " + navID + " is done");
    });
  },200);
  return debounceFn;
}

//Hide Show Menu
$scope.toggleLeft = buildToggler('left');

// Logout
$scope.logout = function(){
  UserService.logout(function(err,data){
  });
$location.path('/')
}

}]);