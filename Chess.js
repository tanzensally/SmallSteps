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

        for(var i = 0; i < x; i++) {
                board[i] = [];
                for(var j = 0; j  < y; j++) {
                        board[i][j] = null;
                }
        }
        return board;
};


//set a chess piece and gives it an ID based on a counter inside the Board

ChessBoard.prototype.setPiece = function(Board,x,y,type,player) {
        var piece = new ChessPiece(Board.ids+1,type,player);
        Board.ids++;
        Board.board[x][y] = piece;
};


//set a standard chessboard, 2 players, 8 by 8

ChessBoard.prototype.setStdBoard = function (Board) {

        for(var i = 0; i < 8; i++) {
                Board.setPiece(Board,1,i,'P',1);
                Board.setPiece(Board,6,i,'P',2);
        }

        Board.setPiece(Board,0,0,'R',1); Board.setPiece(Board,0,7,'R',1);
        Board.setPiece(Board,7,0,'R',2); Board.setPiece(Board,7,7,'R',2);

        Board.setPiece(Board,0,1,'N',1); Board.setPiece(Board,0,6,'N',1);
        Board.setPiece(Board,7,1,'N',2); Board.setPiece(Board,7,6,'N',2);

        Board.setPiece(Board,0,2,'B',1); Board.setPiece(Board,0,5,'B',1);
        Board.setPiece(Board,7,2,'B',2); Board.setPiece(Board,7,5,'B',2);

        Board.setPiece(Board,0,3,'Q',1); Board.setPiece(Board,7,3,'Q',2);
        
        Board.setPiece(Board,0,4,'K',1); Board.setPiece(Board,7,4,'K',2);

};


//display the entire chessboard, based on the type property, can be changed for id or player

ChessBoard.prototype.displayBoard = function (Board) {

        for(var i = 0; i < Board.board.length; i++) {
                for(var j = 0; j < Board.board[0].length; j++) {
                        if(Board.board[i][j] == null){
                                process.stdout.write('- ');
                        } else {
                                process.stdout.write(Board.board[i][j].type + ' ');
                                //process.stdout.write(Board.board[i][j].id + ' ');
                                //process.stdout.write(Board.board[i][j].player + ' ');
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
                        if(displayBoard[i][j] == null){
                                process.stdout.write('- ');
                        } else if (displayBoard[i][j] == 'x') {
                                process.stdout.write('x ');
                        } else {
                                process.stdout.write(displayBoard[i][j].type + ' ');
                        }
                }
                process.stdout.write('\n');
        }

        process.stdout.write('\n'); //for terminal purposes

};


//movement functions


//isEmpty?

ChessBoard.prototype.isEmpty = function (Board,x,y) {
        if(Board.board[x][y] == null) {
                return true;
        } else {
                return false;
        }
};


//Provide a list of available moves for a given piece, recognize the type and return the array of moves

ChessBoard.prototype.movesPiece = function(Board,x,y) {

        var moves = [];
        var type = Board.board[x][y].type;

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
//+x or +i go south, +y or +j go east

ChessBoard.prototype.moveN = function(Board,x,y,moves) {

        for (var i = (x-1); i >= 0; i--) {
                if( Board.isEmpty(Board,i,y) ) {
                        moves.push(i+ ',' +y);
                } else {
                        break;
                }
        }

        return moves;
};

ChessBoard.prototype.moveS = function(Board,x,y,moves) {

        for (var i = (x+1); i < Board.board.length; i++) {
                if( Board.isEmpty(Board,i,y) ) {
                        moves.push(i+ ',' +y);
                } else {
                        break;
                }
        }

        return moves;
};

ChessBoard.prototype.moveW = function (Board,x,y,moves) {

        for (var j = (y-1); j >= 0; j--) {
                if( Board.isEmpty(Board,x,j) ) {
                        moves.push(x+ ',' +j);
                } else {
                        break;
                }
        }

        return moves;
};

ChessBoard.prototype.moveE = function (Board,x,y,moves) {

        for (var j = (y+1); j < Board.board[0].length; j++) {
                if( Board.isEmpty(Board,x,j) ) {
                        moves.push(x+ ',' +j);
                } else {
                        break;
                }
        }

        return moves;
};

ChessBoard.prototype.moveNW = function (Board,x,y,moves) {

        var i = 0; var j = 0;

        while (i+x-1 >= 0 && j+y-1 >= 0) {
                if ( Board.isEmpty(Board,i+x-1,j+y-1) ) {
                        moves.push((i+x-1)+','+(j+y-1));
                        i--; j--;
                } else {
                        break;
                }
        }
        return moves;
};

ChessBoard.prototype.moveSE = function (Board,x,y,moves) {

        var i = 0; var j = 0;

        while (i+x+1 < Board.board.length && j+y+1 < Board.board[0].length) {
                if ( Board.isEmpty(Board,i+x+1,j+y+1) ) {
                        moves.push((i+x+1)+','+(j+y+1));
                        i++; j++;
                } else {
                        break;
                }
        }
        return moves;
};

ChessBoard.prototype.moveSW = function (Board,x,y,moves) {

        var i = 0; var j = 0;

        while (i+x+1 < Board.board.length && j+y-1 >= 0) {
                if ( Board.isEmpty(Board,i+x+1,j+y-1) ) {
                        moves.push((i+x+1)+','+(j+y-1));
                        i++; j--;
                } else {
                        break;
                }
        }
        return moves;
};

ChessBoard.prototype.moveNE = function (Board,x,y,moves) {

        var i = 0; var j = 0;

        while (i+x-1 >= 0 && j+y+1 < Board.board[0].length) {
                if ( Board.isEmpty(Board,i+x-1,j+y+1) ) {
                        moves.push((i+x-1)+','+(j+y+1));
                        i--; j++;
                } else {
                        break;
                }
        }
        return moves;
};

ChessBoard.prototype.moveN1 = function (Board,x,y,moves) {

        if( Board.isEmpty(Board,x-1,y) && (x-1) >= 0 ) {
                moves.push((x-1)+ ',' +y);
        }

        return moves;
};

ChessBoard.prototype.moveS1 = function (Board,x,y,moves) {

        if( Board.isEmpty(Board,x+1,y) && (x+1) < Board.board.length ) {
                moves.push((x+1)+ ',' +y);
        }

        return moves;
};

ChessBoard.prototype.moveW1 = function (Board,x,y,moves) {

        if( Board.isEmpty(Board,x,y-1) && (y-1) >= 0 ) {
                moves.push(x+ ',' +(y-1));
        }

        return moves;
};

ChessBoard.prototype.moveE1 = function (Board,x,y,moves) {

        if( Board.isEmpty(Board,x,j) && (y+1) < Board.board[0].length ) {
                moves.push(x+ ',' +(y+1));
        }

        return moves;
};

ChessBoard.prototype.moveNW1 = function (Board,x,y,moves) {

        if ( Board.isEmpty(Board,x-1,y-1) && (x-1) >= 0 && (y-1) >= 0 ) {
                moves.push((x-1)+','+(y-1));
        }
        return moves;
};

ChessBoard.prototype.moveSE1 = function (Board,x,y,moves) {

        if ( Board.isEmpty(Board,x+1,y+1) && (x+1) < Board.board.length && (y+1) < Board.board[0].length ) {
                moves.push((x+1)+','+(y+1));
        }
        return moves;
};

ChessBoard.prototype.moveSW1 = function (Board,x,y,moves) {

        if ( Board.isEmpty(Board,x+1,y-1) && (x+1) < Board.board.length && (y-1) >= 0 ) {
                moves.push((x+1)+','+(y-1));
        }
        return moves;
};

ChessBoard.prototype.moveNE1 = function (Board,x,y,moves) {

        if ( Board.isEmpty(Board,x-1,y+1) && (x-1) >= 0 && (y+1) < Board.board[0].length ) {
                moves.push((x-1)+','+(y+1));
        }
        return moves;
};


var ChessBoard1 = new ChessBoard (8,8);

ChessBoard1.setStdBoard(ChessBoard1);

ChessBoard1.setPiece(ChessBoard1,4,4,'Q',1); //test piece

ChessBoard1.displayBoard(ChessBoard1);

ChessBoard1.displayMoves(ChessBoard1.movesPiece(ChessBoard1,4,4),ChessBoard1); //display moves for 4,4

