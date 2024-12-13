/*
    Little JS Hello World Demo
    - Just prints "Hello World!"
    - A good starting point for new projects
*/

'use strict';

const _FOTL = (() => {
    const palette = {
        red: new Color().setHex('#ff0000'),
        green: new Color().setHex('#009342'),
        white: new Color().setHex('#ffffff')
    };

    return {
        palette: palette,
        bgColor: palette.white,
      score: 0
    };
})();

gravity = 0;

///////////////////////////////////////////////////////////////////////////////
function gameInit() {
    // called once after the engine starts up
    // setup the game

    _FOTL.player = new EngineObject(vec2(0, 0), vec2(2, 1));
    _FOTL.player.color = (new Color).setHex('#bbbbbb');
    _FOTL.player.gravityScale = .003;
}

///////////////////////////////////////////////////////////////////////////////
function gameUpdate() {
    // called every frame at 60 frames per second
    // handle input and update the game state
    let y = _FOTL.player.pos.y;

    const adjustment = 1.5 * _FOTL.player.size.y;
    const minVal = -9;
    const maxVal = 9;
    const range = maxVal - minVal;

    const step = range / 60;
    const sign = (keyIsDown('KeyW') || keyIsDown('ArrowUp')) ? 1.2 : -1;

    y += sign * step;

    if (y > maxVal) y = maxVal;
    else if (y <= minVal) y = minVal;

    _FOTL.player.pos.y = y;

    const colors = Object.getOwnPropertyNames(_FOTL.palette);

    if (frame % 99 == 0) {
      _FOTL.score++;
    }
    if (frame % 256 == 0) {
      const ndx = randInt(0, colors.length);

      _FOTL.bgColor = _FOTL.palette[colors[ndx]];
    }
}

///////////////////////////////////////////////////////////////////////////////
function gameUpdatePost() {
    // called after physics and objects are updated
    // setup camera and prepare for render
}

///////////////////////////////////////////////////////////////////////////////
function gameRender() {
    // called before objects are rendered
    // draw any background effects that appear behind objects
    let x = mainCanvasSize.x / 2;
    let y = -1 * mainCanvasSize.y / 2

    drawRect(cameraPos, mainCanvasSize.scale(.8), _FOTL.bgColor);
    drawRect(cameraPos, vec2(mainCanvasSize.x,19), _FOTL.palette.white);
}

///////////////////////////////////////////////////////////////////////////////
function gameRenderPost() {
    // called after objects are rendered
    // draw effects or hud that appear above all objects
    drawTextScreen('Flight Of The Lemur', vec2(164, 20), 24, new Color().setHex('#000000'));
    drawTextScreen('Score: ' + _FOTL.score, vec2(564, 20), 24, new Color().setHex('#000000'));
}

///////////////////////////////////////////////////////////////////////////////
// Startup LittleJS Engine
engineInit(gameInit, gameUpdate, gameUpdatePost, gameRender, gameRenderPost, []);
