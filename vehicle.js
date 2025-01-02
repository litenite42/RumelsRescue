class Vehicle extends EngineObject 
{
    tileInfo;

    constructor(minVelocity, maxVelocity, lane, tileInfo)
    {
        super(); // set object position

        const width = randInt(6, 8);
        const height = 4


        this.velocity = vec2(rand(minVelocity, maxVelocity), 0);

        this.size = vec2(width, height);
        this.pos = vec2(-10, lane - height / 2); 
        this.color = randColor();

        this.setCollision();

        this.mass = 0;
        this.tileInfo = tileInfo;
    }
  
    collideWithObject(obj) {
      if (obj !== _FOTL.player) return;
      _FOTL.currentState = _FOTL.states.gameOver;
      _FOTL.gameOverReason = 'Crashed';
    }

  render() {
    drawTile(this.pos, this.size, this.tileInfo, this.color, this.angle, this.mirror, this.additiveColor);
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
    const sprite = chooseSprite('easy');
    super(.03, .05, lane, sprite);
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

    this.mass = rand(.1, .6);
    this.gravityScale = .05;
  }
}
