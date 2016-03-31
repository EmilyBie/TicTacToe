console.log('tictactoe');
var size = 3;
var playerX = "X";
var playerO = "O";
var board = document.querySelector('.board');
var table = document.querySelector('table');
var selectBoardSize = document.getElementById('slectBoardSize');
var list = document.querySelectorAll('ul li');
var playerXWinsTimes = document.getElementById('playerXWins');
var playerOWinsTimes = document.getElementById('playerOWins');
var tiesTimes = document.getElementById('ties'); 
var selectPlayer = document.getElementById('selectPlayer');
var startAgainBtn = document.getElementById('startAgain');
startAgain.style.visibility = "hidden";
var winMsg = document.getElementById('whoWinsMsg');
winMsg.style.visibility = "hidden";
var clearBtn = document.getElementById('clearBtn');
var player = {
  startPlayer: playerX,
  currentPlayer: ""
}
var boardArray = [["","",""],["","",""],["","",""]];

var scores = {
  Xwin: 0,
  Owin: 0,
  tie: 0
}

var saveScores = function() {
  localStorage.setItem('Xwin',scores.Xwin);
  localStorage.setItem('Owin',scores.Owin);
  localStorage.setItem('tie',scores.tie);
}

var getLocalStorage = function() {
  if(localStorage.getItem('Xwin')) {
    scores.Xwin = localStorage.getItem('Xwin');
  }
  if(localStorage.getItem('Owin')) {
    scores.Owin = localStorage.getItem('Owin');
  }
  if(localStorage.getItem('tie')) {
    scores.tie = localStorage.getItem('tie');
  }
}

var initWebpage = function() {
  getLocalStorage();
  playerXWinsTimes.innerHTML = scores.Xwin; 
  playerOWinsTimes.innerHTML = scores.Owin;
  tiesTimes.innerHTML = scores.tie;
}

initWebpage();

try{
  setInterval(saveScores,1000);
} catch(e) {
  if(e === QUOTA_EXCEEDED_ERR) {
     alert('Quota exceeded!');
     localStorage.clear();
  }
}



var chooseStartPlayer = function() {
  var value = selectPlayer.options[selectPlayer.selectedIndex].value;
  if(value != "X" && value != "O") {
    player.startPlayer = playerX;
  } else {
    player.startPlayer = value;
  }
}

selectPlayer.addEventListener('change',chooseStartPlayer,false);

var scanBoard = function() {
  var table = document.querySelector('table');
  var cells = table.getElementsByTagName('td');
  for(var i=0; i<cells.length;i++) {
    var rowIndex = Math.floor(i/3);
    var columnIndex = i%3;
    if(cells[i].classList.contains("X-bg")) {
        boardArray[rowIndex][columnIndex] = playerX;
    } else if(cells[i].classList.contains("O-bg")) {
        boardArray[rowIndex][columnIndex] = playerO;
    } else {
        boardArray[rowIndex][columnIndex] = "";
    }
  }
}

var checkWins = function(size,player,boardArray) {
  var countDiagonalDown = 0;
  var countDiagonalUp = 0;
  for(var i=0;i<boardArray.length;i++) {
    var countRow = 0;
    var countColumn = 0;
    for(var j=0;j<boardArray[i].length;j++) {
      if (boardArray[i][j] === player) {
        countRow++;
      }
      if(boardArray[j][i] === player) {
        countColumn ++;
      }
    }
    if(countRow === size) {
      return true;
    }
    if(countColumn === size) {
      return true;
    }
    if(boardArray[i][i] === player) {
      countDiagonalDown ++;
    }
    if(boardArray[i][size-i-1] === player) {
      countDiagonalUp ++;
    } 
  }
  if(countDiagonalDown === size || countDiagonalUp === size) {
    return true;
  } else {
    return false;
  }  
}

var isXWins = function() {
  return checkWins(size,playerX,boardArray);
}

var isOWins = function() {
  return checkWins(size,playerO,boardArray);
}

var getWinner = function() {
  if(isXWins()) {
    return playerX;
  } else if(isOWins()) {
    return playerO;
  } else if(isBoardFull(boardArray)) {
    return "tie";
  } else {
    return false;
  }  
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
  var tds = document.querySelectorAll('td');
  for(var i=0;i<tds.length;i++) {
    var isXbg = tds[i].classList.contains("X-bg");
    var isObg = tds[i].classList.contains("O-bg");
    if(isXbg) {
      tds[i].classList.remove("X-bg");
      tds[i].classList.remove('not-hover');
      tds[i].classList.add("without-bg");
    }
    if(isObg) {
      tds[i].classList.remove("O-bg");
      tds[i].classList.remove('not-hover');
      tds[i].classList.add("without-bg");
    }
  }
  initBoardArray();

}
var makeBoardNoHover = function () {
  var tds = document.querySelectorAll('td');
  for(var i=0; i<tds.length;i++) {
    var containsNotHover = tds[i].classList.contains("not-hover");
    if(!containsNotHover) {
      tds[i].classList.add('not-hover');
    }
  }
}

var startAgainBtnDisplay = function() {
  if(getWinner()) {
    startAgainBtn.style.visibility = "visible";
  } else {
    startAgain.style.visibility = "hidden";
  }
}

var winnerMsgDisplay = function(winner) {
  winMsg.style.visibility = "visible";
  if(winner === "X") {
    winMsg.innerHTML = "Player X wins!";
  } else if(winner === "O") {
    winMsg.innerHTML = "Player O wins!";
  } else if(winner === "tie") {
    winMsg.innerHTML = "There is a tie!";
  }
}

var gameOverDisplay = function(winner) {
  if(winner === playerX) {

  }
}

board.addEventListener('click',function(){
  // debugger
  //if there is no winner 
  if(getWinner() === false) {
      if(event.target.tagName === 'TD') {
      if(event.target.classList.contains("without-bg")) {
        event.target.classList.remove("without-bg");
        if(player.currentPlayer === "") {
          player.currentPlayer = player.startPlayer;
        } 
        if(player.currentPlayer === playerX) {
          event.target.classList.add("X-bg");
          event.target.classList.add('not-hover');
          list[0].className = "current";
          list[1].className = "notCurrent";
          player.currentPlayer = playerO;
        } else if(player.currentPlayer === playerO) {
          event.target.classList.add("O-bg");
          event.target.classList.add('not-hover');
          list[0].className = "notCurrent";
          list[1].className = "current";
          player.currentPlayer = playerX;
        }

        scanBoard();
        var winner = getWinner();
        if(winner === playerX) {
          scores.Xwin++;
          playerXWinsTimes.innerHTML = scores.Xwin;
        } else if(winner === playerO) {
          scores.Owin++;
          playerOWinsTimes.innerHTML = scores.Owin;         
        } else if(winner === "tie") {
            scores.tie++;
            tiesTimes.innerHTML = scores.tie;
            list[0].className = "notCurrent";
            list[1].className = "notCurrent";
            list[2].className = "current";
            player.currentPlayer = "";                              
        } 

        if(winner != false) {
          makeBoardNoHover();
          player.currentPlayer = "";
          startAgainBtnDisplay();
          winnerMsgDisplay(winner);
          // scoresCache();
        }
      }
    }
  }
});

var initScoresDisplay = function () {
  for(var i=0;i<list.length;i++) {
    list[i].className = "notCurrent";
  }
}

var gameStartAgain = function() {
  clearBoard();
  startAgainBtn.style.visibility = "hidden";
  winMsg.style.visibility = "hidden";
  initScoresDisplay();
}
startAgainBtn.addEventListener('click',gameStartAgain);


clearBtn.addEventListener('click',function(){
  localStorage.clear();
  scores.Xwin = 0;
  scores.Owin = 0;
  scores.tie = 0;
  playerXWinsTimes.innerHTML = scores.Xwin; 
  playerOWinsTimes.innerHTML = scores.Owin;
  tiesTimes.innerHTML = scores.tie;
  initScoresDisplay();
});

var changeBoard = function(newSize) {

}

var updateBoardSize = function() {
  //check if the game is started and not end, selectBoardSize can not change
  var isGameOver;
  if(getWinner() === false) {
    isGameOver = false;
    alert('You are in the middle of a game, cannot change board size');
    return;
  } else {
    isGameOver = true;
  }
  //while game is over, user can change board size
  if(isGameOver) {
    var newSize =  selectBoardSize.options[selectBoardSize.selectedIndex].value;
    //pass newSize to change html board

  }
}
selectBoardSize.addEventListener('change',updateBoardSize,false);









