console.log('tictactoe');
var playerX = "X";
var playerO = "O";
var board = document.querySelector('.board');
var table = document.querySelector('table');
var list = document.querySelectorAll('ul li');
var playerXWinsTimes = document.getElementById('playerXWins');
var playerOWinsTimes = document.getElementById('playerOWins');
var tiesTimes = document.getElementById('ties'); 
var player = {
  startPlayer: playerX,
  currentPlayer: ""
}
var boardArray = [["","",""],["","",""],["","",""]];


var scanBoard = function() {
  var table = document.querySelector('table');
  var cells = table.getElementsByTagName('td');
  for(var i=0; i<cells.length;i++) {
    var rowIndex = Math.floor(i/3);
    var columnIndex = i%3;
    // debugger
    if(cells[i].classList.contains("X-bg")) {
        boardArray[rowIndex][columnIndex] = playerX;
    } else if(cells[i].classList.contains("O-bg")) {
        boardArray[rowIndex][columnIndex] = playerO;
    } else {
        boardArray[rowIndex][columnIndex] = "";
    }
  }
}

var winsRow = function(player) {
  var firstRow = ((boardArray[0][1] ===player)&& (boardArray[0][2] === player) && (boardArray[0][0] === player));
  var secondRow = ((boardArray[1][1] ===player)&& (boardArray[1][2] === player) && (boardArray[1][0] === player));
  var thirdRow = ((boardArray[2][1] ===player)&& (boardArray[2][2] === player) && (boardArray[2][0] === player));
  return firstRow || secondRow || thirdRow;

}
var winsColumn = function(player) {
  var firstCol = ((boardArray[0][0] === player) && (boardArray[1][0] === player) && (boardArray[2][0] === player));
  var secondCol = ((boardArray[0][1] === player) && (boardArray[1][1] === player) && (boardArray[2][1] === player));
  var thirdCol = ((boardArray[0][2] === player) && (boardArray[1][2] === player) && (boardArray[2][2] === player));
  return firstCol || secondCol || thirdCol;
}
var winsDiagonal = function(player) {
  var firstDia = ((boardArray[0][0] === player) && (boardArray[1][1] === player) && (boardArray[2][2] === player));
  var secondDia = ((boardArray[0][2] ===player) && (boardArray[1][1] === player) && (boardArray[2][0] === player));
  return firstDia || secondDia;
}

var isXWins = function() {
  return winsRow(playerX) || winsColumn(playerX) || winsDiagonal(playerX);
}

var isOWins = function() {
  return winsRow(playerO) || winsColumn(playerO) || winsDiagonal(playerO);
}

var getWinner = function() {
  if(isXWins()) {
    return playerX;
  }
  if(isOWins()) {
    return playerO;
  }
  return false;
}

var isBoardFull = function (boardArray) {
  for(var i=0;i<boardArray.length;i++) {
    for(var j=0; j<boardArray[i].length;j++) {
      if(boardArray[i][j] === "") {
        return false;
      }
    }
  }
  return true;
}

var initBoardArray = function() {
  boardArray = [["","",""],["","",""],["","",""]];
}

var clearBoard = function() {
  // debugger
  var tds = document.querySelectorAll('td');
  for(var i=0;i<tds.length;i++) {
    var isXbg = tds[i].classList.contains("X-bg");
    var isObg = tds[i].classList.contains("O-bg");
    if(isXbg) {
      tds[i].classList.remove("X-bg");
      tds[i].classList.add("without-bg");
    }
    if(isObg) {
      tds[i].classList.remove("O-bg");
      tds[i].classList.add("without-bg");
    }
  }
  initBoardArray();

}

board.addEventListener('click',function(){
  // debugger
  if(event.target.tagName === 'TD') {
      if(event.target.classList.contains("without-bg")) {
        event.target.classList.remove("without-bg");
        if(player.currentPlayer === "") {
          player.currentPlayer = player.startPlayer;
        } 
        if(player.currentPlayer === playerX) {
          event.target.classList.add("X-bg");
          list[0].className = "current";
          list[1].className = "notCurrent";
          player.currentPlayer = playerO;
        } else if(player.currentPlayer === playerO) {
          event.target.classList.add("O-bg");
          list[0].className = "notCurrent";
          list[1].className = "current";
          player.currentPlayer = playerX;
        }

        scanBoard();
        var winner = getWinner();
        // debugger
        if(winner === playerX) {
          playerXWinsTimes.innerHTML = Number(playerXWinsTimes.innerHTML) + 1;
          clearBoard();
        } else if(winner === playerO) {
          playerOWinsTimes.innerHTML = Number(playerOWinsTimes.innerHTML) + 1;
          clearBoard();
        } else if(winner === false) {
          //boardIsFull:true
          if(isBoardFull(boardArray)) {
            //board is full and still cannot get winner(winner === false)
            tiesTimes.innerHTML = Number(tiesTimes.innerHTML) + 1;
            //clear the board and start again
            clearBoard();
          }                    
        }        
        
      } else {
        
      }
  }
});











