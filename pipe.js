class Pipe extends EngineObject 
{
    #velocity;
    constructor()
    {
        super(); // set object position
        let maxVelocity = _FOTL.score > 15 ? .8 : .6;
        const randVelocity = rand(.3, maxVelocity);

        this.#velocity = vec2(randVelocity, 0);
        this.velocity = this.#velocity;

        const width = randInt(10, 22);
        const height = randInt(2, 8);
        
        this.size = vec2(width, height);
        this.pos = vec2(-10, 19 - height / 2); 
        this.color = new Color().setHex('#aaaaaa');

        this.setCollision();
    }
  
    collideWithObject(obj) {
      if (obj === _FOTL.player) {
        _FOTL.currentState = _FOTL.states.gameOver;
      }
    }

    update() {
      this.pos.x += this.#velocity.x;

      if (this.pos.x > 40) {
        this.destroy();
      }

      super.update();
    }
}
