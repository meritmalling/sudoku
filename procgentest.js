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

var trueboard = [

1, 4, 5, 8, 3, 6, 2, 7, 9,
2, 9, 7, 5, 1, 4, 3, 8, 6,
8, 6, 3, 9, 2, 7, 5, 1, 4,

9, 5, 1, 6, 7, 3, 8, 4, 2,
3, 8, 2, 4, 5, 9, 7, 6, 1,
6, 7, 4, 2, 8, 1, 9, 5, 3,

4, 2, 6, 7, 9, 5, 1, 3, 8,
7, 3, 8, 1, 4, 2, 6, 9, 5,
5, 1, 9, 3, 6, 8, 4, 3, 7

]

var falseboard = [

1, 4, 5, 8, 3, 6, 6, 7, 9,
2, 9, 7, 5, 1, 4, 3, 8, 6,
8, 6, 3, 9, 2, 7, 8, 1, 4,

9, 5, 1, 6, 7, 5, 8, 4, 2,
3, 8, 2, 4, 5, 9, 7, 6, 1,
6, 7, 4, 2, 8, 1, 9, 5, 3,

4, 2, 6, 7, 9, 4, 1, 3, 8,
7, 2, 8, 1, 4, 2, 6, 9, 5,
5, 1, 7, 3, 1, 8, 4, 3, 7

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
        return temp.join() == nums.join();
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

