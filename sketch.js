var ball;
var db,position;
var city,balloon;

function preload(){
    city = loadImage("city.png");
    balloon = loadImage("Balloon.png");
}
function setup(){
    createCanvas(1500,700);
    db=firebase.database();
    ball = createSprite(250,650,150,150);
    ball.scale=0.5;
    ball.shapeColor = "red";
    ball.addImage(balloon);
    var positionref=db.ref("Ball/Position");
    positionref.on("value",readPosition,showError);
}


function draw(){
    background(city);
    if(position !=undefined){
        if(keyDown(LEFT_ARROW)){
            changePosition(-10,0);
        }
        else if(keyDown(RIGHT_ARROW)){
            changePosition(10,0);
        }
        else if(keyDown(UP_ARROW)){
            changePosition(0,-10);
            ball.scale-=0.005;
        }
        else if(keyDown(DOWN_ARROW)){
            changePosition(0,+10);
            ball.scale+=0.005;
        }
    }
   
    drawSprites();
}

function changePosition(x,y){
   db.ref("Ball/Position").set({
       x:position.x+x,
       y:position.y+y
   })
}
function readPosition(data){
    position=data.val();
    ball.x=position.x;
    ball.y=position.y;

}
function showError(){
    console.log("could not read the db");
}