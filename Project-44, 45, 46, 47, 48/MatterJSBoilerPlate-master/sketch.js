var mainCharacter, mainCharacterImg;
var secondC;
var weapon;
var ground;
var bgImg;
var blocker1, blocker2;
var gameState = 1;
var PLAY = 1;
var END = 0;

const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

function preload() {
	mainCharacterImg = loadImage("assets/boy.png");
	bgImg = loadImage("assets/bg.jpg");
}

function setup() {
	mainCharacterGroup = new Group();
	groundGroup = new Group();
	blockerGroup = new Group();

	createCanvas(windowWidth, windowHeight);

	engine = Engine.create();
	world = engine.world;

	//Sprite Area.
	mainCharacter = createSprite(windowWidth / 15, windowHeight / 1.16, 40, 60);
	mainCharacterGroup.add(mainCharacter);

	//Create the Bodies Here.
	ground = createSprite(0, windowHeight / 1.1, 5000, 20)
	groundGroup.add(ground);

	blocker1 = createSprite(windowWidth / 1.013, windowHeight / 2, 20, 1000)

	blocker2 = createSprite(windowWidth / 2, windowHeight / 1.12, 20, 20)
	blockerGroup.add(blocker2);
	Engine.run(engine);

	blocker3 = createSprite(windowWidth / 1.3, windowHeight / 1.12, 20, 20)
	blockerGroup.add(blocker3);

	blocker4 = createSprite(windowWidth / 4, windowHeight / 1.12, 20, 20)
	blockerGroup.add(blocker4);
}


function draw() {
	background(0);
	camera.positionX = mainCharacter.positionX;
	gameState = PLAY;
	mainCharacter.collide(ground);
	mainCharacter.velocityY = 8;
	mainCharacter.velocityX = 6;
	movement();

	if (mainCharacter.collide(blockerGroup)) {
		gameState = END;
		defeat();
	}

	if (mainCharacter.collide(blocker1)) {
		gameState = END;
		victory();
	}

	if(gameState === END){
		mainCharacter.destroy();
		blockerGroup.destroy();
	}

	drawSprites();

}

function movement() {
	if (keyWentDown("space")) {
		mainCharacter.velocityY = -150;
	}
}

function victory() {
	textSize(80);
	fill("yellow");
	text("Victory!", windowWidth/2.5, windowHeight/2);
}

function defeat() {
	textSize(80);
	fill("red");
	text("You Lose!!", windowWidth/2.5, windowHeight/1.9);
}