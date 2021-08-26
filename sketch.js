// making variables
var welcome , welcomeImg ;
var road , roadImg ;
var blueCar , blueCar_img , redCar , redCar_img , yellowCar , yellowCar_img , skinCar  , skinCar_img , whiteCar , whiteCar_img ;
var rocket , rocketImg ;
var obs1 , obs1_img , obs2 , obs2_img , stop , stopImg ;
var score = 0;

// var invisible sprites
var is_1 , is_2 , is_3 ;

/// groups
var blueCar_g , yellowCar_g , skinCar_g , whiteCar_g , rocket_g ,obs1_g , obs2_g , stop_g , obs1_g , obs2_g ;

// game state
var gameState ="play";

////////////////////////////////////                PRELOAD                ///////////////////////////////////////

function preload(){
    // loading images
welcomeImg = loadImage("welcome.jpg");
roadImg = loadImage("Road.png");
blueCar_img = loadImage("blue car.png");
redCar_img = loadImage("red car.png");
yellowCar_img = loadImage("yellow car.png");
skinCar_img = loadImage("skin car.png");
whiteCar_img = loadImage("white car.png");
rocketImg = loadImage("fire.png");
obs1_img = loadImage("obs_1.png");
obs2_img = loadImage("obs 2.png");
}

///////////////////////////////         SETUP         //////////////////////////////////////////

function setup() {
createCanvas(windowWidth,windowHeight);

welcome = createSprite(1030,550);
welcome.addImage(welcomeImg);
welcome.scale = 0.8;
welcome.lifetime = 70;

// background
road = createSprite(width-1020 , height-600);
road.addImage(roadImg);
road.scale = 1.3
road.velocityY = 25;

// increasing depth
welcome.depth = road.depth;
welcome.depth+=1;

// making red car
redCar = createSprite(width-1014,height-200);
redCar.addImage(redCar_img);
redCar.scale = 0.5;

// increasing depth
welcome.depth = redCar.depth;
welcome.depth+=1;

// invisible sprites
is_1 = createSprite(0,height-600,40,2000);
is_1.visible = false;
is_2 = createSprite(width-0,height-600,40,2000);
is_2.visible = false;
is_3 = createSprite(width/2,0,2100,40);
is_3.visible = false;

// making groups
blueCar_g = new Group();
yellowCar_g = new Group();
skinCar_g = new Group();
whiteCar_g = new Group();
rocket_g = new Group();
obs1_g = new Group();
obs2_g = new Group();



}

//////////////////////////////////////////       DRAW         ///////////////////////////////////////////

function draw() {

 background("lightblue");

                                   ////////////////////           PLAY         //////////////////

 if(gameState === "play"){

    drawSprites();
    textSize(35);
    fill("white");
    textFont("chunkfive");
    text("control your car by arrow keys.",1590,800)
    text("don't touch other cars.",1590,840);
    text("don't touch obstacles.",1590,880);
    text("SPACE for POWER.",1590,920);
    text("destroy all OBSTACLES FROM POWER.",1430,960);

    text("SCORE: "+score,1840,30)

    // colliding car
    redCar.collide(is_1);
    redCar.collide(is_2);

    // moving road
    if(road.y > 810){
        road.y = 200
      }

      // making rocket
      if(keyDown("space")){
        cRocket();
      }

      //// moving red car left and right
      if(keyDown("right")){
          redCar.x = redCar.x+20;
      }

      if(keyDown("left")){
        redCar.x = redCar.x-20;
        }

        // stopping car from going outside

        // destroying rocket
        if(rocket_g.isTouching(is_3)){
            rocket_g.destroyEach();
        }

// calling functions
carBlue();
carYellow();
carSkin();
carWhite();
cObs_1();
cObs_2();


// destroying every thing

if(redCar.isTouching(blueCar_g)){
    gameState = "end";
}
if(redCar.isTouching(yellowCar_g)){
    gameState = "end";
}
if(redCar.isTouching(skinCar_g)){
    gameState = "end";
}
if(redCar.isTouching(whiteCar_g)){
    gameState = "end";
}

if(redCar.isTouching(obs1_g)){
    gameState = "end";
}
if(redCar.isTouching(obs2_g)){
    gameState = "end";
}

// destroying obstacles

if(rocket_g.isTouching(obs1_g)){
    obs1_g.destroyEach();
    rocket_g.destroyEach();

    score = score+1;
}
if(rocket_g.isTouching(obs2_g)){
    obs2_g.destroyEach();
    rocket_g.destroyEach();

    score = score+1;
}

if(rocket_g.isTouching(blueCar_g)){
    rocket_g.destroyEach();
    blueCar_g.destroyEach();
    score = score+1;
}
if(rocket_g.isTouching(yellowCar_g)){
    rocket_g.destroyEach();
    yellowCar_g.destroyEach();
    score = score+1;
}
if(rocket_g.isTouching(skinCar_g)){
    rocket_g.destroyEach();
    skinCar_g.destroyEach();
    score = score+1;
}
if(rocket_g.isTouching(whiteCar_g)){
    rocket_g.destroyEach();
    whiteCar_g.destroyEach();
    score = score+1;
}


 }

                                        //////////////          END            ///////////

 if(gameState === "end"){

     fill("red");
     textSize(160);
     textFont("algerian");
     text("GAME OVER",550,500);
     fill("blue");
     textSize(100);
     text(" r to reset",700,600)

     yellowCar_g.destroyEach();
     blueCar_g.destroyEach();
     skinCar_g.destroyEach();
     whiteCar_g.destroyEach();
     rocket_g.destroyEach();
     obs1_g.destroyEach();
     obs2_g.destroyEach();

     yellowCar_g.setVelocityEach(0);
     blueCar_g.setVelocityEach(0);
     skinCar_g.setVelocityEach(0);
     whiteCar_g.setVelocityEach(0);
     obs1_g.setVelocityEach(0);
     obs2_g.setVelocityEach(0);

     if(keyDown("r")){
         reset();
     }
 }

 
}


function carBlue(){

if(frameCount % 240 === 0){
blueCar = createSprite(Math.round(random(30,1300),30));
blueCar.addImage(blueCar_img);
blueCar.scale = 0.5
blueCar.velocityY = 6;

blueCar_g.add(blueCar);

blueCar.lifetime = 600;
}
}

function carYellow(){

    if(frameCount % 280 === 0){
    yellowCar = createSprite(Math.round(random(30,1300),-30));
    yellowCar.addImage(yellowCar_img);
    yellowCar.scale = 0.8;
    yellowCar.velocityY = 5;
    
    yellowCar_g.add(yellowCar);
    
    yellowCar.lifetime = 600;
    }
    }

    function carSkin(){

        if(frameCount % 310 === 0){
        skinCar = createSprite(Math.round(random(30,1300),-30));
        skinCar.addImage(skinCar_img);
        skinCar.scale = 0.8;
        skinCar.velocityY = 5;
        
        skinCar_g.add(skinCar);
        
        skinCar.lifetime = 600;
        }
        }

        function carWhite(){

            if(frameCount % 225 === 0){
            whiteCar = createSprite(Math.round(random(30,1300),-30));
            whiteCar.addImage(whiteCar_img);
            whiteCar.scale = 0.8;
            whiteCar.velocityY = 5;
            
            whiteCar_g.add(whiteCar);
            
            whiteCar.lifetime = 600;
            }
            }

        function cObs_1(){
        if(frameCount % 250 === 0){
            obs1 = createSprite(Math.round(random(20,1100),20));
            obs1.addImage(obs1_img);
            obs1.scale = 0.5;
            obs1.velocityY = 6;

            obs1_g.add(obs1);

            obs1.lifetime = 600;

            obs1.debug = false;
            obs1.setCollider("rectangle",0,0,430,290);
        }
        }

        function cObs_2(){
            if(frameCount % 300 === 0){
                obs2 = createSprite(Math.round(random(20,1100),-20));
                obs2.addImage(obs2_img);
                obs2.scale = 0.4;
                obs2.velocityY = 6;
    
                obs2_g.add(obs2);
    
                obs1.lifetime = 650;

                obs2.debug = false;
                obs2.setCollider("rectangle",0,0,300,355)
                
            }
            }

    
    function cRocket(){
        
    rocket = createSprite(1014,200);
    rocket.addImage(rocketImg);
    rocket.scale = 1.3;
    rocket.velocityY = -11;

    rocket.y = redCar.y;
    rocket.x = redCar.x;

    rocket_g.add(rocket);
    
    }

    function reset(){
    gameState = "play";
    redCar.x = width-1014;
    redCar.y = height-200;
    score = 0;
    blueCar_g.destroyEach();
    yellowCar_g.destroyEach();
    skinCar_g.destroyEach();
    whiteCar_g.destroyEach();
    }
        