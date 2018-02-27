var particles = null;
var paddle_one = null;
var paddle_two = null;
var ball = null
var ball_size = 10;
var standard_height = 100;
var standard_width = 20;
var max_speed = 17;

var direction = {
    LEFT: 0,
    RIGHT: 1
};

var difficulty = {
    EASY: 0,
    NORMAL: 1,
    HARD: 3
};

function setup() {
  createCanvas(1250, 750);
  background(0);
  fill(255);
  stroke(255);
  textAlign(CENTER);
  textSize(height/12);
  text("PRESS SPACE TO START", width/2, height/2);
  textSize(height/6);
  initialize();
  applyDificulty(difficulty.NORMAL);
  noLoop();
}

function draw() {
  background(0,128);
  applyMovement();
  updateAll();
  drawAll();
}

function keyPressed() {
  if(keyCode == 32){
    loop();
  }
  return false;
}

function updateAll(){
  particles.update();
  ball.update();
  applyCollisions();
  handleScore();
}

function drawAll(){
  drawLines();
  drawScores();
  ball.draw();
  particles.draw();
  paddle_one.draw();
  paddle_two.draw();
}
// 87 W, 83 S, 38 UP, 40 DOWN
function applyMovement() {
  if(keyIsDown(87) || keyIsDown(38)){
    paddle_one.moveUp();
  }
  if(keyIsDown(83) || keyIsDown(40)){
    paddle_one.moveDown();
  }
  // AI MOVEMENT
  if(ball.position.y - ball.size*2 < paddle_two.position.y){
    paddle_two.moveUp();
  }else if(ball.position.y + ball.size*3 > paddle_two.position.y + paddle_two.height){
    paddle_two.moveDown();
  }
}

function initialize(){
  particles = new Particles();
  paddle_one = new Paddle(createVector(10,
                                       height/2-standard_height/2),
                          standard_height,
                          standard_width);
  paddle_two = new Paddle(createVector(width-standard_width-10,
                                       height/2-standard_height/2),
                          standard_height,
                          standard_width);
  ball = new Ball(createVector(width/2+ball_size/2, height/2+ball_size/2),
                  ball_size,
                  createVector(paddle_one.position.x - width/2,
                               paddle_one.position.y - height/2));
}

function drawLines(){
  for(i=0;i<height;i+=60){
    rect(width/2-5,i,10,30);
  }
}

function drawScores(){
  text(paddle_one.score, width/4, height/4);
  text(paddle_two.score, 3*width/4, height/4);
}

function handleScore(){
  if(ball.position.x < -ball.size){
    ball.reset(createVector(paddle_one.position.x - width/2,
                            paddle_one.position.y - height/2));
    paddle_two.increseScore();
    particles.blow(createVector(3*width/4, height/4-height/12),
                   70,
                   0.01,
                   5);

  }
  if(ball.position.x > width){
    ball.reset(createVector(paddle_two.position.x - width/2,
                            paddle_two.position.y - height/2));
    paddle_one.increseScore();
    particles.blow(createVector(width/4, height/4-height/12),
                   70,
                   0.01,
                   5);
  }
}

function applyCollisions(){
  if(paddle_one.isColiding(ball)){
    paddle_one.applyColision(ball, direction.RIGHT, max_speed);
  }
  if(paddle_two.isColiding(ball)){
    paddle_two.applyColision(ball, direction.LEFT, max_speed);
  }
}

function collisionParticles(){
  magnitude = ball.velocity.mag();
  particles.directedBlow(ball.position.copy().add(ball.size/2, ball.size/2),//pos
                         map(magnitude,7,20,5,70),//number 0 - 50
                         map(magnitude,7,20,0,0.005),//shake 0.002
                         map(magnitude,7,20,1,8),//strength 1 - 5
                         ball.velocity,//direction
                         map(magnitude,7,20,QUARTER_PI/6,QUARTER_PI));//variance
}

function applyDificulty(difficulty){
  paddle_two.speed /= map(difficulty, 1, 3, 1.6, 1);
}
