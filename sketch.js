var monkey , monkey_running;
var banana ,bananaImage, bananaGroup, obstacle, obstacleImage;
var bananaGroup, obstacleGroup;
var score = 0;
var ground;
var SurvivalTime;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var re = 0;

function preload(){
   monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
}
function setup() {
  createCanvas(600,600);
  monkey = createSprite(50,300,20,20);
  monkey.addAnimation("moving",monkey_running);
  monkey.scale = 0.15;
  ground = createSprite(50,350,1200,10);
  ground.velocityX = -5;
  bananaGroup = new Group();
  obstacleGroup = new Group();
  SurvivalTime = 0;
}
function draw() {  
  background("white");
  if (gameState==PLAY){
    re = 0;
    SurvivalTime = Math.ceil(frameCount/frameRate());
    monkey.visible = true;
    if(keyDown("space") && monkey.y>=100){
     monkey.velocityY = -10;
     }
    monkey.velocityY = monkey.velocityY + 0.8;
    ground.velocityX = -5;
  if(ground.x < 0){
    ground.x = ground.width/2;
  }
    
  if(bananaGroup.isTouching(monkey)){
    score=score+1;
    bananaGroup.destroyEach();
  }
     Spawnbananas();
     Spawnobstacles();
  if(obstacleGroup.isTouching(monkey)){
    gameState = END;
  }
  }
  else if(gameState==END){
    obstacleGroup.destroyEach();
    monkey.velocityY = 0;
    monkey.visible = false;
    bananaGroup.destroyEach();
    ground.velocityX = 0;
     if(keyDown("r") && re==1){
    reset();
  }
    textSize(20);
    fill("black");
    stroke("red");
    text("GAME OVER",280,200);
    stroke("yellow");
    text("Press R to restart", 260,150);
    re = 1;
  }
 
  textSize(20);
  fill("black");
  text("Score: " + score,300,50);
  
  //text("Survival Time: "+ SurvivalTime,300,50);
  
  monkey.collide(ground);
 
  drawSprites();
}
function reset(){
    gameState=PLAY;
    SurvivalTime = 0;
    score = 0;
    bananaGroup.destroyEach();
    obstacleGroup.destroyEach();
}
function Spawnbananas(){
  if(frameCount % 80==0){
    banana = createSprite(600,300,20,20);
    banana.y = Math.round(random(100,200));
    banana.addImage("banana", bananaImage);
    banana.velocityX = -6;
    banana.lifetime = 300;
    banana.scale = 0.15;
    bananaGroup.add(banana);
  }
}
function Spawnobstacles(){
  if(frameCount % 100==0){
    obstacle = createSprite(600,320,20,20);
    obstacle.velocityX = -(6+score/20);
    obstacle.scale = 0.15;
    obstacle.lifetime = 300;
    obstacleGroup.add(obstacle);
    obstacle.addImage(obstacleImage);
  }
}







