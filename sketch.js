var boy;
var branch;
var gamestate = "play"
var score = 0
var backgroundImg

function preload() {
  boy_running = loadAnimation("boy.png");
  branchImg = loadImage("branch.png")
  gameOverImg=loadImage("gameOver.webp")
  restartImg=loadImage("restart.png")
  backgroundImg=loadImage("nature photo.jpg")
}

function setup() {
  createCanvas(800, 500);

  // creating boy
  boy = createSprite(50, 160, 20, 50);
  boy.addAnimation("running", boy_running);
edges = createEdgeSprites();
  boy.debug=true

  ground = createSprite(300, 195, 600, 10)
  ground.shapeColor = "grey"
  
 

  branchesGroup = createGroup()
  

  restart = createSprite(200, 150, 30, 30)
  restart.addImage("restart", restartImg)
  restart.scale = 0.3
  restart.visible = false


  gameOver = createSprite(200, 100, 30, 30)
  gameOver.addImage("gameOver", gameOverImg)
  gameOver.scale = 0.4
  gameOver.visible = false
}


function draw() {
  //set background color 
  background(backgroundImg);



  //jump when space key is pressed
  if (keyDown("space")) {
    boy.velocityY = -3;
}

  //boy.velocityY = boy.velocityY + 0.5;

  
  boy.collide(ground)
  ground.velocityX = -2-score/100
  console.log(ground.velocityX)
  if (ground.x = 0) {
    ground.x = 300
  }

  if (boy.isTouching(branchesGroup)) {
    //gamestate = "end"
    

  }

  if (gamestate == "end") {
    ground.velocityX = 0
    branchesGroup.setVelocityXEach(0)
    gameOver.visible = true
    restart.visible = true
  }


  if (gamestate == "play") {
    spawnBranches()
    score=score+Math.round(getFrameRate()/60)
  }
 
  if(mousePressedOver(restart)){
console.log("restart the game")
reset()
  }
  
  fill("white")
  text("Score:"+score,200,50)

  console.log(boy.velocityX)

  drawSprites();
}

function spawnBranches() {
  if (frameCount % 60 == 0) {
    var branch = createSprite(600, 600, 30, 30)
    branch.shapeColor = "brown"
    branch.scale=0.3
    //branch.velocityX = -5
    branch.y = random(10, 60)
    branch.addImage(branchImg)
    branchesGroup.add(branch)
  }

}



function reset(){
  restart.visible=false
  gameOver.visible=false
  score=0
  gamestate="play"
  console.log(gamestate)
  branchesGroup.destroyEach()

  

}
