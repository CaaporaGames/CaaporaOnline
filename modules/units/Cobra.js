/*
* To change this license header, choose License Headers in Project Properties.
* To change this template file, choose Tools | Templates
* and open the template in the editor.
*/
var currentEnemyXtile;
var currentEnemyYtile;
var currentPlayerXtile;
var currentPlayerYtile;
var currentNextPointX;
var currentNextPointY;
var cobraDirection = "STOP";

// Create a cobra.
function Cobra (opts) {
  var image = 'cobra';

  this.basicGame = opts.basicGame;
  this.game = opts.game;
  this.easystar = opts.easystar;
  this.timeStep = opts.timeStep;

  if (opts.image) {
    key = opts.image;
  }
  
  cobra = game.add.isoSprite(15 * this.basicGame.getTileSize(), 15 * this.basicGame.getTileSize(), 0, image, 0, this.basicGame.getIsoGroup())

  cobra.anchor.set(0.5);

  // enable physics on the cobra enemy
  this.game.physics.isoArcade.enable(cobra);
  cobra.body.collideWorldBounds = true;

  // set the physics bounce amount on each axis  (X, Y, Z)
  cobra.body.bounce.set(0.2, 0.2, 0);

  // set the slow down rate on each axis (X, Y, Z)
  cobra.body.drag.set(100, 100, 0);

  // add the animations from the spritesheet
  cobra.animations.add('S', [0, 1, 2, 3, 4, 5, 6, 7], 10, true);
  cobra.animations.add('SW', [8, 9, 10, 11, 12, 13, 14, 15], 10, true);
  cobra.animations.add('W', [16, 17, 18, 19, 20, 21, 22, 23], 10, true);
  cobra.animations.add('NW', [24, 25, 26, 27, 28, 29, 30, 31], 10, true);
  cobra.animations.add('N', [32, 33, 34, 35, 36, 37, 38, 39], 10, true);
  cobra.animations.add('NE', [40, 41, 42, 43, 44, 45, 46, 47], 10, true);
  cobra.animations.add('E', [48, 49, 50, 51, 52, 53, 54, 55], 10, true);
  cobra.animations.add('SE', [56, 57, 58, 59, 60, 61, 62, 63], 10, true);
}
// AI
Cobra.prototype = {
  IA: function () {

    var easystar = this.basicGame.getEasystar();

    currentPlayerXtile = this.basicGame.getCurrentPlayerXtile();
    currentPlayerYtile = this.basicGame.getCurrentPlayerYtile();

    currentEnemyXtile = this.basicGame.getCurrentEnemyXtile();
    currentEnemyYtile = this.basicGame.getCurrentEnemyYtile();
    /*
    CALCULO PARA A COBRA.
    ______________________________________________________________________
    */

    easystar.findPath(currentEnemyXtile, currentEnemyYtile, currentPlayerXtile, currentPlayerYtile, function (path) {
      if (path === null) {
        console.log("The path to the destination point was not found.");
      }

      if (path) {
        currentNextPointX2 = path[1].x;
        currentNextPointY2 = path[1].y;
      }

      if (currentNextPointX2 < currentEnemyXtile && currentNextPointY2 < currentEnemyYtile)
      {
        // left up
        cobraDirection = "NW";
      }
      else if (currentNextPointX2 == currentEnemyXtile && currentNextPointY2 < currentEnemyYtile)
      {
        // up
        cobraDirection = "N";

      }
      else if (currentNextPointX2 > currentEnemyXtile && currentNextPointY2 < currentEnemyYtile)
      {
        // right up
        cobraDirection = "NE";

      }
      else if (currentNextPointX2 < currentEnemyXtile && currentNextPointY2 == currentEnemyYtile)
      {
        // left
        cobraDirection = "W";

      }
      else if (currentNextPointX2 > currentEnemyXtile && currentNextPointY2 == currentEnemyYtile)
      {
        // right
        cobraDirection = "E";

      }
      else if (currentNextPointX2 > currentEnemyXtile && currentNextPointY2 > currentEnemyYtile)
      {
        // right down
        cobraDirection = "SE";

      }
      else if (currentNextPointX2 == currentEnemyXtile && currentNextPointY2 > currentEnemyYtile)
      {
        // down
        cobraDirection = "S";

      }
      else if (currentNextPointX2 < currentEnemyXtile && currentNextPointY2 > currentEnemyYtile)
      {
        // left down
        cobraDirection = "SW";

      }
      else
      {

        cobraDirection = "STOP";

      }

      if (cobraDirection != "STOP")
      cobra.animations.play(cobraDirection);

    });
    /*
    ______________________________________________________________________
    CALCULO PARA A COBRA.
    */
    // PREVENT FROM GOING OUT FROM THE LOGICAL ARRAY BECAUSE OF THE PHASER PHYSICS ENGINE

    if (currentEnemyXtile < 0)
    currentEnemyXtile = 0;
    if (currentEnemyYtile < 0)
    currentEnemyYtile = 0;

    if (currentEnemyXtile > 28)
    currentEnemyXtile = 28;
    if (currentEnemyYtile > 28)
    currentEnemyYtile = 28;

    this.easystar.calculate();

  },
  movement: function () {

    var enemySpeed = 90;

    /*
    Movimentos da cobra.
    _________________________________________________________
    */
    if (cobraDirection == "N") {
      cobra.body.velocity.x = -enemySpeed;
      cobra.body.velocity.y = -enemySpeed;
    }
    else if (cobraDirection == "S")
    {
      cobra.body.velocity.x = enemySpeed;
      cobra.body.velocity.y = enemySpeed;
    }
    else if (cobraDirection == "E") {
      cobra.body.velocity.x = enemySpeed;
      cobra.body.velocity.y = -enemySpeed;
    }
    else if (cobraDirection == "W")
    {
      cobra.body.velocity.x = -enemySpeed;
      cobra.body.velocity.y = enemySpeed;
    }
    else if (cobraDirection == "SE")
    {
      cobra.body.velocity.x = enemySpeed;
      cobra.body.velocity.y = 0;
    }
    else if (cobraDirection == "NW")
    {
      cobra.body.velocity.x = -enemySpeed;
      cobra.body.velocity.y = 0;
    }
    else if (cobraDirection == "SW")
    {
      cobra.body.velocity.x = 0;
      cobra.body.velocity.y = enemySpeed;
    }

    else if (cobraDirection == "NE")
    {
      cobra.body.velocity.x = 0;
      cobra.body.velocity.y = -enemySpeed;
    }
    else if (cobraDirection == "STOP")
    {
      cobra.body.velocity.x = 0;
      cobra.body.velocity.y = 0;
    }
    else // JUST IN CASE IF cobraDirection wouldnt exist we stop the cowboy movement
    {
      cobra.body.velocity.x = 0;
      cobra.body.velocity.y = 0;
    }
    /*
    _________________________________________________________
    Movimentos da cobra.
    */
   
  },
   getCobraSprite : function(){
       return cobra;
   }
}
