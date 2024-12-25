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
    gameOver: -100
  };

  const music = ['assets/music/01.mp3'];

  const difficulties = {
    easy: 10,
    medium: 20,
    hard: 30
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
    currentlyPlaying: '',
    music: music
  };
})();

function isPaused() {
  return [_FOTL.states.paused, _FOTL.states.menu, _FOTL.states.intro].includes(_FOTL.currentState);
}

const levelSize = vec2(38, 20); // size of play area
setCanvasFixedSize(vec2(1280, 720)); // use a 720p fixed size canvas
setCameraPos(levelSize.scale(0.5)); // center camera in level

gravity = 0;

///////////////////////////////////////////////////////////////////////////////
function gameInit() {
  // called once after the engine starts up
  // setup the game
  _FOTL.soundtrack = _FOTL.music.map(x => new SoundWave(x));

  _FOTL.uiManager = new uiManager();
}

///////////////////////////////////////////////////////////////////////////////
function gameUpdate() {
  if (_FOTL.currentState === _FOTL.states.menu || _FOTL.currentState === _FOTL.states.intro) {
    return;
  }

  if (keyWasPressed('KeyR')) {
    engineObjectsDestroy();

    _FOTL.player = new Player(levelSize);
    _FOTL.score = 0;
    _FOTL.currentState = _FOTL.states.running;
    _FOTL.currentlyPlaying = '';

    return;
  }

  if (_FOTL.currentState == _FOTL.states.gameOver) 
  {
    engineObjectsDestroy();

    if (_FOTL.currentlyPlaying) _FOTL.currentlyPlaying.stop();
    return;
  }

  /*if (keyWasPressed('KeyM')) {
    _FOTL.uiManager.toggleVisibility();

    _FOTL.currentState = _FOTL.currentState !== _FOTL.states.menu ? _FOTL.states.menu : _FOTL.states.running;
  }*/

  if (keyWasPressed('KeyP')) {
    _FOTL.currentState = _FOTL.currentState == _FOTL.states.paused ? _FOTL.states.running : _FOTL.states.paused;
    
    if (isPaused()) {
      _FOTL.currentlyPlaying.stop();
    } else {

      _FOTL.currentlyPlaying.play(0, .6, 1, 0, true);
    } 

    return;
  }
  
  if (isPaused()) return;

  const colors = Object.getOwnPropertyNames(_FOTL.palette);

  if (frame % 99 == 0) {
    _FOTL.score++;
  }

}

///////////////////////////////////////////////////////////////////////////////
function gameUpdatePost() {
  // called after physics and objects are updated
  // setup camera and prepare for render

  if (!_FOTL.vehicleFactory && _FOTL.uiManager.difficulty) {
    _FOTL.vehicleFactory = new VehicleFactory({difficulty : _FOTL.uiManager.difficulty});
  }

  if (!_FOTL.player && _FOTL.uiManager.difficulty) {
    _FOTL.player = new Player(levelSize);
  }

  if (_FOTL.currentState !== _FOTL.states.running) return;
  if (!_FOTL.currentlyPlaying) {
    _FOTL.soundtrack[0].play(0,.6,1,0, true);

    _FOTL.currentlyPlaying = _FOTL.soundtrack[0];
  }

  if (frame - _FOTL.lastPlayerActivityFrame > 150) {
    _FOTL.player.pos.y += randInt(5,12);
    _FOTL.lastPlayerActivityFrame = frame;
  }

  const pipeSpawn = randInt(118, 228);
  if (frame % pipeSpawn == 0) {
    _FOTL.vehicleFactory.New();
  }

  if (_FOTL.score > 12 && (frame % randInt(172, 296) == 0)) {
    new FallingVehicle(19);
  }
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
