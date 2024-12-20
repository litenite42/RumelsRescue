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

    this.gravityScale = 0.003;
    this.setCollision();
  }

  update() {
    if (isPaused()) return;

    let y = this.pos.y;

    const adjustment = 1.1 * this.size.y;
    const minVal = 1;
    const maxVal = 19;
    const range = maxVal - minVal;

    const step = range / 60;
    const sign = keyIsDown("KeyW") || keyIsDown("ArrowUp") ? 1.2 : -1;

    y += sign * step;

    if (!!sign) {
      _FOTL.lastPlayerActivityFrame = frame;
    }

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

