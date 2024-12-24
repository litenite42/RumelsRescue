class Vehicle extends EngineObject 
{
    constructor(minVelocity, maxVelocity, lane)
    {
        super(); // set object position

        const width = randInt(10, 22);
        const height = randInt(2, 4);

        this.velocity = vec2(rand(minVelocity, maxVelocity), 0);

        this.size = vec2(width, height);
        this.pos = vec2(-10, lane - height / 2); 
        this.color = randColor();

        this.setCollision();
    }
  
    collideWithObject(obj) {
      if (obj !== _FOTL.player) return;
      _FOTL.currentState = _FOTL.states.gameOver;
    }

    update() {

      if (isPaused()) return;
      this.pos.x += this.velocity.x;

      if (this.pos.x > 40) {
        this.destroy();
      }

      super.update();
    }
}

class EasyVehicle extends Vehicle {
  constructor(lane) {
    super(.03, .05, lane);
  }
}

class MediumVehicle extends Vehicle {
  constructor(lane) {
    super(.05, .08, lane);
  }
}

class HardVehicle extends Vehicle {
  constructor(lane) {
    super(.08, .1, lane);
  }
}

class FallingVehicle extends Vehicle {
  constructor(lane) {
    super(.04, .07, 19);
    this.velocity.y = -1 * rand(.005, .012);
  }
}
