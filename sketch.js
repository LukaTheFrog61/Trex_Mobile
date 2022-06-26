
var trex, trex_running, chao, chaoimg, ground, cactos, cactosimg1, cactosimg2, cactosimg3, cactosimg4, cactosimg5, cactosimg6, gamestate,
 trexlose, nuvem, nuvemimg, score, diesound, jumpsound, checkpointsound, gameover, gameoverimg, restart, restartimg;

function preload() {
  trex_running = loadAnimation("trex1.png", "trex3.png", "trex4.png");
  chaoimg = loadImage("ground2.png");
  cactosimg1 = loadImage("obstacle1.png");
  cactosimg2 = loadImage("obstacle2.png");
  cactosimg3 = loadImage("obstacle3.png");
  cactosimg4 = loadImage("obstacle4.png");
  cactosimg5 = loadImage("obstacle5.png");
  cactosimg6 = loadImage("obstacle6.png");
  trexlose = loadAnimation("trex_collided.png");
  nuvemimg = loadImage("cloud.png");
  jumpsound = loadSound("jump.mp3");
  diesound = loadSound("die.mp3");
  checkpointsound = loadSound("checkPoint.mp3");
  gameoverimg = loadImage("gameOver.png");
  restartimg = loadImage("restart.png");
}

function setup() {
  score = 0;
  createCanvas(windowWidth,windowHeight);
  nuvem = createGroup();
  cactos = createGroup();
  chao = createSprite(width/2, height-20, 10, 10);
  chao.addImage(chaoimg);
  chao.velocityX = - 7;
  ground = createSprite(width/2, height,width, 20);
  ground.visible = false;
  trex = createSprite(50, height-40, 20, 50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("lose", trexlose);
  trex.scale = 0.5;
  gamestate = "jogando";
  trex.setCollider("rectangle",0,0,20, trex.height);
  //trex.debug = true;
  gameover = createSprite(width/2,height/2,10,10);
  gameover.addImage(gameoverimg);
  restart = createSprite(width/2,height/2+50,10,10);
  restart.addImage(restartimg);
}

function draw() {
  background("white");
  
  


  trex.velocityY += 1;
  

  if (chao.x < 0) {
    chao.x = 1188.5;
  }
  if (gamestate == "jogando") {
    score += Math.round(frameRate() / 60);
    spawnN();
    spawnC();
    if (trex.isTouching(cactos)) {
      gamestate = "perdeu"
      trex.changeAnimation("lose");
      cactos.setVelocityXEach(0);
      chao.velocityX = 0;
      trex.velocityY = -10;
      nuvem.setVelocityXEach(0);
      jumpsound.play();
      diesound.play();
      //trex.velocityY = - 15;
      //jumpsound.play();
    }
    trex.collide(ground);
    restart.visible = false;
    gameover.visible = false;
    if (trex.y > height-40 && touches.length>0) {
      trex.velocityY = - 15;
      jumpsound.play();
      touches=[];
    }
    if (score % 100 === 0 && score>0 ){
      checkpointsound.play();
    }
    
  } else if (gamestate == "perdeu"){

    trex.velocityY += 1;
    gameover.visible = true;
    restart.visible = true;
    nuvem.setLifetimeEach(-1);
    cactos.setLifetimeEach(-1);
    
    if (touches.length>0){
      reset();
      touches = [];
    }
  }
  //console.log(trex.y);
  text(score, 100, 50);

  drawSprites();

}
function spawnN() {
  if (frameCount % 40 == 0) {
    var nuvem1;
    nuvem1 = createSprite(width + 50, Math.round(random(height-190, height-100)), 10, 10);
    nuvem1.lifetime = width+20;
    nuvem1.addImage(nuvemimg);
    nuvem1.velocityX = - 10;
    nuvem1.scale = random(0.5, 1);
    nuvem1.depth = trex.depth;
    gameover.depth = trex.depth +2;
    restart.depth = gameover.depth; 
    trex.depth += 1;
    nuvem.add(nuvem1);

  }


}
function spawnC() {
  if (frameCount % 60 == 0) {
    var cactos1;
    cactos1 = createSprite(width + 40, height-35, 20, 5);
    cactos1.lifetime = width+40;
    const img = Math.round(random(1, 6));
    switch (img) {
      case 1:
        cactos1.addImage(cactosimg1);
        break;
      case 2:
        cactos1.addImage(cactosimg2);
        break;
      case 3:
        cactos1.addImage(cactosimg3);
        break;
      case 4:
        cactos1.addImage(cactosimg4);
        break;

      case 5:
          cactos1.addImage(cactosimg5);
          break;
        
      case 6:
        cactos1.addImage(cactosimg6);
        break;
        default:
      
          break;
    }
    cactos1.scale = 0.5;
    cactos1.velocityX = -(5+score/100);
    cactos.add(cactos1);
  }
}
function reset(){
 
  score= 0;
  cactos.destroyEach();
  nuvem.destroyEach();
  trex.y = height-40;
  trex.velocityY= 0;
  gamestate= "jogando";
  trex.changeAnimation("running");
}