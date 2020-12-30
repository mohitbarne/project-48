//variables
var bg1,bg2,bg3,bg4
var counter =0
var oz,ozRun,ozJump,ozSlide,ozFall
var table1,table2
var box1,box2,box3,box4
var ufo,ufoImage
var food1,food2,food3,food4
var score,health 
var gameover,gameOverImage, restart,restsrtImage
//gameState : story,play,continue, end
var gameState = "story"
function preload() {
  bg1 = loadImage("images/room1.jpg");
  bg2 = loadImage("images/room2.jpg");
  bg3 = loadImage("images/room3.jpg");
  bg4 = loadImage("images/room4.jpg");
  
  //oz animation
  boy1 = loadAnimation("images/boy1.PNG");
  ozRun = loadAnimation("images/boy2.PNG","images/boy3.PNG",
    "images/boy4.PNG","images/boy5.PNG","images/boy6.PNG",
    "images/boy7.PNG");
  ozJump =loadAnimation("images/boy9.PNG");
  ozSlide = loadAnimation("images/boy11.PNG");
  ozFall = loadAnimation("images/boy12.PNG")
  
  gameover = loadImage("images/gameover.png");
  
  box1 = loadImage("images/box1.png");
  box2 = loadImage("images/box2.png");
  box3 = loadImage("images/obstacle3.png");
  box4 = loadImage("images/obstacle4.png");

  food1 = loadImage("images/food1.png");
  food2 = loadImage("images/food2.png");
  food3 = loadImage("images/food3.png");
  food4 = loadImage("images/food4.png");

  ufoImage = loadImage("images/ufo.png");
  
  //storyImage
  //instruction
}

function setup() {
  createCanvas(windowWidth,windowHeight);
  
  ufo = createSprite(windowHeight-500, 200, 50, 50)
  ufo.addImage(ufoImage)

  oz = createSprite(windowHeight-200, 200, 50, 50);
  oz.addAnimation("run",ozRun)
  oz.addAnimation("jump",ozJump)
  oz.addAnimation("slide",ozSlide)
  oz.addAnimation("fall",ozFall)
  oz.scale =2

  ground = createSprite(windowWidth/2, windowHeight-30,windowWidth,10)
  //ground.visible = false

  obstaclesGroup = createGroup();
  foodGroup = createGroup();

  //button for changing instruction
  changePage=createButton("NEXT");
  changePage.position(windowWidth/2-100,windowHeight-30);
  changePage.size(100,50)

  story = createSprite(windowWidth/2,windowHeight/2)
  story.visible = false
}

function draw() {
  background(bg1); 
  if(gameState === "stroy"){
    story.visible = false
    
    changePage.mouseClicked(()=>{
      counter+=1
      switch(counter){  
        case 1 : story.addImage(storyImage)
        break;
        case 2 : story.addImage(instructionImage)
        break;
        case 3: story.visible = false
        gameState = "play"
      }
    })
  }


  if(gameState === "play"){
  //jump
  if(keyDown("up") ){
    oz.velocityY =-20
    oz.changeAnimation("jump",ozJump)
  }
  //to change back the animation to running after oz jumps
  if(oz.y>880){
    oz.changeAnimation("run",ozRun)
  }
  //slide
  if(keyDown("down")){
    oz.changeAnimation("slide",ozSlide)
  }

  //camera position for oz
  camera.position.x = oz.x
  camera.position.y = oz.y

  //gravity
  oz.velocityY += 1.0  
  oz.collide(ground)
  //console.log(oz.y)
    
  spawnObstacles()
  
   
//46: starting page- title, rules,button, images for obstacles, food, istouchng, gameState
  
/*OZ is in line to become the king of the far away planet 'ZATHURA'.He has escaped from ZATHURA
  as he didnt want to be the king. He wants to explore the universe an learn a lot of new things.
  While his exploration, he found earth...
  People of Earch were very welcoming and intersting. He is very fond of the atmosphere of the earth..
  Best part of earth is the FOOD!!
  But people from his planet are trying to abduct him and take him back to his planet..
  Help oz escape as he is innocent...
  If you fail to help him escape, he will be taken away 
  */
  
  
  //47: life for oz -- 3 heart and score
  //48: testing...sound
}

if(gameState ==="end"){

}









  drawSprites();
}

//like spawn obstacles in trex same like that make your obstacles
function spawnObstacles() {
  //write code here to spawn the obstacles
  if (frameCount % 260 === 0) {
    var obstacles = createSprite(windowWidth,1000,40,10);

    var r = Math.round(random(1,2))
    switch(r){
      case 1 : obstacles.addImage(box1);
      break;
      case 2: obstacles.addImage(box2);
      break;



      default: break;
    }
    obstacles.scale = 1.0;
    obstacles.velocityX = -6;
    
    //assign lifetime to the variable
    obstacles.lifetime = 800;
    
    //adjust the depth
    oz.depth = obstacles.depth
    oz.depth +=1

    //add each obstacle to the group
    obstaclesGroup.add(obstacles);
  }
  
}

//for spawning food
function spawnFoods() {
  //write code here to spawn the obstacles
  if (frameCount % 400 === 0) {
    var food = createSprite(windowWidth,1000,40,10);

    var r = Math.round(random(1,2))
    switch(r){
      case 1 : food.addImage(food1);
      break;
      case 2: food.addImage(food2);
      break;



      default: break;
    }
    food.scale = 1.0;
    food.velocityX = -6;
    
    //assign lifetime to the variable
    food.lifetime = 800;
    
    //adjust the depth
    oz.depth = food.depth
    oz.depth +=1

    //add each obstacle to the group
    foodGroup.add(food);
  }
  
}



