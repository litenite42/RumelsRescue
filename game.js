/*
    Little JS Hello World Demo
    - Just prints "Hello World!"
    - A good starting point for new projects
*/

"use strict";

const _FOTL = (() => {
  const palette = {
    red: new Color().setHex("#ff0000"),
    green: new Color().setHex("#009342"),
    white: new Color().setHex("#ffffff"),
  };

  const states = {
    menu: 0,
    running: 1,
    paused: 2,
    gameOver: 3,
  };

  return {
    palette: palette,
    bgColor: palette.white,
    score: 0,
    states: states,
    currentState: states.menu,
  };
})();

const levelSize = vec2(38, 20); // size of play area
setCanvasFixedSize(vec2(1280, 720)); // use a 720p fixed size canvas
setCameraPos(levelSize.scale(0.5)); // center camera in level

gravity = 0;

///////////////////////////////////////////////////////////////////////////////
function gameInit() {
  // called once after the engine starts up
  // setup the game
  const initY = randInt(4, 8);
  const midX = levelSize.x / 2;
  const initX = randInt(midX - 10, midX + 10);
  _FOTL.player = new EngineObject(vec2(initX, initY), vec2(2, 1));
  _FOTL.player.color = new Color().setHex("#bbbbbb");
  _FOTL.player.gravityScale = 0.003;
  _FOTL.player.setCollision();
}

///////////////////////////////////////////////////////////////////////////////
function gameUpdate() {
  // called every frame at 60 frames per second
  // handle input and update the game state
  if (_FOTL.currentState == _FOTL.states.gameOver) {
    engineObjectsDestroy();
    drawTextScreen(
      "Game Over\nScore " + _FOTL.score,
      vec2(500, 240),
      24,
      new Color().setHex("#000000"),
    );
    return;
  }

  let y = _FOTL.player.pos.y;

  const adjustment = 1.5 * _FOTL.player.size.y;
  const minVal = 1;
  const maxVal = 19;
  const range = maxVal - minVal;

  const step = range / 60;
  const sign = keyIsDown("KeyW") || keyIsDown("ArrowUp") ? 1.2 : -1;

  y += sign * step;

  if (y > maxVal) y = maxVal;
  else if (y <= minVal) y = minVal;

  _FOTL.player.pos.x = clamp(
    _FOTL.player.pos.x,
    _FOTL.player.size.x / 2,
    levelSize.x - _FOTL.player.size.x / 2,
  );
  _FOTL.player.pos.y = y;

  const colors = Object.getOwnPropertyNames(_FOTL.palette);

  if (frame % 99 == 0) {
    _FOTL.score++;
  }
  if (frame % 256 == 0) {
    const ndx = randInt(0, colors.length);

    _FOTL.bgColor = _FOTL.palette[colors[ndx]];
  }
  if (frame % 128 == 0) {
    new Pipe(vec2(-10, 10));
  }
}

///////////////////////////////////////////////////////////////////////////////
function gameUpdatePost() {
  // called after physics and objects are updated
  // setup camera and prepare for render
}

///////////////////////////////////////////////////////////////////////////
function gameRender() {
  // called before objects are rendered
  // draw any background effects that appear behind objects
  let x = mainCanvasSize.x / 2;
  let y = (-1 * mainCanvasSize.y) / 2;

  drawRect(cameraPos, mainCanvasSize.scale(0.8), _FOTL.bgColor);
  drawRect(cameraPos, vec2(mainCanvasSize.x, 19), _FOTL.palette.white);
  if (debug) {
  drawLine(vec2(0, 19.5), vec2(38, 19.5), 0.1, new Color().setHex("#000000"));
  drawLine(vec2(0, 19.5), vec2(0, 0), 0.1, new Color().setHex("#000000"));
  drawLine(vec2(0, 0), vec2(5, 0), 0.1, new Color().setHex("#000000"));
  drawLine(vec2(0, 5), vec2(5, 5), 0.1, new Color().setHex("#000000"));
  drawLine(vec2(0, 10), vec2(5, 10), 0.1, new Color().setHex("#000000"));
  drawLine(vec2(0, 15), vec2(5, 15), 0.1, new Color().setHex("#000000"));
  drawLine(vec2(0, 20), vec2(5, 20), 0.1, new Color().setHex("#0000ff"));
  }
}

///////////////////////////////////////////////////////////////////////////////
function gameRenderPost() {
  // called after objects are rendered
  // draw effects or hud that appear above all objects
  if (_FOTL.currentState === _FOTL.states.gameOver) { return; }
    drawTextScreen(
      "Rumel's Flight",
      vec2(164, 20),
      24,
      new Color().setHex("#000000"),
    );
    drawTextScreen(
      "Score: " + _FOTL.score,
      vec2(564, 20),
      24,
      new Color().setHex("#000000"),
    );
}

///////////////////////////////////////////////////////////////////////////////
// Startup LittleJS Engine
engineInit(
  gameInit,
  gameUpdate,
  gameUpdatePost,
  gameRender,
  gameRenderPost,
  [],
);
