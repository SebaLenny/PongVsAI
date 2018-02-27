class Particle{
  constructor(position, velocity, durability, size, decay, shake){
    this.position = position;
    this.velocity = velocity; //.setMag(0.01*durability);
    this.durability = durability;
    this.life = durability;
    this.size = size;
    this.decay = 1/decay;
    this.shake = shake;
  }
}

Particle.prototype.draw = function(){
  rectMode(CENTER);
  rect(this.position.x, this.position.y,
        map(this.life, 0, this.durability, 0, this.size),
        map(this.life, 0, this.durability, 0, this.size));
  //ellipse(this.position.x, this.position.y,
  //        map(this.life, 0, this.durability, 0, this.size));
  rectMode(CORNER);
}

Particle.prototype.update = function(){
  this.position.add(this.velocity.mult(0.975));//map(this.life,0,this.durability,0,1)
  this.life -= this.decay;
  if(this.shake != 0){
    if(random() < this.shake){
      this.velocity.rotate(HALF_PI*(random()-0.5))
    }
  }
}

Particle.prototype.isAlive = function(){
  return this.life > 0;
}
