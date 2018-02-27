class Paddle{
  constructor(pos, height, width){
    this.position = pos.copy();
    this.width = width;
    this.height = height;
    this.speed = 5;
    this.score = 0;
  }
}

Paddle.prototype.moveUp = function(){
  this.position.add(0,-this.speed);
  if(this.position.y < 0){
    this.position.y = 0;
  }
}

Paddle.prototype.moveDown = function(){
  this.position.add(0,this.speed);
  if(this.position.y + this.height > height){
    this.position.y = height - this.height;
  }
}

Paddle.prototype.draw = function(){
  rect(this.position.x,this.position.y,this.width,this.height);
}

Paddle.prototype.increseScore = function(){
  this.score ++;
}

Paddle.prototype.applyColision = function(ball, dir, max_speed){
  ball.reverse();
  if(dir == direction.RIGHT){
    ball.position.x = this.position.x + this.width;
  }
  else { //if(dir == direction.LEFT)
    ball.position.x = this.position.x - ball.size;
  }
  ball.setBounceDirection(this);
  ball.accelerateToMax(max_speed);
  collisionParticles();
}

Paddle.prototype.isColiding = function(ball){
  return ball.position.y + ball.size > this.position.y &&
         ball.position.y < this.position.y + this.height &&
         ball.position.x + ball.size > this.position.x &&
         ball.position.x < this.position.x + this.width;
}
