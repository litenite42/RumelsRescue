/*
    Little JS Hello World Demo
    - Just prints "Hello World!"
    - A good starting point for new projects
*/

'use strict';

let _FOTL = {};
//gravity = -0.008;
gravity = -1;
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
    console.debug(keyIsDown('KeyW'))
    if (keyIsDown('KeyW')) {
      console.log('flap')
      const adjustment = 1.5 * _FOTL.player.size.y;
      console.log(mainCanvasSize)
      console.log({pp: _FOTL.player.pos, adj: adjustment, npp: _FOTL.player.pos.y + adjustment})
      let newPosY = _FOTL.player.pos.y + adjustment;
      _FOTL.player.pos.y = newPosY;
    }

    //if (_FOTL.player.pos.y < 10) _FOTL.player.pos.y = 10;
    //if (_FOTL.player.pos.y + 10 >= mainCanvasSize.y) _FOTL.player.pos.y = mainCanvasSize.y;
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
