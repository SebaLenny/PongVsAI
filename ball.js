class Ball{
  constructor(pos, size, direction){
    this.position = pos.copy();
    this.size = size;
    this.velocity = direction.copy().setMag(6.5);
  }
}

Ball.prototype.update = function(){
  this.position.add(this.velocity);
  if(this.position.y < 0){
    this.position.y = 0;
    this.velocity.y *= -1;
  }else if(this.position.y + this.size > height){
    this.position.y = height - this.size;
    this.velocity.y *= -1;
  }
}

Ball.prototype.draw = function(){
  rect(this.position.x,this.position.y,this.size,this.size);
  magnitude = this.velocity.mag();
  if(frameCount % (floor(20-magnitude)) == 0)
    particles.directedBlow(this.position.copy().add(this.size/2,this.size/2),//pos
                         map(magnitude,7,20,0,3),//number 0 - 50
                         map(magnitude,7,20,0,0.01),//shake 0.002
                         map(magnitude,7,20,0,2),//strength 1 - 5
                         this.velocity.copy().mult(-1),//direction
                         map(magnitude,7,20,QUARTER_PI,QUARTER_PI/6));//variance
}

Ball.prototype.reverse = function(){
  this.velocity.x *= -1;
}

Ball.prototype.accelerateToMax = function(max){
  if(abs(this.velocity.x) < max){
    this.velocity.x *= 1.10;
  }
}

Ball.prototype.setBounceDirection = function(paddle){
  this.velocity.y = map(this.position.y - paddle.position.y,
                        -this.size, paddle.height,
                        -5,5);
}

Ball.prototype.reset = function(direction){
  this.position.set(width/2, height/2);
  this.velocity = direction.copy().setMag(6.5);
}
