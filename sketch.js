var PLAY = 1;
var END = 0
var gamestate = PLAY;
var spaceShip,enemyShip,asteroid,fuel,asteroid1;
var enemyShipimg,asteroidimg,spaceShipimg,asteroid1img,fuelimg,bgimg;
var enemyShipGroup,bulletGroup;
var edges;
var bullet,bulletImg,enemyBullet,enemyBulletImg,bulletGroup;
var asteroidGroup;
var score = 0;
var restart,restartimg;
function preload()
{
	spaceShipimg = loadImage("spaceShip.jpg");
	enemyShipimg = loadImage("images (2).jpg");
	fuelimg = loadImage("fuel.jpg");
	bgimg = loadImage("bg.jpg");
	asteroidimg = loadImage("asteroid1.jpg");
	asteroid1img = loadImage("asteroid2.jpg");
	bulletImg = loadImage("bullets.png")
	restartimg = loadImage("restart.png")
}

function setup() {
	createCanvas(400, 500);


	restart = createSprite(200,250,50,50);
	restart.addImage(restartimg);
	restart.scale = 0.1
	restart.visible = false;

	//Create the Bodies Here.
	//asteroid = createSprite(100,100,50,50);
	//asteroid.addImage(asteroidimg);

	//fuel = createSprite(300,300,50,50);
	//fuel.addImage(fuelimg);

	spaceShip = createSprite(200,400,50,50);
	spaceShip.addImage(spaceShipimg);
	spaceShip.scale = 0.5
	bulletGroup = createGroup();
	enemyShipGroup = createGroup();
	asteroidGroup = createGroup();
	spaceShip.setCollider("circle",0,60,100)
	spaceShip.debug = true
}


function draw() {
  rectMode(CENTER);
  background(bgimg);
  edges = createEdgeSprites();
  spaceShip.bounceOff(edges);
 
  textSize(20);
  fill("white");
  text("Score: " + score, 300, 50);

 

  if(gamestate === PLAY){

  
  if(keyDown("LEFT_ARROW")){
    spaceShip.x = spaceShip.x - 5;
  }
    
  if(keyDown("RIGHT_ARROW")){
    spaceShip.x = spaceShip.x + 5;
  }
    
  if(keyDown("space")){
	bullet = createSprite(300,380,10,10);
	console.log("Space")
	bullet.x = spaceShip.x
	bullet.addImage(bulletImg)
	bullet.scale = 0.05
	bullet.velocityY = -2
	bullet.lifetime = 250
	bulletGroup.add(bullet);

	}

	if(enemyShipGroup.isTouching(bulletGroup)){
		score++;
		enemyShipGroup.destroyEach();
		//enemyShip.lifetime = 0;
		enemyShipGroup.destroyEach();
		
	}

	if(asteroidGroup.isTouching(bulletGroup)){
		score++;
		asteroidGroup.destroyEach();
		//enemyShip.lifetime = 0;
		
	}


  
  spownEnemyShip();
  spownAsteroids();

 
  if(asteroidGroup.isTouching(spaceShip)){
	gameState = END;
	restart.visible = true;
	textSize(25);
	fill("white");
	text("Game over",145,200);
	restart.visible = true
}

if(enemyShipGroup.isTouching(spaceShip)){
	gameState = END;
	restart.visible = true;
	
}
}

	else if(gameState===END){
		spaceShip.velocityX = 0
		enemyShipGroup.setLifetimeEach(-10);
		asteroidGroup.setLifetimeEach(-10);
		enemyShipGroup.setVelocityYEach(0)
		asteroidGroup.setVelocityYEach(0)
		

	}
	if(mousePressedOver(restart)) {
		reset(); }
		
  drawSprites();
}

function spownEnemyShip(){

	if(frameCount%60===0){
	enemyShip = createSprite(100, 30, 50, 50)
	enemyShip.x = Math.round(random(50,500));
	enemyShip.addImage(enemyShipimg);
	enemyShip.scale = 0.3
	enemyShip.velocityY = 2;
	enemyShip.lifetime = 250
	enemyShipGroup.add(enemyShip);


}
}

function spownAsteroids(){

	if(frameCount%40===0){
	
	asteroid = createSprite(200,0,50,50);
	asteroid.x = Math.round(random(50,500));
	asteroid.addImage(asteroidimg);
	asteroid.scale = 0.3
	asteroid.velocityY = 3;
	asteroid.lifetime = 250;
	asteroidGroup.add(asteroid);
}
}
