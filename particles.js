class Particles{
  constructor(){
    this.elements = [];
  }
}

Particles.prototype.blow = function(pos, number, shake, strength){
  for(var i=0; i<number; i++){
    this.elements.push(new Particle(pos.copy(),
                        p5.Vector.random2D().setMag(random(strength/5,strength)),
                        100,
                        random(2.5, 7.5),
                        random(0.5, 1.5),
                        shake));
  }
}

Particles.prototype.directedBlow = function(pos, number, shake, strength,
                                            direction, variance){
  for(var i=0; i<number; i++){
    this.elements.push(new Particle(pos.copy(),
                        direction.copy().setMag(random(strength/5,strength))
                        .rotate(random(-variance,variance)),
                        100,
                        random(2.5, 7.5),
                        random(0.5, 1.5),
                        shake));
  }
}

Particles.prototype.update = function(){
  for(i=this.elements.length-1; i>=0; i--){
    if(this.elements[i].isAlive()){
      this.elements[i].update();
    }
    else{
      this.elements.splice(i,1);
    }
  }
}


Particles.prototype.draw = function(){
  for(i=0; i<this.elements.length; i++){
    this.elements[i].draw();
  }
}
