function Board(){
  this.board = [];
  this.setBoard(8,8);
};

Board.prototype.setBoard = function(x, y){
  for(var i = 0; i < x; i++) {
          board[i] = [];
          for(var j = 0; j  < y; j++) {
                  board[i][j] = '-';
          }
  }
}

function chessPiece(name, strRepr){
  this.stringRepr = strRepr;
  this.name = name;
};

chessPiece.prototype.move = function(direction){
  // Here you can put generic code for moving peices.
  switch(direction):
      'up':
      		this.up();
      		break;
      'down':
      		this.down();
      		break;
      'left':
      		this.left()
      		break;
      'right':
      		this.right();
      		break;
      default:
            break;
}

function Bishop(){
  chessPiece.call(this);
}
Bishop.prototype = new chessPiece('Bishop', '@');
  
chessPiece.prototype.move = function(){
      for (var i = (x-1); i >= 0; i--) {
              for (var j = (y-1); j >= 0; j--) {
                      if(-(i-x) == -(j-y)) {
                              if( isEmpty(i,j) ) {
                                      moves.push(i+ ',' +j);
                              } else {
                                      break upleft;
                              }
                      }
              }
      }
}
chessPiece.prototype.move = function(){
      for (var i = (x+1); i < board.length; i++) {
              for (var j = (y+1); j < board[0].length; j++) {
                      if((i-x) == (j-y)) {
                              if( isEmpty(i,j) ) {
                                      moves.push(i+ ',' +j);
                              } else {
                                      break downright;
                              }
                      }
              }
      }
}
chessPiece.prototype.move = function(){ 
      for (var i = (x+1); i < board.length; i++) {
              for (var j = (y-1); j >= 0; j--) {
                      if ((i-x) == -(j-y)) {
                              if( isEmpty(i,j) ) {
                                      moves.push(i+ ',' +j);
                              } else {
                                      break downleft;
                              }
                      }
              }
      }
}
chessPiece.prototype.up = function(){
      for (var i = (x-1); i >= 0; i--) {
              for (var j = (y+1); j < board[0].length; j++) {
                      if (-(i-x) == (j-y)) {
                              if( isEmpty(i,j) ) {
                                      moves.push(i+ ',' +j);
                              } else {
                                      break upright;
                              }
                      }
              }
      }
}


//##############

var board = [];

setBoard(8,8);
setStdBoard();
displayBoard();

//displayMoves(4,4, movesRook(4,4)); //using test Rook on setStdBoard();
displayMoves(movesBishop(2,2)); //same

function setBoard (x,y) {

        for(var i = 0; i < x; i++) {
                board[i] = [];
                for(var j = 0; j  < y; j++) {
                        board[i][j] = '-';
                }
        }
/*
        for(var i = 0; i < x; i++) {
                board[i] = [];
                for(var j = 0; j  < y; j++) {
                        board[i][j] = i+','+j;
                }
        }
*/
}

function setPiece(x,y,type) {
        board[x][y] = type;
}

function setStdBoard() {

  		// Maybe these should be constants of Board or chessPiece?
        var P = 'P'; var R = 'R'; var N = 'N'; var B = 'B'; var Q = 'Q'; var K = 'K';

        for(var i = 0; i < 8; i++) {
                board[1][i] = P;
                board[6][i] = P;
        }

        setPiece(0,0,R); setPiece(0,7,R); setPiece(7,0,R); setPiece(7,7,R);
        setPiece(0,1,N); setPiece(0,6,N); setPiece(7,1,N); setPiece(7,6,N);
        setPiece(0,2,B); setPiece(0,5,B); setPiece(7,2,B); setPiece(7,5,B);
        setPiece(0,3,Q); setPiece(7,4,Q);
        setPiece(0,4,K); setPiece(7,3,K);

//      setPiece(4,4,R);
        setPiece(2,2,B);

}

function displayBoard() {

        for(var i = 0; i < board.length; i++) {
                for(var j = 0; j < board[0].length; j++) {
                        process.stdout.write(board[i][j] + ' ');
                }
                process.stdout.write('\n');
        }

        process.stdout.write('\n'); //for terminal purposes
}

function displayMoves(movesPiece) {

        var moves = movesPiece;

        for(var i = 0; i < moves.length; i++) {
                process.stdout.write(moves[i]+ '; ');
        }

        process.stdout.write('\n');

        var displayBoard = JSON.parse(JSON.stringify(board));

        var display = [];
        var displayX = [];
        var displayY = [];

        for(var i = 0; i < moves.length; i++) {
                display = moves[i].split(',');
                displayX.push(display[0]);
                displayY.push(display[1]);
        }

        for(var i = 0; i < displayX.length; i++) {
                displayBoard[displayX[i]][displayY[i]] = 'x';
        }

        process.stdout.write('\n');

        for(var i = 0; i < displayBoard.length; i++) {
                for(var j = 0; j < displayBoard[0].length; j++) {
                        process.stdout.write(displayBoard[i][j] + ' ');
                }
                process.stdout.write('\n');
        }

        process.stdout.write('\n'); //for terminal purposes

}

function isEmpty(x, y) {
        if(board[x][y] == '-') {
                return true;
        } else {
                return false;
        }
}

function movesRook(x,y) {
        var moves = [];

        for (var i = (x-1); i >= 0; i--) {
                if( isEmpty(i,y) ) {
                        moves.push(i+ ',' +y);
                } else {
                        break;
                }
        }

        for (var i = (x+1); i < board.length; i++) {
                if( isEmpty(i,y) ) {
                        moves.push(i+ ',' +y);
                } else {
                        break;
                }
        }

        for (var j = (y-1); j >= 0; j--) {
                if( isEmpty(x,j) ) {
                        moves.push(x+ ',' +j);
                } else {
                        break;
                }
        }

        for (var j = (y+1); j < board[0].length; j++) {
                if( isEmpty(x,j) ) {
                        moves.push(x+ ',' +j);
                } else {
                        break;
                }
        }

        return moves;
}

function movesBishop(x,y) {
        var moves = [];

        return moves;
}
