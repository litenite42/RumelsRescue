class Vehicle extends EngineObject 
{
    constructor(minVelocity, maxVelocity)
    {
        super(); // set object position

        const width = randInt(10, 22);
        const height = randInt(2, 4);
      
        const quads = [4, 9, 14, 19];
        
        const randNdx = randInt(4);
        const selectedQuad = quads[randNdx];

        this.velocity = vec2(rand(minVelocity, maxVelocity), 0);

        this.size = vec2(width, height);
        this.pos = vec2(-10, selectedQuad - height / 2); 
        this.color = randColor();

        this.setCollision();
    }
  
    collideWithObject(obj) {
      if (obj !== _FOTL.player) return;
      _FOTL.currentState = _FOTL.states.gameOver;
    }

    update() {
      if (_FOTL.currentState === _FOTL.states.paused) return;
      this.pos.x += this.velocity.x;

      if (this.pos.x > 40) {
        this.destroy();
      }

      super.update();
    }
}

class EasyVehicle extends Vehicle {
  constructor() {
    super(.03, .05);
  }
}

class MediumVehicle extends Vehicle {
  constructor() {
    super(.05, .08);
  }
}

class HardVehicle extends Vehicle {
  constructor() {
    super(.08, .1);
  }
}
