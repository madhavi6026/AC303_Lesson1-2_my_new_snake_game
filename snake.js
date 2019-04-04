//css code from other page maks suree that canvas is always centerd on the screen
//in html make sure to set up the canvas inside of the body tag and specify the width and height 


//Getting started. 
//You should put all your code in this function. Ensures that website is fully loaded. If the website is not fully loaded and you try to access some DOM elements it will return null since none of the elements can be found 
//This would most likely cause unexpected behaviour. 
$(document).ready(function(){

	//Setting up canvas 
	var canvas = document.getElementById("canvas"); 
	var context = canvas.getContext("2d");

	var gridNum = 20; 
	var gridSize = canvas.width/ gridNum;

	//Set up candy and player objects 
	var candy = {
		x: 10, 
		y: 10, 
		alive: false
	};

	var player = {
		x: 7, 
		y: 7,
		//direction: Right - 0, Left - 1, Up - 2, Down - 3, Stopped - 5 
		direction: 5,
		alive: true, 
		tail: 1
	};

	var snakeBody = [[7 , 7]]; //snake starts at point (7,7)
	//tail property = length of snake - increase by 1 if player eats candy 
	//snakeBody stores every point snake body is on 






	var keyPressed = null;
	var leftKey = 37, upKey = 38, rightKey = 39, downKey = 40; 





	//Create Insert 
	Array.prototype.insert = function(index, item){
		this.splice(index, 0, item); //method to easily update psition of snake

	};

	function update(){
		if(keyPressed){
			if(keyPressed == rightKey && player.direction!=1){player.direction = 0; console.log("right");}//change direction of snake 
			if(keyPressed == leftKey && player.direction!=0){player.direction = 1;console.log("left");}
			if(keyPressed == upKey && player.direction!=3){player.direction = 2; console.log("up");}
			if(keyPressed == downKey && player.direction!=2){player.direction = 3; console.log("down");} 
			console.log("pressed2");

		}
		console.log("not_pressed");

		if(candy.alive){
			candy.x = Math.floor(Math.random() * gridNum);
			candy.y = Math.floor(Math.random() * gridNum); //check if snake eats candy (random coordinate of candy) 
		

			var collided; //check whether snake eats candy or not 
			do{
				collided = false; //check each element in array with for loop
				for(var i = 0; i < player.tail; i++){
					if(candy.x == snakeBody[i][0] && candy.y == snakeBody[i][1]){
						collided = true; 
						candy.x = Math.floor(Math.random() * gridNum);
						candy.y = Math.floor(Math.random() * gridNum); //check if snake eats candy (random coordinate of candy) 
					} // i means the amount of lines, loop all snakes and check coordinate of box and candy 

				}

			} while(collided); 
			candy.alive = true; //random psition for the candy to spawn in, use do-while loop to make sure candy doesn't spawn on snake 
		}
		if(player.x == candy.x && player.y == candy.y){
			candy.alive = false; 
			player.tail++; //check if coordinates of candy and player are equal. Candy will not be alive and add 1 to the tail(length) of player 
		}

		if(player.tail > 1){ //if the player eats himself then the game ends 
			for(var i = 1; i < player.tail; i++){ //we call updates 
				if(player.x == snakeBody[i][0] && player.y == snakeBody[i][1]){ 
					player.alive = false;
					console.log("clean interval");
					clearInterval(updates); //stop the update to end the game 
				}
				

			}
		}


		if(player.x >= gridNum || player.x < 0 || player.y >= gridNum || player.y < 0){ //if player hits the wall then the game ends 
			player.alive = false; 
			console.log("clean interval2");
			clearInterval(updates); //stop the update to end the game 
		}

		snakeBody.insert(0, [player.x, player.y]); //if length is larger than what it should be, delete last part of the snake
		while(snakeBody.length > player.tail + 1){ //add 1 to the top of snakeBody 
			snakeBody.pop(); //pop out bottom of snake
		}

		switch(player.direction){ //try to get direction of player - what is the number
			case 0: 
			player.x += 1; break; 

			case 1:
			player.x -= 1; break;

			case 2: 
			player.y -= 1; break; 

			case 3:
			player.y += 1; break; //break means stop the conditions  
		}

		$("#score").html("Score:" + (player.tail - 1));

		if(player.alive){
			draw(); //if player is alive, draw the snake 
		}

		function draw(){
			context.clearRect(0,0, canvas.width, canvas.height);

			context.fillStyle = "red"; 
			context.fillRect(candy.x * gridSize, candy.y * gridSize, gridSize, gridSize); 

			for(var i = 0; i < player.tail; i++){
				if(i == 0){
					context.fillStyle = "green"; 
				}
				else{
					context.fillstyle = "black"; 
				}
				context.fillRect(snakeBody[i][0] * gridSize, snakeBody[i][1] * gridSize, gridSize, gridSize); 
			}
		}

	}

	//'If any keys are pressed' event 
	$(window).on("keydown", function(event){
		keyPressed = event.which; //get keypress value and store it within this event 
		console.log("pressed");
	});

	update();
	var updates = setInterval(update, 100);

});