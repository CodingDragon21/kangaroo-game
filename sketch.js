/*--------------------------------------------------------*/
var PLAY = 1;
var END = 0;
var WIN = 2;
var gameState = PLAY;

var kangaroo, kangaroo_running, kangaroo_collided;
var jungle, invisbleGround;

var obstaclesGroup,obstacleImg

var score=0;

var gameOver, restart;

function preload(){
  kangaroo_running =   loadAnimation("assets/kangaroo1.png","assets/kangaroo2.png","assets/kangaroo3.png");
  kangaroo_collided = loadAnimation("assets/kangaroo1.png");
  jungleImage = loadImage("assets/bg.png");
  shrub1 = loadImage("assets/shrub1.png");
  shrub2 = loadImage("assets/shrub2.png");
  shrub3 = loadImage("assets/shrub3.png");
  obstacleImg = loadImage("assets/stone.png");
  gameOverImg = loadImage("assets/gameOver.png");
  restartImg = loadImage("assets/restart.png");
  jumpSound = loadSound("assets/jump.wav");
  collidedSound = loadSound("assets/collided.wav");
}

function setup() {
  createCanvas(800, 400);

  jungle = createSprite(400,100,400,20);
  jungle.addImage("jungle",jungleImage);
  jungle.scale=0.3
  jungle.x = width /2;

  kangaroo = createSprite(130,200, 10,10)
  kangaroo.addAnimation("jump", kangaroo_running)
  kangaroo.addAnimation("stop", kangaroo_collided)
  kangaroo.changeAnimation("jump")
  kangaroo.scale = 0.17
  //kangaroo.debug = true
  kangaroo.setCollider("circle", 0,0,300)

 invisbleGround = createSprite(400,390, 800,50)
 invisbleGround.visible = false


  
  shrubsGroup = new Group();
  obstaclesGroup = new Group();
  
  score = 0;

}

function draw() {
  background(255);
  kangaroo.x = camera.position.x -270
  kangaroo.collide(invisbleGround)

  if(gameState === PLAY){
  jungle.setVelocity(-7, 0)
  
  if(jungle.x < 50){
    jungle.x = 400
  }

  if(keyDown("space") && kangaroo.y > 190){
    kangaroo.setVelocity(0,-12)
    jumpSound.play()
    }
    kangaroo.velocityY = kangaroo.velocityY + 0.5

    spawnShrubs()
    spawnObstacles()

    if(kangaroo.isTouching(shrubsGroup)){
      score = score + 1
      shrubsGroup.destroyEach()
    }

    if(kangaroo.isTouching(obstaclesGroup)){
      gameState = END
      collidedSound.play()
    }
  }
 
  drawSprites();
  if(gameState === END){
   kangaroo.changeAnimation("stop")
   shrubsGroup.setVelocityEach(0,0)
   obstaclesGroup.setVelocityEach(0,0)
   jungle.setVelocity(0,0)
   kangaroo.setVelocity(0,0)
   obstaclesGroup.setLifetimeEach(-1)
   shrubsGroup.setLifetimeEach(-1)
   fill("orange")
   textSize(30)
   text(" Nice Job GAME OVER", 300, 200)
  }



fill("white")
textSize(20)
text("SCORE:" + score, 700, 50)
}
function spawnShrubs(){
  if(frameCount % 150 === 0){
    var shrub = createSprite(camera.position.x + 500, 340,40,10)
    var randomImage = Math.round(random(1,3))
    switch(randomImage){
    case 1: 
    shrub.addImage("bush1", shrub1)
    break;
    case 2:
    shrub.addImage("bush2", shrub2)
    break;
    case 3:
      shrub.addImage("bush3", shrub3)
      break;
      default: 
      break;
    }
    shrub.scale = 0.08
    shrub.velocityX = -7
    shrub.lifetime = 140
    shrubsGroup.add(shrub)

  }
}

function spawnObstacles(){
  if(frameCount % 230 === 0){
    var obstacle = createSprite(camera.position.x + 500, 330,40,10)
    obstacle.addImage("rock", obstacleImg)
    obstacle.scale = 0.16
    obstacle.velocityX = -7
    obstacle.lifetime = 140
    obstaclesGroup.add(obstacle)

  }
}
