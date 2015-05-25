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
        //var piece = new ChessPiece(0,type,player);
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
                        }
                }
                process.stdout.write('\n');
        }

        process.stdout.write('\n'); //for terminal purposes
};


var ChessBoard1 = new ChessBoard (8,8);

ChessBoard1.setStdBoard(ChessBoard1);
ChessBoard1.displayBoard(ChessBoard1);
