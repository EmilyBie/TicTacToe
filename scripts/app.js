console.log('tictactoe');
var size = 3;
var winSize = 3;
var playerX = "X";
var playerO = "O";
var board = document.querySelector('.board');
var table = document.querySelector('table');
var selectBoardSize = document.getElementById('slectBoardSize');
var selectBoardStyle = document.getElementById('customizeTokens');
var boardStyle = "classic";
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
var boardArray = [];
var scores = {
  Xwin: 0,
  Owin: 0,
  tie: 0
}
//==========initialize the boardArray===========
var boardArrayInit = function() {
  var newBoardArray = [];
  for(var i=0;i<size;i++) {
    var array = [];
    for(var j=0; j<size;j++) {
        array.push("");
    }
    newBoardArray.push(array);
  }
  return newBoardArray;
}

boardArray = boardArrayInit();

//===============Local stroage to save scores===========
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
//get local storage when refresh page
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

//===============choose start player X or O ===============
var chooseStartPlayer = function() {
  var value = selectPlayer.options[selectPlayer.selectedIndex].value;
  if(value != "X" && value != "O") {
    player.startPlayer = playerX;
  } else {
    player.startPlayer = value;
  }
}

selectPlayer.addEventListener('change',chooseStartPlayer,false);

//=================choose board style =================
var changeBoardStyle = function() {
  gameStartAgain();
  var newStyle = selectBoardStyle.options[selectBoardStyle.selectedIndex].value;
  boardStyle = newStyle;
}

selectBoardStyle.addEventListener('change',changeBoardStyle,false);

//=========scan board and update the boardArray===========
var scanBoard = function() {
  var table = document.querySelector('table');
  var cells = table.getElementsByTagName('td');
  for(var i=0; i<cells.length;i++) {
    var rowIndex = Math.floor(i/size);
    var columnIndex = i%size;
    if(cells[i].classList.contains("X-bg") || cells[i].classList.contains("X-cake-bg") ||cells[i].classList.contains("cat-bg") ) {
        boardArray[rowIndex][columnIndex] = playerX;
    } else if(cells[i].classList.contains("O-bg") || cells[i].classList.contains("O-cake-bg") ||cells[i].classList.contains("panda-bg")) {
        boardArray[rowIndex][columnIndex] = playerO;
    } else {
        boardArray[rowIndex][columnIndex] = "";
    }
  }
}

//============= winSize = 3 check wins============
var checkWins = function(size,player,boardArray) {
  //check diagonals
  for(var i=2;i<boardArray.length;i++) {
    for(var j=2; j<boardArray[i].length;j++) {
      if((boardArray[i-2][j-2] === player) && (boardArray[i-1][j-1] === player) && (boardArray[i][j] === player)){
        return true;
      }
    }
  }
  for(var i=2;i<boardArray.length;i++) {
    for(var j=0; j<(boardArray[i].length-2);j++) {
      if((boardArray[i][j] === player) && (boardArray[i-1][j+1]===player) && (boardArray[i-2][j+2] === player)) {
        return true;
      }
    }
  }

  //check rows and columns
  for(var i=0;i<boardArray.length;i++) {
    var countRow = 0;
    var countColumn = 0;
    for(var j=0;j<boardArray[i].length;j++) {
      if(countRow === winSize || countColumn === winSize) {
        return true;
      }
      if (boardArray[i][j] === player) {
        countRow++;
      } else {
        countRow = 0;
      }
      if(boardArray[j][i] === player) {
        countColumn ++;
      } else {
        countColumn = 0;
      }
    }
    if(countRow === winSize) {
      return true;
    }
    if(countColumn === winSize) {
      return true;
    }
  }

  return false; 
}


var isXWins = function() {
  return checkWins(size,playerX,boardArray);
}

var isOWins = function() {
  return checkWins(size,playerO,boardArray);
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

// ===========clear board when start again,change board size or board style====
var clearBoard = function() {
  var tds = document.querySelectorAll('td');
  for(var i=0;i<tds.length;i++) {
    var isXbg = tds[i].classList.contains("X-bg") || tds[i].classList.contains("X-cake-bg") || tds[i].classList.contains("cat-bg");
    var isObg = tds[i].classList.contains("O-bg")  || tds[i].classList.contains("O-cake-bg") || tds[i].classList.contains("panda-bg");
    if(isXbg) {
      if(tds[i].classList.contains("X-bg")) {
        tds[i].classList.remove("X-bg");
      }
      if(tds[i].classList.contains("X-cake-bg")) {
        tds[i].classList.remove("X-cake-bg");
      }
      if(tds[i].classList.contains("cat-bg")) {
        tds[i].classList.remove("cat-bg");
      }
      tds[i].classList.remove('not-hover');
      tds[i].classList.add("without-bg");
    }
    if(isObg) {
      if(tds[i].classList.contains("O-bg")) {
        tds[i].classList.remove("O-bg");
      }
      if(tds[i].classList.contains("O-cake-bg")) {
        tds[i].classList.remove("O-cake-bg");
      }
      if(tds[i].classList.contains("panda-bg")) {
        tds[i].classList.remove("panda-bg");
      }
      tds[i].classList.remove('not-hover');
      tds[i].classList.add("without-bg");
    }
  }
  for(var i=0;i<boardArray.length;i++) {
    for(var j=0;j<boardArray[i].length;j++) {
      boardArray[i][j]="";
    }
  }

}
//======== disable hover of a square when it is clicked or game ends====
var makeBoardNoHover = function () {
  var tds = document.querySelectorAll('td');
  for(var i=0; i<tds.length;i++) {
    var containsNotHover = tds[i].classList.contains("not-hover");
    if(!containsNotHover) {
      tds[i].classList.add('not-hover');
    }
  }
}

//============= start again method =================
var startAgainBtnDisplay = function() {
  if(getWinner()) {
    startAgainBtn.style.visibility = "visible";
  } else {
    startAgain.style.visibility = "hidden";
  }
}
//============= display winner messages =============
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

// ============== click board event ================
board.addEventListener('click',function(){
  //if there is no winner
  if(getWinner() === false) {
      if(event.target.tagName === 'TD') {
      if(event.target.classList.contains("without-bg")) {
        event.target.classList.remove("without-bg");
        if(player.currentPlayer === "") {
          player.currentPlayer = player.startPlayer;
        } 
        if(player.currentPlayer === playerX) {
          if(boardStyle === "classic") {
            event.target.classList.add("X-bg");
          } else if(boardStyle === "cake") {
            event.target.classList.add("X-cake-bg");
          } else {
            event.target.classList.add("cat-bg");
          }
          
          event.target.classList.add('not-hover');
          list[0].className = "current";
          list[1].className = "notCurrent";
          player.currentPlayer = playerO;
        } else if(player.currentPlayer === playerO) {
          if(boardStyle === "classic") {
            event.target.classList.add("O-bg");
          } else if(boardStyle === "cake") {
            event.target.classList.add("O-cake-bg");
          } else {
            event.target.classList.add("panda-bg");
          }
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

//when window.innerWidth become smaller, change the board width and height
var changeSquareWidth = function() {
  var width = window.innerWidth;
  var tds = document.querySelectorAll('TD');
  for(var i=0;i<tds.length;i++) {
    if(width <= 550) {
      if(size === 4 ) {
        tds[i].style.height = "80px";
        tds[i].style.width = "80px";
      } else if(size === 5) {
        tds[i].style.height = "65px";
        tds[i].style.width = "65px";
      }
    } else if(width <= 650) {
      if(size === 5) {
        tds[i].style.height = "80px";
        tds[i].style.width = "80px";
      }
    } else {
      if(size === 5) {
        tds[i].style.height = "85px";
        tds[i].style.width = "85px";
      } else {
        tds[i].style.height = "100px";
        tds[i].style.width = "100px";
      } 
    }   
  }  
}
window.onresize = changeSquareWidth;

//==============change board size 3*3, 4*4, 5*5===============
var boardSizeIncrease = function(newSize) {
  var sizeIncrease = newSize -size;
  for(var i=0;i<sizeIncrease;i++) {
    var row = table.insertRow(0);
    for(var j=0;j<size;j++) {
      var cell = row.insertCell(j);
      cell.className = "without-bg square";
    }
  }
  var cellIndex = size;
  for(var i=0;i<sizeIncrease;i++) {
      for(var j=0;j<newSize;j++) {
        var row = table.rows[j];
        var cell = row.insertCell(cellIndex);
        cell.className = "without-bg square";
      }
      cellIndex++;
  }
}

var boardSizeDecrease = function(newSize) {
  var sizeDecrease = size - newSize;
  for(var i=0;i<sizeDecrease;i++) {
    table.deleteRow(0);
  }
  var cellIndex = size-1;
  for(var i=0; i<sizeDecrease;i++) {
    for(var j=0;j<newSize;j++) {
      var row = table.rows[j];
      row.deleteCell(cellIndex);
    }
    cellIndex--;
  }
}
var changeBoard = function(newSize) {
    if(newSize > size) {
      //add rows and cells
      boardSizeIncrease(newSize);   
    } else {
      //delete rows and cells
      boardSizeDecrease(newSize);
    }
    size = newSize;
    boardArray = boardArrayInit();
    changeSquareWidth();
}

var updateBoardSize = function() {
  //restart game
  gameStartAgain();
  var newSize =  Number(selectBoardSize.options[selectBoardSize.selectedIndex].value);
  //pass newSize to change board size
  changeBoard(newSize);
}
selectBoardSize.addEventListener('change',updateBoardSize,false);
