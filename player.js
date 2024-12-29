class Player extends EngineObject {
  constructor(sizeOfLevel) {
    super();

    const initY = randInt(4, 8);
    const midX = sizeOfLevel.x / 2;
    const hardRegion = [5, 14];
    const mediumRegion = [15, 25];
    const easyRegion = [26, 33];

    let region;

    if (_FOTL.uiManager.difficulty === _FOTL.difficulties.easy) {
      region = easyRegion;
    } else if (_FOTL.uiManager.difficulty === _FOTL.difficulties.medium) {
      region = mediumRegion;
    } else {
      region = hardRegion;
    }

    const initX = randInt(region[0], region[1]);

    this.pos = vec2(initX, initY);
    this.size = vec2(2, 1);
    this.color = new Color().setHex("#bbbbbb");

    this.gravityScale = 1;
    this.mass = 0;
    this.setCollision();
  }

  update() {
    if (isPaused()) return;

    let y = this.pos.y;

    const adjustment = 1.1 * this.size.y;
    const minVal = 1;
    const maxVal = 19;

    const playerMoved = keyIsDown("KeyW") || keyIsDown("ArrowUp") || mouseIsDown(0);

    if (playerMoved) {
      _FOTL.lastPlayerActivityFrame = frame;

      _FOTL.player.applyForce(vec2(0, 1/60));
      this.mass = 1;
    } else {
    }


    this.velocity.y = clamp(this.velocity.y, -2, 2);
    this.pos.y = clamp(this.pos.y, minVal, maxVal);
    // if (y > maxVal) y = maxVal;
    // else if (y <= minVal) y = minVal;
//
    // this.pos.x = clamp(
      // this.pos.x,
      // this.size.x / 2,
      // levelSize.x - this.size.x / 2,
    // );
//
    // this.pos.y = y;

    super.update();
  }
}

