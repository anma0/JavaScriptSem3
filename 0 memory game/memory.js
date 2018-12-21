function init() {

    console.info("page loaded");

    var stage = new createjs.Stage("game");
	
	n = 4;
	m = 4;
	
	var click_stop = 1; //не даётоткрывать больше 2х карт
	var click_count = 0;
	var last_card; //хранит предыдущую карту

	var wholeImage = document.getElementById('imagesource');
	var dx = 147; //длина стороны
	var i, j;
	
	var nums = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];
	nums.sort(compareRandom);
	var index = 0;
	
	var cards = new Array(n);
	for (i = 0; i < n; i++) {
		cards[i] = new Array(m);
		for (j = 0; j < m; j++){
			createCard(i, j);
		}
	};
	
	function compareRandom(a, b) {
  		return Math.random() - 0.5;
	};
		
	function createCard(i, j) {
		var side = new createjs.Bitmap(wholeImage);
//		
		var c = {num: nums[index], bmp: side, rotation: 0};
		index++;
		cards[i][j] = c; 
				
		function cardClicked() {
			click_count++;
			if (c.rotation == 0 && click_stop == 1){ //если картинка была закрыта
				if (click_count == 1){ //первый клик по полю
					showPicture();
					c.rotation = 1;
					last_card = c;
				}else{ //обрабатываем открытие второй картинки
					showPicture();
					click_stop = 0;
					if (c.num === last_card.num) { //совпали номера 
						c.rotation = 2;
						click_stop = 1;
					}else{//номера разные, необходимо обратно закрыть
						c.rotation = 1;
						setTimeout(showBack, 1000);
					};	
					click_count = 0;	
				};	
			};
		};
		
		function showPicture(){
			c.bmp.sourceRect = new createjs.Rectangle(dx * c.num, 0, dx, dx);
			stage.update();
		};
	
		function showBack(){
			//console.log('show back',c );
			if (c.rotation == 1){
				c.rotation = 0;
				c.bmp.sourceRect = new createjs.Rectangle(0, 0, dx, dx);
				last_card.rotation = 0;
				last_card.bmp.sourceRect = new createjs.Rectangle(0, 0, dx, dx);
				stage.update();
				click_stop = 1;
			};
		};
						
		side.sourceRect = new createjs.Rectangle(0, 0, dx, dx); //раскидывание карт по полю
		side.x = i * (dx+10) + 10;
		side.y = j * (dx+10) + 10;
		side.addEventListener("click", cardClicked);
		stage.addChild(c.bmp);		
	};
	stage.update();
}