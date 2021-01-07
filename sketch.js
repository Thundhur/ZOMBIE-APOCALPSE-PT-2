var helicopterIMG, helicopterSprite, packageSprite,packageIMG,NYCIMG,NYCSprite;
var packageBody,ground
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
var gamestate = "help";
var blahstate = "NOISE";
var helistate = "fine";
var win;
function preload()
{
	helicopterIMG=loadImage("helicopter.png");
	packageIMG=loadImage("package.png");
	NYCIMG=loadImage("NYC.jpg");
}

function setup() {
	createCanvas(1200, 700);
	rectMode(CENTER);
	

	

	groundSprite=createSprite(width/2, height-35, width,10);
	groundSprite.shapeColor=color(255)

	NYCSprite = createSprite(600,300,0,0);
	NYCSprite.addImage(NYCIMG);
	NYCSprite.scale = 0.3;
	packageSprite=createSprite(width/2, 100, 10,10);
	packageSprite.addImage(packageIMG)
	packageSprite.scale=0.1;

	helicopterSprite=createSprite(-100, 100, 10,10);
	helicopterSprite.addImage(helicopterIMG)
	helicopterSprite.scale=0.6





	engine = Engine.create();
	world = engine.world;

	boxPosition=width/2-100
	 boxY=610;
	 
	 
	boxleftSprite=createSprite(boxPosition, boxY, 20,100);
 	boxleftSprite.shapeColor=color(255,0,0);

 	boxLeftBody = Bodies.rectangle(boxPosition+20, boxY, 20,100 , {isStatic:true} );
 	World.add(world, boxLeftBody);

 	boxBase=createSprite(boxPosition+100, boxY+40, 200,20);
 	boxBase.shapeColor=color(255,0,0);

 	boxBottomBody = Bodies.rectangle(boxPosition+100, boxY+45-20, 200,20 , {isStatic:true} );
 	World.add(world, boxBottomBody);

 	boxleftSprite=createSprite(boxPosition+200 , boxY, 20,100);
 	boxleftSprite.shapeColor=color(255,0,0);

 	boxRightBody = Bodies.rectangle(boxPosition+200-20 , boxY, 20,100 , {isStatic:true} );
 	World.add(world, boxRightBody);
	
	

	//Create a Ground
	ground = Bodies.rectangle(width/2, 650, width, 10 , {isStatic:true} );
 	World.add(world, ground);
helicopterSprite.y = random(-100,100);
helicopterSprite.y = round(helicopterSprite.y);

helicopterSprite.x = random(300,900);
helicopterSprite.x = round(helicopterSprite.x);
	
}


function draw() {
  rectMode(CENTER);
  background(191,239,255);
  
 if(gamestate ==="help"){
	packageSprite.x= helicopterSprite.x;
	packageSprite.y= helicopterSprite.y;
 
	if (keyDown("DOWN_ARROW")) {
		
		packageBody = Bodies.circle(helicopterSprite.x , helicopterSprite.y , 5 , {restitution:0, isStatic:false});
		World.add(world, packageBody);
		Engine.run(engine);
		gamestate = "thanks";
	
		
	  }
 }
 if(gamestate ==="thanks"){
	packageSprite.x= packageBody.position.x 
  packageSprite.y= packageBody.position.y 
 
 }
  drawSprites();
  if(packageSprite.y > 500){
	blahstate = "inaccessible"

	  if(packageSprite.x < 725&& packageSprite.x > 450){
       blahstate = "accessible";
	  }
	  
		
	
	
  }
  if (keyDown("RIGHT_ARROW")&&helistate==="fine") {
	helicopterSprite.x = helicopterSprite.x + 2;
	frameCount = frameCount + 5;
  }
  
	helicopterSprite.y = helicopterSprite.y + 2;
  
  if (keyDown("LEFT_ARROW")&&helistate==="fine") {
	helicopterSprite.x = helicopterSprite.x - 2;
	frameCount = frameCount + 5;
  }
  if (keyDown("LEFT_ARROW")&&helistate==="fuel") {
	helicopterSprite.x = helicopterSprite.x - 2;
	frameCount = frameCount + 5;
  }
  if (keyDown("RIGHT_ARROW")&&helistate==="fuel") {
	helicopterSprite.x = helicopterSprite.x + 2;
	frameCount = frameCount + 5;
  }
  if (keyDown("UP_ARROW")&&helistate==="fine") {
	helicopterSprite.y = helicopterSprite.y - 3;
	frameCount = frameCount + 5;
  }
  if (keyDown("h")&&helistate==="fine") {
	helicopterSprite.y = helicopterSprite.y - 2;
	frameCount = frameCount + 7;
  }
  
  if(blahstate==="accessible"){
	  textSize(50);
	  fill(0,255,0);
	  text("Package accessible... Mission Success!",200,350);
  }
  if(blahstate==="inaccessible"){
	textSize(50);
	fill(255,0,0);
	text("Package inaccessible... Mission Failed!",200,350);
	textSize(25);
	text("The humans died. Who Cares!",440,400);
}
console.log(gamestate);
if(frameCount > 10000){
	helistate = "fuel";
}

if(helicopterSprite.y>200){
	helistate = "crashed"

}
if(helicopterSprite.x>1200){
	helistate = "fine"
	win = "true";
	

}
if(helistate==="crashed"){
	textSize(50);
	fill(255,0,0);
	text("You crashed... You died a horrible death!",200,150);
	textSize(25);
	text("Zombies ate your corpse the next day.",470,200);

}
textSize(30);
fill(0,0,255);
text("Drop Zone",530,610);
if(win==="true"){
	textSize(75);
	fill(0,255,0);
	text("YOU SURVIVED!",370,200);
}
}

function keyPressed() {
 
}



