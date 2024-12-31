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
    intro: 10,
    running: 100,
    paused: 200,
    crashed: 300,
    spinOut: 400,
    stalledOut: 500,
    gameOver: -100,
  };

  const music = ["assets/music/01.mp3"];

  const difficulties = {
    easy: 10,
    medium: 20,
    hard: 30,
  };

  return {
    palette: palette,
    bgColor: palette.white,
    score: 0,
    states: states,
    currentState: states.menu,
    difficulties: difficulties,
    currentDifficulty: difficulties.easy,
    lastPlayerActivityFrame: -1,
    currentlyPlaying: "",
    music: music,
  };
})();

function isPaused() {
  return [_FOTL.states.paused, _FOTL.states.menu, _FOTL.states.intro].includes(
    _FOTL.currentState,
  );
}

const levelSize = vec2(38, 20); // size of play area

setCanvasFixedSize(vec2(1280, 720)); // use a 720p fixed size canvas
setCameraPos(levelSize.scale(0.5)); // center camera in level

function gameReset() {
  engineObjectsDestroy();

  _FOTL.player = 0;
  _FOTL.player = new Player(levelSize);
  _FOTL.score = 0;
  _FOTL.currentState = _FOTL.states.running;
  _FOTL.currentlyPlaying = "";

  _FOTL.uiManager.toggleGameOver();
}
///////////////////////////////////////////////////////////////////////////////
function gameInit() {
  // called once after the engine starts up
  // setup the game
  _FOTL.soundtrack = _FOTL.music.map((x) => new SoundWave(x));

  gravity = -0.008333;
  _FOTL.uiManager = new uiManager();
}

///////////////////////////////////////////////////////////////////////////////
function gameUpdate() {
  if (
    _FOTL.currentState === _FOTL.states.menu ||
    _FOTL.currentState === _FOTL.states.intro
  ) {
    return;
  }

  if (keyWasPressed("KeyR")) {
    gameReset();

    return;
  }

  if (_FOTL.currentState == _FOTL.states.gameOver) {
    engineObjectsDestroy();
 
    _FOTL.currentlyPlaying  && _FOTL.currentlyPlaying.stop();
    return;
  }

  if (keyWasPressed("KeyP")) {
    _FOTL.currentState =
      _FOTL.currentState == _FOTL.states.paused
        ? _FOTL.states.running
        : _FOTL.states.paused;

    if (isPaused()) {
      _FOTL.currentlyPlaying && _FOTL.currentlyPlaying.stop();
    } else { 
      !_FOTL.uiManager.mute && _FOTL.currentlyPlaying.play(0, 0.6, 1, 0, true);
    }

    _FOTL.uiManager.togglePause();
    _FOTL.lastPlayerActivityFrame = frame;
    return;
  }

  if (isPaused()) return;

  const colors = Object.getOwnPropertyNames(_FOTL.palette);

  if (frame % 99 == 0) {
    _FOTL.score++;

    if (!!_FOTL.uiManager.punishLazy) {
      _FOTL.score += _FOTL.uiManager.difficulty / 10;
    }
  }
}

///////////////////////////////////////////////////////////////////////////////
function gameUpdatePost() {
  // called after physics and objects are updated
  // setup camera and prepare for render

  if (!_FOTL.vehicleFactory && _FOTL.uiManager.difficulty) {
    _FOTL.vehicleFactory = new VehicleFactory({
      difficulty: _FOTL.uiManager.difficulty,
    });
  }

  if (!_FOTL.player && _FOTL.uiManager.difficulty) {
    _FOTL.player = new Player(levelSize);
  }

  if (_FOTL.currentState !== _FOTL.states.running) return;
  if (!_FOTL.uiManager.mute && !_FOTL.currentlyPlaying) {
    _FOTL.soundtrack[0].play(0, 0.6, 1, 0, true);

    _FOTL.currentlyPlaying = _FOTL.soundtrack[0];
  }

  if (
    !!_FOTL.uiManager.punishLazy &&
    frame - _FOTL.lastPlayerActivityFrame > 170
  ) {
    _FOTL.player.applyForce(vec2(0, 4));
    _FOTL.lastPlayerActivityFrame = frame;
  }

  _FOTL.vehicleFactory.New();
}

///////////////////////////////////////////////////////////////////////////
function gameRender() {
  // called before objects are rendered
  // draw any background effects that appear behind objects
  let x = mainCanvasSize.x / 2;
  let y = (-1 * mainCanvasSize.y) / 2;

  drawRect(cameraPos, mainCanvasSize.scale(0.8), _FOTL.bgColor);
  drawRect(cameraPos, vec2(mainCanvasSize.x, 19), _FOTL.palette.white);

  drawLine(vec2(0, 19.5), vec2(38, 19.5), 0.1, new Color().setHex("#AAAAAA"));
  drawLine(vec2(0, 0), vec2(38, 0), 0.1, new Color().setHex("#AAAAAA"));

  if (debug) {
    drawLine(vec2(0, 24.5), vec2(38, 24.5), 0.1, new Color().setHex("#000000"));
    drawLine(vec2(0, 19.5), vec2(38, 19.5), 0.1, new Color().setHex("#000000"));
    drawLine(vec2(0, 19.5), vec2(0, 0), 0.1, new Color().setHex("#000000"));
    drawLine(vec2(0, 0), vec2(5, 0), 0.1, new Color().setHex("#FF0000"));
    drawLine(vec2(0, 5), vec2(5, 5), 0.1, new Color().setHex("#00FF00"));
    drawLine(vec2(0, 10), vec2(5, 10), 0.1, new Color().setHex("#0000FF"));
    drawLine(vec2(0, 15), vec2(5, 15), 0.1, new Color().setHex("#000000"));
  }
}

///////////////////////////////////////////////////////////////////////////////
function gameRenderPost() {
  // called after objects are rendered
  // draw effects or hud that appear above all objects
  if ((_FOTL.currentState == _FOTL.states.gameOver || _FOTL.currentState == _FOTL.states.spinout) && !_FOTL.uiManager.visible) {
    _FOTL.uiManager.toggleGameOver();
  }

  if (_FOTL.currentState == _FOTL.states.gameOver) {
    return;
  }

  if (!_FOTL.player) return;

  drawTextScreen(
    "Rumel's Rescue",
    vec2(164, 20),
    24,
    new Color().setHex("#000000"),
  );

  drawTextScreen(
    "Health: " + _FOTL.player.health,
    vec2(764, 20),
    24,
    new Color().setHex("#000000"),
  );

  drawTextScreen(
    "Score: " + _FOTL.score,
    vec2(884, 20),
    24,
    new Color().setHex("#000000"),
  );

  if (debug) {
    drawText(`(${_FOTL.player.pos.x}, ${_FOTL.player.pos.y})`,
    vec2(_FOTL.player.pos.x, _FOTL.player.pos.y),
    3,
    RED);
  }
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
