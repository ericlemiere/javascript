var gridNum = 10;
var mineNum = 10;


function createMinefield() {
    let minefield = {};
    minefield.rows = [];

    for (let y = 0; y < gridNum; y++) {
        let row = {};
        row.spots = [];

        for (let x = 0; x < gridNum; x++) {
            let spot = {};
            spot.isCovered = true;
            spot.content = "empty";
            row.spots.push(spot);
        }
        minefield.rows.push(row);
    }
    placeRandomMines(minefield);
    calculateAllNumbers(minefield);
    return minefield;
}


function getSpot(minefield, row, column) {
    return minefield.rows[row].spots[column];
}


function placeRandomMines(minefield) {
    for (let i = 0; i < mineNum; i++) {
        let row = Math.round(Math.random() * (gridNum - 1));
        let column = Math.round(Math.random() * (gridNum - 1));
        let spot = getSpot(minefield, row, column);
        spot.content = "mine";
    }
}


function calculateNumber(minefield, row, col) {
    let thisSpot = getSpot(minefield, row, col);

    // if spot contains a mine, then we can't place a number in the spot
    if (thisSpot.content == "mine") return;

    let mineCount = 0;

    // check row above if this isn't first row
    if (row > 0) {
        // check colum to the left if this isn't first column
        if (col > 0) {
            let spot = getSpot(minefield, row - 1, col - 1);
            if (spot.content == "mine") mineCount++;
        }

        // get spot above
        let spot = getSpot(minefield, row-1, col);
        if (spot.content == "mine") mineCount++;

        // check col to the right if this is not last col
        if (col < gridNum - 1) {
            let spot = getSpot(minefield, row-1, col+1);
            if (spot.content == "mine") mineCount++;
        }
    }

    if (col > 0) {
        let spot = getSpot(minefield, row, col - 1);
        if (spot.content == "mine") mineCount++;
    }

    if (col < gridNum - 1) {
        let spot = getSpot(minefield, row, col + 1);
        if (spot.content == "mine") mineCount++;
    }


    if (row < gridNum - 1) {
        if (col > 0) {
            let spot = getSpot(minefield, row + 1, col - 1);
            if (spot.content == "mine") mineCount++;
        }

        let spot = getSpot(minefield, row+1, col);
        if (spot.content == "mine") mineCount++;

        if (col < gridNum - 1) {
            let spot = getSpot(minefield, row+1, col+1);
            if (spot.content == "mine") mineCount++;
        }
    }

    if(mineCount > 0) thisSpot.content = mineCount;
}


function calculateAllNumbers(minefield) {
    for (let y = 0; y < gridNum; y++) {
        for (let x = 0; x < gridNum; x++) {
            calculateNumber(minefield, x, y);
        }
    }
}


function hasWon(minefield) {
    for (let y = 0; y < gridNum; y++) {
        for (let x = 0; x < gridNum; x++) {
            let spot = getSpot(minefield, y, x);
            if (spot.isCovered && spot.content != "mine") {
                return false;
            }
        }
    }

    return true;
}




const minesweeperModule = angular.module('minesweeperApp', []);

const minesweeperController = function($scope) {
    $scope.gameName = "MINESWEEPER";
    $scope.minefield = createMinefield();
    
    $scope.updateLevel = function(mines, grid) {
        mineNum = mines;
        gridNum = grid;
        $scope.minefield = createMinefield();
    }

    $scope.uncoverSpot = function(spot) {
        spot.isCovered = false;

        if(spot.content == "mine") { 
            $scope.hasLostMessageVisible = true; 
        }
        else {
            if (hasWon($scope.minefield)) $scope.isWinMessageVisible = true;
        }
    }

    $scope.resetMinefield = function() {
        $scope.minefield = createMinefield();
        $scope.isWinMessageVisible = false;
        $scope.hasLostMessageVisible = false;
        $scope.navigateMessage = true;
    }
}


minesweeperModule.controller("minesweeperController", minesweeperController);