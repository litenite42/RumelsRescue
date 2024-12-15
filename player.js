class Player extends EngineObject {
  constructor(sizeOfLevel) {
    super();

    const initY = randInt(4, 8);
    const midX = sizeOfLevel.x / 2;
    const initX = randInt(midX - 10, midX + 10);

    this.pos = vec2(initX, initY);
    this.size = vec2(2, 1);
    this.color = new Color().setHex("#bbbbbb");

    this.gravityScale = 0.003;
    this.setCollision();
  }

  update() {
    if (_FOTL.currentState === _FOTL.states.paused) return;

    let y = this.pos.y;

    const adjustment = 1.1 * this.size.y;
    const minVal = 1;
    const maxVal = 19;
    const range = maxVal - minVal;

    const step = range / 60;
    const sign = keyIsDown("KeyW") || keyIsDown("ArrowUp") ? 1.2 : -1;

    y += sign * step;

    if (y > maxVal) y = maxVal;
    else if (y <= minVal) y = minVal;

    this.pos.x = clamp(
      this.pos.x,
      this.size.x / 2,
      levelSize.x - this.size.x / 2,
    );

    this.pos.y = y;

    super.update();
  }
}

