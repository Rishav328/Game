/* Notice to user in alert */

alert("Press on Screen to shoot the target , while increseing points the ship will go down , you can only waste 10 bullets.");
alert("Thanks for visiting here enjoy 🙂");

/** main **/

const HEIGHT = window.innerHeight;
const WIDTH = window.innerWidth;
// size of our screen ,full screen

const fps = 150;
// setting frame rate

var gameOver = false;
// checking game is Over ,I mean in future

var gameStart = true;
// checking game to start

var highScore = 0;
// highscore for fell fun to beat it

function setup() {
    createCanvas(WIDTH, HEIGHT);
    frameRate(fps);
    // a canvas created 
}

function draw() {
    
    if (gameStart) {
        starting();
    }
    
    if (gameOver) {
        ending();
    }
    
    noStroke();
    fill("green")
    text("High Score - "+highScore , 10,35);
}


var count = 0;

var ship_y = 200;
var ship_x = WIDTH / 2;
var target_x = WIDTH / 2;
const TARGET_Y = 40;
var vel = 3;
var velOfPoint = 5;
// data of ship and target 

var bullets = [];
var bulletX;
var bulletY;
// data of bullets

var designPoints = [];
// data for design

var bulletsYouCanWaste = 10; // for my rememberence
// number of bullets you can waste

var totalNumberOfBulletsShoot = 0;
// the purpose to make this var is totalBulletsShoot - points we can get the remaing bullets ,which we actully want

function starting() {

    background(0);
    noStroke();
    fill("lightBlue");
    text("Points - "+count ,10 ,15 );
    
    text("Bullets you can waste - "+ bulletsYouCanWaste + "/10", 120,15)
    ship(ship_x ,ship_y);
    points(target_x ,TARGET_Y)
    
    if (ship_x < 30) {
        vel = -vel;
    } else if (ship_x > WIDTH-60){
        vel = -vel;
    }
    
    if (target_x < 30) {
        velOfPoint = -velOfPoint;
    } else if (target_x > WIDTH-30){
        velOfPoint = -velOfPoint;
    }
    // tackling width of window
    
    ship_x += vel;
    target_x += velOfPoint;
    // move left and right

       
    for (var i=0 ; i<bullets.length ; i++) {
        bullets[i].move();
        bullets[i].show();
        
        if (target_x-7 <= bullets[i].x && target_x + 35 >= bullets[i].x && TARGET_Y-7 <= bullets[i].y && bullets[i].y <= TARGET_Y+18) {
            count++;
            //checking accedent
            
            designPoints.push(new flingPointsOne(ship_x ,ship_y));
            
        }
        if (bulletsYouCanWaste == 11 && TARGET_Y > bullets[i].y) {
            gameOver = true;
            gameStart = false;
            if (count > highScore) {
                highScore = count;
            }
        }
        if (bulletsYouCanWaste == 10) {
            text("Bullets are over",105,50);
        }
    }
    
    for (var j=0 ; j<designPoints.length ; j++) {
        designPoints[j].moveY();
        designPoints[j].show();
    }
    //moving of bullets
    
    if (designPoints.length == 2) {
        designPoints.slice(0,1);
    }
    //more not increaing size of the variable
    
    if (count != 0 && count % 10 == 0 && count <=70 ) {
        count += 1;
        ship_y += 15;
    } 
    
    bulletsYouCanWaste = totalNumberOfBulletsShoot - count;
}

function ship(x, y) {
    strokeWeight(5);
    stroke("grey");
    fill("white")
    rect(x ,y ,30 ,30 );
    rect(x-30 ,y ,30 ,30);
    rect(x+30 ,y ,30 ,30);
    rect(x ,y-30 ,30 ,30);
    rect(x-30 ,y+30 ,30 ,30);
    rect(x+30 ,y+30 ,30 ,30);
}
// a function that which will create a space ship

function points(x, y) {
    strokeWeight(6);
    stroke("orange");
    fill("yellow");
    rect(x ,y ,30 ,30);
}
// a function that will create points of user

function bullet(x ,y) {
    this.x = x + 15;
    this.y = y - 30;
    this.move = function() {
        this.y -= 20;
    }
    this.show = function() {
        stroke("red")
        line(this.x, this.y ,this.x ,this.y + 10);
    }
}
// function for throw bullets
// level up text up more beauty and eye catching

function flingPointsOne(x ,y) {
    this.x = x;
    this.y = y;
    this.moveY = function() {
        this.y -= 3;
    }
    this.show = function() {
        fill(255)
        noStroke()
        text("+1" ,this.x ,this.y)
    }
}

// second part
function ending() {
    background(0);
    fill(255)
    text("GAME OVER - TAP SCREEN TO CONTINUE",50 ,50);
}

function mouseClicked() {
    if (gameStart) {
        bulletX = ship_x;
        bulletY = ship_y;
    
        obj = new bullet(bulletX ,bulletY)
        bullets.push(obj);
    
        totalNumberOfBulletsShoot += 1;
        // no of bullets shoot
    }
    if (gameOver) {
        gameOver = false;
        gameStart = true;
        
        /* setting all to default */
        count = 0;

        ship_y = 200;
        ship_x = WIDTH / 2;
        target_x = WIDTH / 2;
        
        vel = 3;
        velOfPoint = 5;
        // data of ship and target 

        bullets = [];
        // data of bullets

        designPoints = [];
        // data for design

        bulletsYouCanWaste = 10; // for my rememberence
        // number of bullets you can waste

        totalNumberOfBulletsShoot = 0;
        // the purpose to make this var is totalBulletsShoot - points we can get the remaing bullets ,which we actully want

    }
    
}
// mousePressed event

