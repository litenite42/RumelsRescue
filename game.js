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
    crashed: 3,
    spinOut: 4,
    gameOver: -1
  };

  const difficulties = {
    easy: 0,
    medium: 1,
    hard: 2
  };

  return {
    palette: palette,
    bgColor: palette.white,
    score: 0,
    states: states,
    currentState: states.menu,
    difficulties: difficulties,
    currentDifficulty: difficulties.easy
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
  _FOTL.player = new Player(levelSize);

  _FOTL.vehicleManager = new VehicleFactory({
    difficulty : _FOTL.currentDifficulty
  });
}

///////////////////////////////////////////////////////////////////////////////
function gameUpdate() {
  if (keyWasPressed('KeyR')) {
    window.location.reload();
  }

  if (_FOTL.currentState == _FOTL.states.gameOver) {
    engineObjectsDestroy();
    return;
  }

  if (keyWasPressed('KeyP')) {
    _FOTL.currentState = _FOTL.currentState == _FOTL.states.paused ? _FOTL.states.running : _FOTL.states.paused;

    return;
  }
  
  if (_FOTL.currentState === _FOTL.states.paused) { return; }

  // called every frame at 60 frames per second
  // handle input and update the game state
  const colors = Object.getOwnPropertyNames(_FOTL.palette);

  if (frame % 99 == 0) {
    _FOTL.score++;
  }

  if (frame % 256 == 0) {
    const ndx = randInt(0, colors.length);

    _FOTL.bgColor = _FOTL.palette[colors[ndx]];
  }

  const pipeSpawn = randInt(118, 228);
  if (frame % pipeSpawn == 0) {
    _FOTL.vehicleManager.New();
    //new Vehicle(.4, .7);
    //EasyVehicle.New();
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
  }
}

///////////////////////////////////////////////////////////////////////////////
function gameRenderPost() {
  // called after objects are rendered
  // draw effects or hud that appear above all objects
  if (_FOTL.currentState == _FOTL.states.gameOver) {
    drawTextScreen(
      `Game Over\nScore ${_FOTL.score}\nType 'R' to reset.`,
      vec2(500, 240),
      24,
      new Color().setHex("#000000"),
    );
    return;
  }
  if (_FOTL.currentState === _FOTL.states.paused){
    drawTextScreen(
      "Paused\n[P to unpause]",
      vec2(500, 240),
      24,
      new Color().setHex("#000000"),
    );
  }
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
