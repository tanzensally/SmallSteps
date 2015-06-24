//ChessBoardTest3 - By eagleangelo and some nice people on the pbsideachannel (you know who you are)

//ChessBoard and Chesspiece prototypes

var ChessBoard = function (x,y) {

        this.ids = 0;
        this.board = [];
        this.board = this.setBoard(this.board,x,y);

};

var ChessPiece = function (id,type,player) {
                this.id = id;
                this.type = type;
                this.player = player;
                this.hasMoved = false;
};

ChessBoard.prototype.setBoard = function(board,x,y) {

        for(var j = 0; j < y; j++) {
                board[j] = [];
                for(var i = 0; i  < x; i++) {
                        board[j][i] = null;
                }
        }
        return board;
};


//set a chess piece and gives it an ID based on a counter inside the Board

ChessBoard.prototype.setPiece = function(Board,x,y,type,player) {
        var piece = new ChessPiece(Board.ids+1,type,player);
        Board.ids++;
        Board.board[y][x] = piece;
};


//set a standard chessboard, 2 players, 8 by 8

ChessBoard.prototype.setStdBoard = function (Board) {

        for(var i = 0; i < 8; i++) {
                Board.setPiece(Board,i,1,'P',1);
                Board.setPiece(Board,i,6,'P',2);
        }

        Board.setPiece(Board,0,0,'R',1); Board.setPiece(Board,7,0,'R',1);
        Board.setPiece(Board,0,7,'R',2); Board.setPiece(Board,7,7,'R',2);

        Board.setPiece(Board,1,0,'N',1); Board.setPiece(Board,6,0,'N',1);
        Board.setPiece(Board,1,7,'N',2); Board.setPiece(Board,6,7,'N',2);

        Board.setPiece(Board,2,0,'B',1); Board.setPiece(Board,5,0,'B',1);
        Board.setPiece(Board,2,7,'B',2); Board.setPiece(Board,5,7,'B',2);

        Board.setPiece(Board,3,0,'Q',1); Board.setPiece(Board,3,7,'Q',2);
        
        Board.setPiece(Board,4,0,'K',1); Board.setPiece(Board,4,7,'K',2);

};


//display the entire chessboard, based on the type property, can be changed for id, player or possition

ChessBoard.prototype.displayBoard = function (Board) {

        for(var j = 0; j < Board.board.length; j++) {
                for(var i = 0; i < Board.board[0].length; i++) {
                        if(Board.board[j][i] == null){
                                process.stdout.write('- ');
                        } else {
				process.stdout.write(Board.board[j][i].type + ' ');
                                //process.stdout.write(Board.board[j][i].id + ' ');
                                //process.stdout.write(Board.board[j][i].player + ' ');
				//process.stdout.write(i+","+j + ' ');
                        }
                }
                process.stdout.write('\n');
        }

        process.stdout.write('\n');
};


//display the moves for a given piece; needs the list of moves from MovesPiece()

ChessBoard.prototype.displayMoves = function(movesPiece, Board) {

        var moves = movesPiece;

        process.stdout.write(moves.length +' available moves.\n')

        for(var i = 0; i < moves.length; i++) {
                process.stdout.write(moves[i]+ '; ');
        }

        process.stdout.write('\n');

        var displayBoard = JSON.parse(JSON.stringify(Board.board));

        var display = [];
        var displayX = [];
        var displayY = [];

	//the following two loops split the list of moves into X and Y, then marks an 'x' where said possition is

        for(var i = 0; i < moves.length; i++) {
                display = moves[i].split(',');
                displayX.push(display[0]);
                displayY.push(display[1]);
        }

        for(var i = 0; i < displayX.length; i++) {
                displayBoard[displayY[i]][displayX[i]] = 'x';
        }

        process.stdout.write('\n');

        for(var j = 0; j < displayBoard.length; j++) {
                for(var i = 0; i < displayBoard[0].length; i++) {
                        if(displayBoard[j][i] == null){
                                process.stdout.write('- ');
                        } else if (displayBoard[j][i] == 'x') {
                                process.stdout.write('x ');
                        } else {
                                process.stdout.write(displayBoard[j][i].type + ' ');
                        }
                }
                process.stdout.write('\n');
        }

        process.stdout.write('\n'); //for terminal purposes

};


//movement functions


//isEmpty?

ChessBoard.prototype.isEmpty = function (Board,x,y) {
        if(Board.board[y][x] == null) {
                return true;
        } else {
                return false;
        }
};

//isEnemy?

ChessBoard.prototype.isEnemy = function (Board,x,y,i,j) {
        if ( Board.board[j][i] != null ) {
                if (Board.board[y][x].player != Board.board[j][i].player) {
                        return true;
                } else {
                        return false;
                }
        } else {
                return false;
        }
};

//Provide a list of available moves for a given piece, recognize the type and return the array of moves

ChessBoard.prototype.movesPiece = function(Board,x,y) {

        var moves = [];
        var type = Board.board[y][x].type;

        switch(type) {

                case 'R':
                        moves = Board.moveN(Board,x,y,moves);
                        moves = Board.moveS(Board,x,y,moves);
                        moves = Board.moveW(Board,x,y,moves);
                        moves = Board.moveE(Board,x,y,moves);
                        return moves;

                case 'B':
                        moves = Board.moveNE(Board,x,y,moves);
                        moves = Board.moveNW(Board,x,y,moves);
                        moves = Board.moveSE(Board,x,y,moves);
                        moves = Board.moveSW(Board,x,y,moves);
                        return moves;

                case 'Q':
                        moves = Board.moveN(Board,x,y,moves);
                        moves = Board.moveS(Board,x,y,moves);
                        moves = Board.moveW(Board,x,y,moves);
                        moves = Board.moveE(Board,x,y,moves);
                        moves = Board.moveNE(Board,x,y,moves);
                        moves = Board.moveNW(Board,x,y,moves);
                        moves = Board.moveSE(Board,x,y,moves);
                        moves = Board.moveSW(Board,x,y,moves);
                        return moves;

                default:
                        break;
        }

};

//standard directions: NSEW. cross, diagonal and one at a time

ChessBoard.prototype.moveE = function(Board,x,y,moves) {

        for (var i = (x-1); i >= 0; i--) {
                if( Board.isEnemy(Board,x,y,i,y) ) {
                        moves.push(i+ ',' +y);
                        break;
                } else if( Board.isEmpty(Board,i,y) ) {
                        moves.push(i+ ',' +y);
                } else {
                        break;
                }
        }

        return moves;
};

ChessBoard.prototype.moveW = function(Board,x,y,moves) {

        for (var i = (x+1); i < Board.board[0].length; i++) {
                if( Board.isEnemy(Board,x,y,i,y) ) {
                        moves.push(i+ ',' +y);
                        break;
                } else if( Board.isEmpty(Board,i,y) ) {
                        moves.push(i+ ',' +y);
                } else {
                        break;
                }
        }

        return moves;
};

ChessBoard.prototype.moveN = function (Board,x,y,moves) {

        for (var j = (y-1); j >= 0; j--) {
                if( Board.isEnemy(Board,x,y,x,j) ) {
                        moves.push(x+ ',' +j);
                        break;
                } else if( Board.isEmpty(Board,x,j) ) {
                        moves.push(x+ ',' +j);
                } else {
                        break;
                }
        }

        return moves;
};

ChessBoard.prototype.moveS = function (Board,x,y,moves) {

        for (var j = (y+1); j < Board.board.length; j++) {
                if( Board.isEnemy(Board,x,y,x,j) ) {
                        moves.push(x+ ',' +j);
                        break;
                } else if( Board.isEmpty(Board,x,j) ) {
                        moves.push(x+ ',' +j);
                } else {
                        break;
                }
        }

        return moves;
};

ChessBoard.prototype.moveNW = function (Board,x,y,moves) {

        var i = -1; var j = -1;

        while (i+x >= 0 && j+y >= 0) {
                if( Board.isEnemy(Board,x,y,i+x,j+y) ) {
                        moves.push((i+x)+','+(j+y));
                        break;
                } else if ( Board.isEmpty(Board,i+x,j+y) ) {
                        moves.push((i+x)+','+(j+y));
                        i--; j--;
                } else {
                        break;
                }
        }
        return moves;
};

ChessBoard.prototype.moveSE = function (Board,x,y,moves) {

        var i = 1; var j = 1;

        while (i+x < Board.board[0].length && j+y < Board.board.length) {
                if( Board.isEnemy(Board,x,y,i+x,j+y) ) {
                        moves.push((i+x)+','+(j+y));
                        break;
                } else if ( Board.isEmpty(Board,i+x,j+y) ) {
                        moves.push((i+x)+','+(j+y));
                        i++; j++;
                } else {
                        break;
                }
        }
        return moves;
};

ChessBoard.prototype.moveNE = function (Board,x,y,moves) {

        var i = 1; var j = -1;

        while (i+x+1 < Board.board[0].length && j+y-1 >= 0) {
                if( Board.isEnemy(Board,x,y,i+x,j+y) ) {
                        moves.push((i+x)+','+(j+y));
                        break;
                } else if ( Board.isEmpty(Board,i+x,j+y) ) {
                        moves.push((i+x)+','+(j+y));
                        i++; j--;
                } else {
                        break;
                }
        }
        return moves;
};

ChessBoard.prototype.moveSW = function (Board,x,y,moves) {

        var i = -1; var j = 1;

        while (i+x-1 >= 0 && j+y+1 < Board.board.length) {
                if( Board.isEnemy(Board,x,y,i+x,j+y) ) {
                        moves.push((i+x)+','+(j+y));
                        break;
                } else if ( Board.isEmpty(Board,i+x,j+y) ) {
                        moves.push((i+x)+','+(j+y));
                        i--; j++;
                } else {
                        break;
                }
        }
        return moves;
};

ChessBoard.prototype.moveW1 = function (Board,x,y,moves) {

        if ((x-1) >= 0) {
                if( Board.isEnemy(Board,x,y,x-1,y) ) {
                        moves.push((x-1)+','+y);
                        return moves;
                } else if( Board.isEmpty(Board,x-1,y) ) {
                        moves.push((x-1)+ ',' +y);
                }
        }
        return moves;
};

ChessBoard.prototype.moveE1 = function (Board,x,y,moves) {

        if ((x+1) < Board.board[0].length) {
                if( Board.isEnemy(Board,x,y,x+1,y) ) {
                        moves.push((x+1)+','+y);
                        return moves;
                } else if( Board.isEmpty(Board,x+1,y) ) {
                        moves.push((x+1)+ ',' +y);
                }
        }
        return moves;
};

ChessBoard.prototype.moveN1 = function (Board,x,y,moves) {

        if ((y-1) >= 0) {
                if( Board.isEnemy(Board,x,y,x,y-1) ) {
                        moves.push(x+','+(y-1));
                        return moves;
                } else if( Board.isEmpty(Board,x,y-1) ) {
                        moves.push(x+ ',' +(y-1));
                }
        }
        return moves;
};

ChessBoard.prototype.moveS1 = function (Board,x,y,moves) {

        if ((y+1) < Board.board.length) {
                if( Board.isEnemy(Board,x,y,x,y+1) ) {
                        moves.push(x+','+(y+1));
                        return moves;
                } else if( Board.isEmpty(Board,x,j) ) {
                        moves.push(x+ ',' +(y+1));
                }
        }
        return moves;
};

ChessBoard.prototype.moveNW1 = function (Board,x,y,moves) {

        if ((x-1) >= 0 && (y-1) >= 0) {
                if( Board.isEnemy(Board,x,y,x-1,y-1) ) {
                        moves.push((x-1)+','+(y-1));
                        return moves;
                } else  if ( Board.isEmpty(Board,x-1,y-1) ) {
                        moves.push((x-1)+','+(y-1));
                }
        }
        return moves;
};

ChessBoard.prototype.moveSE1 = function (Board,x,y,moves) {

        if ((x+1) < Board.board[0].length && (y+1) < Board.board.length) {
                if( Board.isEnemy(Board,x,y,x+1,y+1) ) {
                        moves.push((x+1)+','+(y+1));
                        return moves;
                } else  if ( Board.isEmpty(Board,x+1,y+1) ) {
                        moves.push((x+1)+','+(y+1));
                }
        }
        return moves;
};

ChessBoard.prototype.moveNW1 = function (Board,x,y,moves) {

        if ((x+1) < Board.board[0].length && (y-1) >= 0) {
                if( Board.isEnemy(Board,x,y,x+1,y-1) ) {
                        moves.push((x+1)+','+(y-1));
                        return moves;
                } else  if ( Board.isEmpty(Board,x+1,y-1) ) {
                        moves.push((x+1)+','+(y-1));
                }
        }
        return moves;
};

ChessBoard.prototype.moveSE1 = function (Board,x,y,moves) {
        if ((x-1) >= 0 && (y+1) < Board.board.length) {
                if( Board.isEnemy(Board,x,y,x-1,y+1) ) {
                        moves.push((x-1)+','+(y+1));
                        return moves;
                } else if ( Board.isEmpty(Board,x-1,y+1) ) {
                        moves.push((x-1)+','+(y+1));
                }
        }
        return moves;
};

var ChessBoard1 = new ChessBoard (8,10);

ChessBoard1.setStdBoard(ChessBoard1);

ChessBoard1.setPiece(ChessBoard1,4,4,'Q',1); //test piece

ChessBoard1.displayBoard(ChessBoard1);

ChessBoard1.displayMoves(ChessBoard1.movesPiece(ChessBoard1,4,4),ChessBoard1); //display moves for 4,4
