SudokuApp.controller('GameCtrl', ['$scope', '$http', '$mdDialog', 'UserService', 'User', 'Game', '$mdToast', function($scope, $http, $mdDialog, UserService, User, Game, $mdToast){

  console.log('Game Controller')

  $scope.UserService = UserService;
  $scope.$watchCollection('UserService', function(){
    $scope.currentUser = UserService.currentUser;
  });

//Generate Gameboard!!!

var emptyboard = [
0, 0, 0, 0, 0, 0, 0, 0, 0,
0, 0, 0, 0, 0, 0, 0, 0, 0,
0, 0, 0, 0, 0, 0, 0, 0, 0,

0, 0, 0, 0, 0, 0, 0, 0, 0,
0, 0, 0, 0, 0, 0, 0, 0, 0,
0, 0, 0, 0, 0, 0, 0, 0, 0,

0, 0, 0, 0, 0, 0, 0, 0, 0,
0, 0, 0, 0, 0, 0, 0, 0, 0,
0, 0, 0, 0, 0, 0, 0, 0, 0

]

//Find Row
var whichRow = function(cell) {
    return Math.floor(cell / 9);
}

//Find Col
var whichCol = function(cell) {
    return cell % 9;
}

//Find 3X3
var whichSquare = function (cell) {
    return (Math.floor(whichRow(cell) / 3) * 3) + (Math.floor(whichCol(cell) / 3));
}

//Does this number work in this row?
var possibleRow = function(test,row,array) {
    for (var i =0; i <= 8; i+= 1) {
        if (array[row * 9 + i] === test) {
            return false;
        }
    }
    return true;
}

//Does this number work in this col?
var possibleCol = function(test,col,array) {
    for (var i =0; i <=8; i += 1) {
        if (array [col + 9 * i] === test) {
            return false;
        }
    }
    return true;
}

//Does this number work in this sqaure?
var possibleSquare = function(test,block,array) {
    for (var i = 0; i <=8; i += 1) {
        if (array [Math.floor(block/3) * 27 + i % 3 + 9 * Math.floor(i/3) + 3 * (block%3) ] === test) {
            return false;
        }
    }
    return true;
}

//Test Row
var testRow = function(row,array) {
    var nums = new Array(1,2,3,4,5,6,7,8,9);
    var temp = new Array();
    for (var  i = 0; i <= 8; i += 1) {
        temp[i] = array[row * 9 + i];
    }
    temp.sort();
    return temp.join() === nums.join();
}

//Test Column
var testCol = function(col,sudoku) {
    var nums = new Array(1,2,3,4,5,6,7,8,9);
    var temp = new Array();
    for (var i = 0; i<= 8; i += 1) {
        temp[i] = sudoku[col + i * 9];
    }
    temp.sort();
    return temp.join() === nums.join();
}

//Test Square
var testSquare = function (square,array) {
    var nums = new Array(1,2,3,4,5,6,7,8,9);
    var temp= new Array();
    for (var i = 0;  i<= 8; i += 1) {
        temp[i] = array[Math.floor(square / 3) * 27+ i % 3 + 9 * Math.floor( i / 3) +3 * (square % 3)];
    }
    temp.sort();
    return temp.join() === nums.join();
}

//Does this number work in this cell?
var possibleNumber =function (cell,number,array) {
    var row = whichRow(cell);
    var col = whichCol(cell);
    var square = whichSquare(cell);
    return possibleRow(number,row,array) && possibleCol(number,col,array) && possibleSquare(number,square,array);
}

//Complete and Correct?
var done =function(array) {
    for (var i = 0; i <= 8; i += 1) {
        if (!testSquare(i, array) || !testRow(i, array) || !testCol(i, array)) {
            return false;
        }
    }
    return true;
}

//Possibilities!
var thePossibilities = function(cell,sudoku) {
    var maybe = new Array();
    for (var i = 1; i <= 9; i += 1) {
        if (possibleNumber(cell,i,sudoku)) {
            maybe.unshift(i);
        }
    }
    return maybe;
}

//Picks Random From Possibilities!
var random = function(possible,cell) {
    var randomPicked = Math.floor(Math.random() * possible[cell].length);
    return possible[cell][randomPicked];
}

//Array of Possibilities For Each Cell
var find = function(array) {
    var possible = new Array();
    for (var i = 0; i <= 80; i += 1) {
        if (array[i] === 0) {
            possible[i] = new Array();
            possible[i] = thePossibilities(i,array);
            if (possible[i].length === 0) {
                return false;
            }
        }
    }
    return possible;
}

//Not A Possibility
var remove = function(array,number) {
    var newArray = new Array();
    for (var i=0; i<array.length; i++) {
        if (array[i] != number) {
            newArray.unshift(array[i]);
        }
    }
    return newArray;
}

// Picks Cell With Most Constraints
var nextRandom = function(possible) {
    var max = 9;
    var minChoices = 0;
    for (var i=0; i<=80; i++) {
        if (possible[i]!=undefined) {
            if ((possible[i].length<=max) && (possible[i].length>0)) {
                max = possible[i].length;
                minChoices = i;
            }
        }
    }
    return minChoices;
}

//Create Board!
var create = function(array) {
    var saved = new Array();
    var savedBoard = new Array();
    var nextMove;
    var whatToTry;
    var attempt;
    while (!done(array)) {
        nextMove = find(array);
        if (nextMove === false) {
            nextMove = saved.pop();
            array = savedBoard.pop();
        }
        whatToTry = nextRandom(nextMove);
        attempt = random(nextMove,whatToTry);
        if (nextMove[whatToTry].length>1) {
            nextMove[whatToTry] = remove(nextMove[whatToTry],attempt);
            saved.push(nextMove.slice());
            savedBoard.push(array.slice());
        }
        array[whatToTry] = attempt;
    }
    return(array);
}

$scope.newgameboard = create(emptyboard);
console.log($scope.newgameboard)
//Splice Generated Board Into Array of Arrays
var spliceBoard = function(array){
  var size = 9;
  var splitBoard = [];
  for (var i = 0; i < array.length; i += size) {
    var temp = array.slice(i, i + size);
    splitBoard.push(temp)
  }
  return splitBoard
}

//Hard Coded Game Board
$scope.solution = spliceBoard($scope.newgameboard);

//Turn Solution Into Object
var arrObj = function(array){
  var newArray = [];
  for (i = 0; i < array.length; i++){
// console.log(array[i])
if ( (array[i] === '1') ||  (array[i] === '2') || (array[i] === '3') || (array[i] === '4') || (array[i] === '5') || (array[i] === '6')  || (array[i] === '7') || (array[i] === '8') || (array[i] === '9') ){
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
return newArray
}

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
    newGame = {
      name: $scope.newGame.name,
      solution: arrObj($scope.solution.toString().split(',')),
      starter: arrObj($scope.starter.toString().split(',')),
      playersboard: arrObj($scope.playersboard.toString().split(',')),
      players: $scope.currentUser[0].id  + ',' + user.id
    }
    $http.post('/api/game', newGame).success(function(data){
      $scope.closeDialog();
    })
  })
}

//Check Winner
$scope.checkWinner = function(){
var objToArr = function(obj){
        newArray = []
        for (var i = 0; i < obj.length ;i += 1){
                // console.log(obj[i].num)
                newArray.push(obj[i].num)
        }
        return newArray.toString()
}
var testItemOne = objToArr($scope.selectedBoard.solution)
var testItemTwo = objToArr($scope.selectedBoard.playersboard)

  if (testItemOne === testItemTwo){
    console.log('Equal')
    $mdToast.show($mdToast.simple().content('Puzzle solved, well done!'));
  }
}

//Close Dialog
$scope.closeDialog = function(){
  $mdDialog.hide();
}

//Watch GameBoard
$scope.$watch('selectedBoard', function (newVal, oldVal){
// console.log("Changed");
}, true)

//AutoSave On Keypress
$scope.keyup = function(){
  $scope.selectedBoard.$save()
  $scope.checkWinner()
}

//API Call For Math Facts
$scope.getFacts = function(){
  $http.get('/api/numbers').success(function(data){
    console.log(data.text)
    $scope.mathFacts = data
  })
}

}]);