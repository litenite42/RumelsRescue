/*
    Little JS Hello World Demo
    - Just prints "Hello World!"
    - A good starting point for new projects
*/

'use strict';

let _FOTL = {};
gravity = 0;
///////////////////////////////////////////////////////////////////////////////
function gameInit()
{
    // called once after the engine starts up
    // setup the game
    
    _FOTL.player = new EngineObject(vec2(0, 0), vec2(2,1));
    _FOTL.player.color = (new Color).setHex('#bbbbbb');
    _FOTL.player.gravityScale = .003;
}

///////////////////////////////////////////////////////////////////////////////
function gameUpdate()
{
    // called every frame at 60 frames per second
    // handle input and update the game state
    let y = _FOTL.player.pos.y;

    const adjustment = 1.5 * _FOTL.player.size.y;
    const minVal = -8;
    const maxVal = 8;
    const range = maxVal - minVal;

    const step = range / 60;
    const sign = (keyIsDown('KeyW') || keyIsDown('ArrowUp')) ? 1 : -1;
    
    y += sign * step;

    if (y > maxVal) y = maxVal;
    else if (y <= minVal) y = minVal;

    _FOTL.player.pos.y = y;
}

///////////////////////////////////////////////////////////////////////////////
function gameUpdatePost()
{
    // called after physics and objects are updated
    // setup camera and prepare for render
}

///////////////////////////////////////////////////////////////////////////////
function gameRender()
{
    // called before objects are rendered
    // draw any background effects that appear behind objects
  //
}

///////////////////////////////////////////////////////////////////////////////
function gameRenderPost()
{
    // called after objects are rendered
    // draw effects or hud that appear above all objects
    drawTextScreen('Hello World!', mainCanvasSize.scale(.3), 80);
}

///////////////////////////////////////////////////////////////////////////////
// Startup LittleJS Engine
engineInit(gameInit, gameUpdate, gameUpdatePost, gameRender, gameRenderPost, []);
