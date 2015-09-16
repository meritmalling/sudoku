SudokuApp.controller('GameCtrl', ['$scope', '$http', '$mdDialog', 'UserService', 'User', 'Game', function($scope, $http, $mdDialog, UserService, User, Game){

console.log('Game Controller')

$scope.UserService = UserService;
$scope.$watchCollection('UserService', function(){
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

//Turn Solution Into Object
var arrObj = function(array){
        var newArray = [];
        for (i = 0; i < array.length; i++){
          console.log(array[i])
                if (array[i] === ('1' || '2' || '3' || '4' || '5' || '6'  || '7' || '8' || '9')){
                        newArray.push({
                                num: array[i],
                                compNum: true
                        })
                }else{
                        newArray.push({
                                num: array[i],
                                compNum: false
                        })
                }
        }
        console.log('newArray',newArray)
        return newArray
}


//Generate Gameboard!!!

//Clone The Solution Board
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
      row[i] = " "
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

//Make Gameboard Clone
starter = cloneRows($scope.solution)
$scope.starter = replaceBoard(starter)

//Make Player's Solution Clone
$scope.playersboard = cloneRows($scope.starter)


//Create Game
$scope.createGame = function(){
  User.get({username: $scope.newGame.friend}).then(function(user){
    var newGame = {
      name: $scope.newGame.name,
      solution: arrObj($scope.solution.toString().split(',')),
      starter: arrObj($scope.starter.toString().split(',')),
      playersboard: arrObj($scope.playersboard.toString().split(',')),
      players: $scope.currentUser[0].id  + ',' + user.id
    }
    console.log('params from angular', newGame);
    $http.post('/api/game', newGame).success(function(data){
      console.log('result params', data)
    })
  })
  $scope.closeDialog();
}
$scope.closeDialog = function(){
  $mdDialog.hide();
}

//Watch GameBoard
$scope.$watch('selectedBoard', function (newVal, oldVal){
  console.log("Changed");
}, true)

//AutoSave On Keypress
$scope.keyup = function(){
  $scope.selectedBoard.$save()
}






}]);