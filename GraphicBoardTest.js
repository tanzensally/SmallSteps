
canvas = document.getElementById('canvasTest');

rectSize = 100;
boardSizeX = 8;
boardSizeY = 8;


color1 = 'lightgreen';
color2 = 'skyblue';

boardBG = [];

for (var i = 0, len1 = boardSizeX; i < len1; i++) {
	boardBG[i] = [];
	for (var j = 0, len2 = boardSizeY; j < len2; j++) {

		var rect = canvas.getContext('2d');

		rect.fillStyle = i % 2 == 0 ? color1 : color2;
		rect.fillRect( rectSize * (j % boardSizeX), rectSize * (i % boardSizeY), rectSize, rectSize);

		boardBG[i][j] = rect;
		color1 = [color2, color2 = color1][0];
	}

}

boardBG[0][0].fillStyle = 'black';
boardBG[0][0].fillRect(0,0,rectSize,rectSize);

document.body.appendChild(canvas);
