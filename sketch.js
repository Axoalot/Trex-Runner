//declarando as variáveis
var trex, trex_running,trexColited
var edges;
var ground, ground_img
var ground2;
var cloud, cloud_img
var cactus, cactus_img, cactus_img2,cactus_img3,cactus_img4,cactus_img5,cactus_img6
var play = 1
var end = 0
var gameState = play
var cloudGP
var cactusGP
var score = 0
var record = 0
var restart, restartIMG
var gameover, gameoverIMG
var die, Checkpoint, jump
var isdead = false
//preload carrega as mídias do jogo
function preload(){
  trex_running = loadAnimation("images/trex3.png","images/trex4.png")
  ground_img = loadImage ("images/ground2.png") 
  cloud_img = loadImage ("images/cloud.png")
  cactus_img = loadImage ("images/obstacle1.png")
  cactus_img2 = loadImage ("images/obstacle2.png")
  cactus_img3 = loadImage ("images/obstacle3.png")
  cactus_img4 = loadImage ("images/obstacle4.png")
  cactus_img5 = loadImage ("images/obstacle5.png")
  cactus_img6 = loadImage ("images/obstacle6.png")
  trexColited = loadAnimation ("images/trex_collided.png")
  restartIMG = loadImage ("images/restart.png")
  gameoverIMG = loadImage ("images/gameOver.png")
  die = loadSound ("sounds/die.mp3")
  jump = loadSound ("sounds/jump.mp3")
  Checkpoint = loadSound ("sounds/checkPoint.mp3")
}
//setup faz a configuração
function setup(){
  createCanvas(windowWidth,windowHeight);

  //sprite trex
  trex = createSprite(50,height -40,20,40)
  trex.addAnimation("running",trex_running);
  trex.addAnimation("Colited",trexColited);
  trex.scale = 0.5
  //trex.debug = true    //AAAAAAAAAAAAAAAA
  trex.setCollider ("rectangle",0,0,80,50,90)
  //trex.setCollider ("circle",0,0,10)


  //sprite Solo
  ground = createSprite(width/2,height -15,width,30)
  ground.addImage("terra plana",ground_img)
  ground2 = createSprite(width/2,height -5,width,5)
  ground2.visible = false
  ground.scale = 1.5
  //criando bordas
  edges = createEdgeSprites();
 
  cactusGP = new Group()
  cloudGP = new Group()

  restart = createSprite(width/2,height -100)
  restart.addImage("Xandão",restartIMG)
  gameover = createSprite(width/2, height -130)
  gameover.addImage("edinaldopereira",gameoverIMG)
  gameover.scale = 0.5
  restart.scale = 0.5
  gameover.visible = false
  restart.visible = false

}

//AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
//draw faz o movimento, a ação do jogo
function draw(){
  background("white");
 if (trex.isTouching (cactusGP)) {
   gameState = end
   
   if (!isdead) {
     die.play()
     isdead = true
   }
 }

 
  //Play
  if (gameState == play) {
      //pulo do trex
    if ((  touches.length > 0||keyDown("space"))&& trex.y > height -40) {
      jump.play()
      trex.velocityY = -10
      touches = []
    }
    ground.velocityX = -(5 + score / 100) 
    if(ground.x < 0 ){
      ground.x = ground.width/2
    }
    cloudGenerator()
    cactusGenerator()
    score = score+Math.round(getFrameRate()/60)
    if (score % 100 == 0 && score > 0) {
      Checkpoint.play()
      
    }
  
  }
  
  //Endaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
  if (gameState == end) {
    trex.changeAnimation("Colited")
    ground.velocityX = 0
    cactusGP.setVelocityXEach (0)
    cloudGP.setVelocityXEach (0)
    cactusGP.setLifetimeEach (-1)
    cloudGP.setLifetimeEach (-1)
    gameover.visible = true
    restart.visible = true
    if (mousePressedOver(restart)) {
      reset()
    }
  }

  gravity();
 
  //var numero = Math.round (random(1,6))
  //text(numero,500,20)
  trex.collide(ground2)
  
  //coordenadas do mouse na tela
  //text("X: "+mouseX+" / Y: "+mouseY,mouseX,mouseY)
  text("Score: "+score,width -87,height -140)
  text("Record: "+record,width -87 ,height -150)
  drawSprites();
  
}
//gravidade
function gravity(){
  trex.velocityY += 0.5;
}
function cloudGenerator(){
   
  if (frameCount % 60 == 0) {
    cloud = createSprite (width,random(height -170, height -120),50,50)
    cloud.velocityX = -(2 +score / 100)
    cloud.addImage("COMIDA",cloud_img)
    cloud.scale = random(0.7,1)
    cloud.depth =  trex.depth -1
    cloud.lifetime = width/cloud.velocityX
    cloudGP.add(cloud)
  }
}
function cactusGenerator(){

  if (frameCount % 100 == 0) {
    cactus = createSprite (width,height -30,50,60)
    cactus.velocityX = -(2 +score / 100)
    var cactus_sorteio =Math.round (random (1,6))
    switch (cactus_sorteio) {
      case 1: cactus.addImage (cactus_img)
        
        break;
      case 2: cactus.addImage (cactus_img2)
        
        break;
      case 3: cactus.addImage (cactus_img3)
        
        break;
      case 4: cactus.addImage (cactus_img4)
        
        break;
      case 5: cactus.addImage (cactus_img5)
        
        break;
      case 6: cactus.addImage (cactus_img6)
        
        break;
        
      }
  cactus.scale = 0.4
    cactus.lifetime = width/cactus.velocityX
    cactusGP.add(cactus)
  }
  
}
function reset(){ 
   gameState = play
  gameover.visible = false
  restart.visible = false
  cactusGP.destroyEach ()
  cloudGP.destroyEach ()
  trex.changeAnimation ("running")
  score = 0
  
}